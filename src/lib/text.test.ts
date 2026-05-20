import { describe, expect, it } from "vitest";
import { cleanText, countWords, sentenceCase, toTitleCase } from "./text";

describe("text helpers", () => {
  it("counts words and character metrics", () => {
    expect(countWords("One two.\n\nThree.")).toMatchObject({ words: 3, sentences: 2, paragraphs: 2 });
  });

  it("converts title and sentence case", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
    expect(sentenceCase("hello. world")).toBe("Hello. World");
  });

  it("cleans duplicate and spaced text", () => {
    expect(cleanText(" a   b \ncopy\ncopy", { extraSpaces: true, blankLines: true, trimLines: true, duplicates: true, special: false, normalizeBreaks: true })).toBe("a b\ncopy");
  });
});
