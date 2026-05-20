import { describe, expect, it } from "vitest";
import { parsePageRanges } from "./pdf";

describe("parsePageRanges", () => {
  it("parses comma separated ranges into zero-based indices", () => {
    expect(parsePageRanges("1-3, 5, 2", 8)).toEqual([0, 1, 2, 4]);
  });

  it("rejects out of range pages", () => {
    expect(() => parsePageRanges("1-9", 4)).toThrow();
  });
});
