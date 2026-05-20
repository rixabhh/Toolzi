export function parsePageRanges(input: string, totalPages: number): number[] {
  const pages = new Set<number>();
  for (const part of input.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const [startRaw, endRaw] = trimmed.split("-");
    const start = Number(startRaw);
    const end = endRaw ? Number(endRaw) : start;
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start || end > totalPages) {
      throw new Error("Use page ranges like 1-3, 5, or 2,4,6.");
    }
    for (let page = start; page <= end; page += 1) pages.add(page - 1);
  }
  if (!pages.size) throw new Error("Pick at least one page.");
  return [...pages].sort((a, b) => a - b);
}
