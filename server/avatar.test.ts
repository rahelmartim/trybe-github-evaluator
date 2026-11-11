import { describe, expect, it } from "vitest";
import { isDefaultIdenticon, pngWidth } from "./avatar.js";

function pngHeader(width: number): Uint8Array {
  const bytes = new Uint8Array(24);
  bytes.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  new DataView(bytes.buffer).setUint32(16, width);
  return bytes;
}

describe("avatar", () => {
  it("reads the width of a PNG file", () => {
    expect(pngWidth(pngHeader(420))).toBe(420);
  });

  it("returns null for a file that is not a PNG", () => {
    expect(pngWidth(new Uint8Array([0xff, 0xd8, 0xff]))).toBeNull();
  });

  it("detects an identicon that ignores the requested size", () => {
    expect(isDefaultIdenticon(pngHeader(420), 40)).toBe(true);
  });

  it("accepts an uploaded photo at the requested size", () => {
    expect(isDefaultIdenticon(pngHeader(40), 40)).toBe(false);
  });
});
