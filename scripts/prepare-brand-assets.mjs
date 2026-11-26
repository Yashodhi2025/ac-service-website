import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

// Exact pixel-based cleanup approved by the owner. No tracing or AI redrawing.
const source = "public/images/brand/ecme-logo-original.jpeg";
const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

for (let offset = 0; offset < data.length; offset += 4) {
  const maximum = Math.max(data[offset], data[offset + 1], data[offset + 2]);
  const minimum = Math.min(data[offset], data[offset + 1], data[offset + 2]);
  // Remove the JPEG's near-black matte and its neutral compression noise.
  const alpha = maximum - minimum < 6 && maximum < 28
    ? 0
    : Math.max(0, Math.min(1, (maximum - 10) / 70));

  if (alpha > 0 && alpha < 1) {
    // Undo the original black matte at edges, preventing a dark fringe on white.
    for (let channel = 0; channel < 3; channel++) {
      const unmatted = (data[offset + channel] - 10 * (1 - alpha)) / alpha;
      data[offset + channel] = Math.max(0, Math.min(255, Math.round(unmatted)));
    }
  }
  data[offset + 3] = Math.round(alpha * 255);
}

await mkdir("public/images/brand", { recursive: true });
const raw = { width: info.width, height: info.height, channels: 4 };
const { data: trimmed, info: trimInfo } = await sharp(data, { raw })
  .trim({ threshold: 12 })
  .png()
  .toBuffer({ resolveWithObject: true });

await sharp(trimmed)
  .resize(976, 976, { fit: "contain", background: "#00000000", kernel: "lanczos3" })
  .extend({ top: 24, bottom: 24, left: 24, right: 24, background: "#00000000" })
  .png({ compressionLevel: 9 })
  .toFile("public/images/brand/ecme-logo.png");

// The favicon uses the original ECME snowflake/sun emblem, retaining its letters.
const emblemSize = Math.min(trimInfo.width, Math.round(trimInfo.height * 0.75));
const emblem = await sharp(trimmed)
  .extract({ left: Math.round((trimInfo.width - emblemSize) / 2), top: 0, width: emblemSize, height: emblemSize })
  .png()
  .toBuffer();

await sharp(emblem).resize(192, 192).png().toFile("src/app/icon.png");
await sharp(emblem)
  .resize(144, 144)
  .extend({ top: 18, bottom: 18, left: 18, right: 18, background: "#091b30" })
  .flatten({ background: "#091b30" })
  .png()
  .toFile("src/app/apple-icon.png");

// A standard multi-size ICO container, with lossless PNG entries.
const sizes = [16, 32, 48];
const entries = await Promise.all(sizes.map((size) => sharp(emblem).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let imageOffset = header.length;
entries.forEach((image, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8);
  header.writeUInt32LE(imageOffset, entry + 12);
  imageOffset += image.length;
});
await writeFile("src/app/favicon.ico", Buffer.concat([header, ...entries]));
console.log("Prepared transparent ECME logo, favicon, app icon, and Apple icon from the original artwork.");
