import { PNG } from "pngjs";
import { MAX_QUESTION_IMAGES, normalizeImageUrl } from "./image-context.mjs";

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_TOTAL_BYTES = 8 * 1024 * 1024;
const CDN_DOMAINS = ["fbstatic.cn", "fenbike.cn", "fenbi.com", "fenbi.cn"];

// 题图错误只包含可公开的提示，不携带图片地址或网络内部信息。
export class QuestionImageError extends Error {}

// 只从粉笔图片域名读取资源，并对重定向的每一跳重复校验。
function checkedUrl(value) {
  const normalized = normalizeImageUrl(value);
  if (normalized) {
    const url = new URL(normalized);
    if (
      !url.port &&
      CDN_DOMAINS.some(
        (domain) =>
          url.hostname === domain || url.hostname.endsWith(`.${domain}`),
      )
    )
      return normalized;
  }
  throw new QuestionImageError(
    "题目包含无法读取的图片地址，请刷新题目后重试。",
  );
}

// 根据文件头识别真实图片类型，不信任接口声明的 Content-Type。
function imageType(bytes) {
  if (
    bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  )
    return "image/png";
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff)
    return "image/jpeg";
  if (/^GIF8[79]a$/.test(bytes.subarray(0, 6).toString("ascii")))
    return "image/gif";
  if (
    bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
    bytes.subarray(8, 12).toString("ascii") === "WEBP"
  )
    return "image/webp";
  throw new QuestionImageError("题图格式暂不支持，请补充图片或文字后再提问。");
}

// 放大透明底的小公式，并铺白底，避免分子分母因尺寸过小而难以辨认。
function enlargeFormula(bytes) {
  if (bytes.length < 24)
    throw new QuestionImageError("题图文件不完整，请重试。");
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  if (!width || !height || width * height > 16_000_000)
    throw new QuestionImageError("题图尺寸异常，请补充图片后再提问。");
  if (width > 256 || height > 96) return bytes;
  const scale = Math.min(6, Math.max(1, Math.ceil(144 / height)));
  const source = PNG.sync.read(bytes);
  const output = new PNG({
    width: width * scale + 24,
    height: height * scale + 24,
  });
  output.data.fill(255);
  for (let y = 0; y < height * scale; y += 1) {
    for (let x = 0; x < width * scale; x += 1) {
      const from = (Math.floor(y / scale) * width + Math.floor(x / scale)) * 4;
      const to = ((y + 12) * output.width + x + 12) * 4;
      const alpha = source.data[from + 3] / 255;
      for (let channel = 0; channel < 3; channel += 1)
        output.data[to + channel] = Math.round(
          source.data[from + channel] * alpha + 255 * (1 - alpha),
        );
    }
  }
  return PNG.sync.write(output);
}

// 逐块限制下载量，避免异常图片响应耗尽扩展宿主内存。
async function readBytes(response, signal) {
  if (Number(response.headers.get("content-length")) > MAX_IMAGE_BYTES) {
    await response.body?.cancel();
    throw new QuestionImageError("单张题图超过 2MB，请裁剪后再提问。");
  }
  if (!response.body) throw new QuestionImageError("题图内容为空，请重试。");
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      signal.throwIfAborted();
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_IMAGE_BYTES)
        throw new QuestionImageError("单张题图超过 2MB，请裁剪后再提问。");
      chunks.push(value);
    }
    return Buffer.concat(chunks, size);
  } finally {
    await reader.cancel().catch(() => {});
  }
}

// 建立仅保存在内存中的有限缓存，并生成 ACP 所需的实际图片附件。
export function createQuestionImageLoader({
  fetchImage = globalThis.fetch,
} = {}) {
  const cache = new Map();
  let cacheBytes = 0;
  // 对整道题设置超时和总量上限，取消提问时同步取消正在下载的题图。
  return async function loadImages(urls, { signal: parentSignal } = {}) {
    if (urls.length > MAX_QUESTION_IMAGES)
      throw new QuestionImageError(
        `单题最多支持 ${MAX_QUESTION_IMAGES} 张题图。`,
      );
    const signal = AbortSignal.any(
      [parentSignal, AbortSignal.timeout(25000)].filter(Boolean),
    );
    const blocks = [];
    let total = 0;
    try {
      for (const value of urls) {
        signal.throwIfAborted();
        const key = checkedUrl(value);
        let image = cache.get(key);
        if (!image) {
          let url = key;
          let response;
          for (let redirects = 0; redirects <= 3; redirects += 1) {
            response = await fetchImage(url, { redirect: "manual", signal });
            if (![301, 302, 303, 307, 308].includes(response.status)) break;
            await response.body?.cancel();
            const location = response.headers.get("location");
            if (!location || redirects === 3)
              throw new QuestionImageError("题图跳转异常，请刷新题目后重试。");
            url = checkedUrl(new URL(location, url).href);
          }
          if (!response.ok) {
            await response.body?.cancel();
            throw new QuestionImageError("题图读取失败，请检查网络后重试。");
          }
          let bytes = await readBytes(response, signal);
          const mimeType = imageType(bytes);
          if (mimeType === "image/png") bytes = enlargeFormula(bytes);
          if (bytes.length > MAX_IMAGE_BYTES)
            throw new QuestionImageError("单张题图超过 2MB，请裁剪后再提问。");
          image = { mimeType, bytes };
          cache.set(key, image);
          cacheBytes += bytes.length;
          while (
            cache.size > MAX_QUESTION_IMAGES ||
            cacheBytes > MAX_TOTAL_BYTES
          ) {
            const oldest = cache.keys().next().value;
            cacheBytes -= cache.get(oldest).bytes.length;
            cache.delete(oldest);
          }
        }
        total += image.bytes.length;
        if (total > MAX_TOTAL_BYTES)
          throw new QuestionImageError("本题图片总量超过 8MB，请分段提问。");
        blocks.push({
          type: "image",
          mimeType: image.mimeType,
          data: image.bytes.toString("base64"),
        });
      }
      return blocks;
    } catch (error) {
      if (parentSignal?.aborted) throw error;
      if (error instanceof QuestionImageError) throw error;
      throw new QuestionImageError("题图读取失败或超时，请检查网络后重试。");
    }
  };
}
