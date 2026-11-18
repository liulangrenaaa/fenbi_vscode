import assert from "node:assert/strict";
import { test } from "node:test";
import { PNG } from "pngjs";
import { createQuestionImageLoader } from "../src/agent/images.mjs";
import { normalizeImageUrl } from "../src/agent/image-context.mjs";

// 构造透明底黑色线条，检查公式放大后仍有明确的笔画和白色背景。
function formulaBytes() {
  const png = new PNG({ width: 8, height: 26 });
  png.data.fill(0);
  for (let x = 0; x < 8; x += 1) png.data[(13 * 8 + x) * 4 + 3] = 255;
  return PNG.sync.write(png);
}

test("协议相对地址补全为 HTTPS，不接受内嵌凭据和脚本地址", () => {
  assert.equal(
    normalizeImageUrl("//fb.fenbike.cn/a.png"),
    "https://fb.fenbike.cn/a.png",
  );
  assert.equal(
    normalizeImageUrl("http://fb.fbstatic.cn/a.png#x"),
    "https://fb.fbstatic.cn/a.png",
  );
  assert.equal(
    normalizeImageUrl("https://user:secret@fb.fbstatic.cn/a.png"),
    "",
  );
  assert.equal(normalizeImageUrl("javascript:alert(1)"), "");
});

test("真实 PNG 放大铺白底，重复提问复用有界缓存且不携带 Cookie", async () => {
  const calls = [];
  // 下载替身返回真实 PNG 字节，仍使用生产解码与缩放逻辑。
  const load = createQuestionImageLoader({
    fetchImage: async (url, options) => {
      calls.push({ url, options });
      return new Response(formulaBytes());
    },
  });
  const first = await load(["//fb.fbstatic.cn/formula.png"]);
  const second = await load(["https://fb.fbstatic.cn/formula.png"]);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].options.headers, undefined);
  assert.equal(calls[0].options.redirect, "manual");
  assert.deepEqual(first, second);
  assert.equal(first[0].mimeType, "image/png");
  const result = PNG.sync.read(Buffer.from(first[0].data, "base64"));
  assert.ok(result.height >= 144);
  assert.deepEqual([...result.data.subarray(0, 4)], [255, 255, 255, 255]);
  assert.ok(result.data.some((value, index) => index % 4 !== 3 && value === 0));
  for (let i = 3; i < result.data.length; i += 4)
    assert.equal(result.data[i], 255);
});

test("图片跳转逐跳校验，不允许访问本机、陌生域名或伪装后缀", async () => {
  const calls = [];
  // 模拟 CDN 将请求重定向到本机，下一跳必须在网络访问之前拒绝。
  const load = createQuestionImageLoader({
    fetchImage: async (url) => {
      calls.push(url);
      return new Response(null, {
        status: 302,
        headers: { location: "http://127.0.0.1/private" },
      });
    },
  });
  await assert.rejects(load(["https://fb.fbstatic.cn/a.png"]), /无法读取/);
  assert.equal(calls.length, 1);
  await assert.rejects(
    load(["https://fb.fbstatic.cn.attacker.test/a.png"]),
    /无法读取/,
  );
  await assert.rejects(load(["https://fb.fbstatic.cn:444/a.png"]), /无法读取/);
  assert.equal(calls.length, 1);
});

test("同源重定向允许读取，HTML 错误页不伪装成图片", async () => {
  let count = 0;
  // 接口可返回规范的相对重定向，仍须按实际文件头确认类型。
  const load = createQuestionImageLoader({
    fetchImage: async () => {
      count += 1;
      return count === 1
        ? new Response(null, {
            status: 302,
            headers: { location: "/final.png" },
          })
        : new Response(formulaBytes());
    },
  });
  assert.equal(
    (await load(["https://fb.fbstatic.cn/a.png"]))[0].mimeType,
    "image/png",
  );
  const html = createQuestionImageLoader({
    fetchImage: async () =>
      new Response("<html>login</html>", {
        headers: { "Content-Type": "image/png" },
      }),
  });
  await assert.rejects(html(["https://fb.fbstatic.cn/login"]), /格式暂不支持/);
});

test("无长度声明的图片也逐块限流，并在超限时取消响应流", async () => {
  let cancelled = false;
  // 构造不带 Content-Length 的大流，避免依赖服务器提供长度。
  const load = createQuestionImageLoader({
    fetchImage: async () =>
      new Response(
        new ReadableStream({
          // 一次产生超过单图上限的数据，验证客户端确实计数。
          start(controller) {
            controller.enqueue(new Uint8Array(2 * 1024 * 1024 + 1));
          },
          // 响应取消后记录清理行为。
          cancel() {
            cancelled = true;
          },
        }),
      ),
  });
  await assert.rejects(load(["https://fb.fbstatic.cn/huge.png"]), /超过 2MB/);
  assert.equal(cancelled, true);
});

test("取消会传递给下载请求，异常中的地址和密钥不会公开", async () => {
  const controller = new AbortController();
  let started;
  const loading = new Promise((resolve) => {
    started = resolve;
  });
  // 下载等待取消信号，模拟真实 fetch 的中止行为。
  const load = createQuestionImageLoader({
    fetchImage: async (_, { signal }) => {
      started();
      return new Promise((_, reject) => {
        signal.addEventListener("abort", () => reject(signal.reason), {
          once: true,
        });
      });
    },
  });
  const pending = load(["https://fb.fbstatic.cn/a.png"], {
    signal: controller.signal,
  });
  await loading;
  controller.abort();
  await assert.rejects(pending, { name: "AbortError" });
  const broken = createQuestionImageLoader({
    fetchImage: async () => {
      throw new Error("SECRET_CDN_KEY");
    },
  });
  await assert.rejects(broken(["https://fb.fbstatic.cn/a.png"]), (error) => {
    assert.doesNotMatch(error.message, /SECRET_CDN_KEY/);
    assert.match(error.message, /读取失败或超时/);
    return true;
  });
});
