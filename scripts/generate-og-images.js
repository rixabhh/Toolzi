import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { deflateSync } from "node:zlib";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(rootDir, "public", "og");
const width = 1200;
const height = 630;

const categories = [
  ["pdf", "PDF"],
  ["image", "IMAGE"],
  ["text", "TEXT"],
  ["calculate", "CALCULATE"],
  ["create", "CREATE"],
  ["productivity", "PRODUCTIVITY"],
  ["developer", "DEVELOPER"],
  ["privacy", "PRIVACY"]
];

const font = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  G: ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  J: ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "11011", "10001"],
  X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
  " ": ["000", "000", "000", "000", "000", "000", "000"]
};

function crc32(buffer) {
  let crc = -1;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function setPixel(pixels, x, y, color) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const index = (y * width + x) * 4;
  pixels[index] = color[0];
  pixels[index + 1] = color[1];
  pixels[index + 2] = color[2];
  pixels[index + 3] = color[3];
}

function fillRect(pixels, x, y, rectWidth, rectHeight, color) {
  for (let row = y; row < y + rectHeight; row += 1) {
    for (let col = x; col < x + rectWidth; col += 1) {
      setPixel(pixels, col, row, color);
    }
  }
}

function drawText(pixels, text, x, y, scale, color) {
  let cursor = x;
  for (const char of text.toUpperCase()) {
    const glyph = font[char] ?? font[" "];
    glyph.forEach((row, rowIndex) => {
      [...row].forEach((cell, colIndex) => {
        if (cell === "1") {
          fillRect(pixels, cursor + colIndex * scale, y + rowIndex * scale, scale, scale, color);
        }
      });
    });
    cursor += (glyph[0].length + 1) * scale;
  }
}

function textWidth(text, scale) {
  return [...text.toUpperCase()].reduce((sum, char) => {
    const glyph = font[char] ?? font[" "];
    return sum + (glyph[0].length + 1) * scale;
  }, 0);
}

function drawCircle(pixels, centerX, centerY, radius, color) {
  for (let y = centerY - radius; y <= centerY + radius; y += 1) {
    for (let x = centerX - radius; x <= centerX + radius; x += 1) {
      const distance = Math.hypot(x - centerX, y - centerY);
      if (distance <= radius && distance >= radius - 12) {
        setPixel(pixels, x, y, color);
      }
    }
  }
}

function createImage(label) {
  const pixels = Buffer.alloc(width * height * 4);
  fillRect(pixels, 0, 0, width, height, [26, 26, 26, 255]);
  fillRect(pixels, 0, 0, width, 8, [230, 230, 230, 255]);
  drawText(pixels, "TOOLZI", 72, 70, 8, [255, 255, 255, 255]);
  drawText(pixels, "RUNS IN YOUR BROWSER", 72, 540, 5, [166, 166, 166, 255]);

  const labelScale = label.length > 8 ? 13 : 18;
  const labelWidth = textWidth(label, labelScale);
  drawText(pixels, label, Math.max(72, Math.round((width - labelWidth) / 2) - 80), 260, labelScale, [255, 255, 255, 255]);

  drawCircle(pixels, 940, 320, 120, [255, 255, 255, 255]);
  drawText(pixels, label[0], 900, 274, 16, [255, 255, 255, 255]);

  const scanlines = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    scanlines[y * (width * 4 + 1)] = 0;
    pixels.copy(scanlines, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }

  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    header,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(scanlines)),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

await mkdir(outputDir, { recursive: true });

for (const [slug, label] of categories) {
  await writeFile(path.join(outputDir, `${slug}.png`), createImage(label));
}
