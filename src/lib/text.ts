export function countWords(text: string) {
  const words = text.trim().match(/\b[\w'-]+\b/g) ?? [];
  const sentences = text.trim().split(/[.!?]+/).filter((item) => item.trim().length > 0);
  const paragraphs = text.split(/\n\s*\n/).filter((item) => item.trim().length > 0);
  return {
    words: words.length,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    sentences: sentences.length,
    paragraphs: paragraphs.length,
    readingMinutes: Math.max(1, Math.ceil(words.length / 200))
  };
}

export function toTitleCase(text: string) {
  return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export function sentenceCase(text: string) {
  return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase());
}

export function cleanText(text: string, options: Record<string, boolean>) {
  let output = text;
  if (options.normalizeBreaks) output = output.replace(/\r\n?/g, "\n");
  if (options.trimLines) output = output.split("\n").map((line) => line.trim()).join("\n");
  if (options.extraSpaces) output = output.replace(/[ \t]{2,}/g, " ");
  if (options.blankLines) output = output.replace(/\n{3,}/g, "\n\n");
  if (options.duplicates) {
    const seen = new Set<string>();
    output = output.split("\n").filter((line) => {
      const key = line.trim();
      if (!key) return true;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).join("\n");
  }
  if (options.special) output = output.replace(/[^\w\s.,!?;:'"()\-@/]/g, "");
  return output.trim();
}
