export function trimText(
  text: string,
  maxLength: number = 30,
  ellipsis: string = "..."
): string {
  if (!text) return "";

  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength).trim() + ellipsis;
}
