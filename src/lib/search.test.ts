import { describe, expect, it } from "vitest";
import { searchTools } from "./search";
import { tools } from "../tools/registry";

describe("searchTools", () => {
  it("finds casual intent phrases", () => {
    expect(searchTools("chatgpt to pdf", tools)[0].tool.id).toBe("markdown-to-pdf");
    expect(searchTools("combine pdf", tools)[0].tool.id).toBe("merge-pdf");
    expect(searchTools("compress photo", tools)[0].tool.id).toBe("image-compressor");
    expect(searchTools("calculate gst", tools)[0].tool.id).toBe("gst-calculator");
    expect(searchTools("sign document", tools)[0].tool.id).toBe("signature-maker");
  });
});
