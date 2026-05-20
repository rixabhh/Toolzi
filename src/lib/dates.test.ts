import { describe, expect, it } from "vitest";
import { diffDates } from "./dates";

describe("date helpers", () => {
  it("calculates date difference with optional end date", () => {
    expect(diffDates("2026-05-01", "2026-05-03", false)?.days).toBe(2);
    expect(diffDates("2026-05-01", "2026-05-03", true)?.days).toBe(3);
  });
});
