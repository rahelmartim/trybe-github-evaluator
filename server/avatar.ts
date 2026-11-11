const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

/** GitHub always serves default identicons at this size. */
const IDENTICON_SIZE = 420;

/** Reads the width from the IHDR chunk of a PNG file. */
export function pngWidth(bytes: Uint8Array): number | null {
  if (bytes.length < 24 || PNG_SIGNATURE.some((byte, i) => bytes[i] !== byte)) {
    return null;
  }
  return new DataView(bytes.buffer, bytes.byteOffset).getUint32(16);
}

/**
 * Tells if an avatar is GitHub's default identicon. GitHub resizes uploaded
 * photos to the requested size, but it ignores the size for an identicon.
 */
export function isDefaultIdenticon(bytes: Uint8Array, requestedSize: number): boolean {
  const width = pngWidth(bytes);
  return width === IDENTICON_SIZE && width !== requestedSize;
}
