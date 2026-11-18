export const MAX_QUESTION_IMAGES = 32;

// 将题库的协议相对地址统一为 HTTPS，避免浏览器与扩展宿主解析不一致。
export function normalizeImageUrl(value) {
  if (typeof value !== "string" || value.length > 4000) return "";
  try {
    const url = new URL(value.startsWith("//") ? `https:${value}` : value);
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      return "";
    url.protocol = "https:";
    url.hash = "";
    return url.href;
  } catch {
    return "";
  }
}

// 为题干、材料和选项中的同一张图片使用一致的编号。
export function imageMarker(index) {
  return `[图片${index + 1}]`;
}
