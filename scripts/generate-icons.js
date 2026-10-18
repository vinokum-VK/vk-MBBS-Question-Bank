import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createCRC32Table() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[i] = c;
  }
  return table;
}

const crcTable = createCRC32Table();

function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);

  const toCrc = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(toCrc), 0);

  return Buffer.concat([len, toCrc, crc]);
}

function createPng(width, height, isMaskable = false) {
  // RGBA buffer
  const stride = width * 4 + 1; // 1 filter byte per line
  const rawData = Buffer.alloc(stride * height);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = width * 0.45;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * stride;
    rawData[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Base gradient: Purple #7c3aed to #4c1d95
      const gradRatio = (x + y) / (width + height);
      let r = Math.round(124 * (1 - gradRatio) + 76 * gradRatio);
      let g = Math.round(58 * (1 - gradRatio) + 29 * gradRatio);
      let b = Math.round(237 * (1 - gradRatio) + 149 * gradRatio);
      let a = 255;

      if (!isMaskable) {
        // Round corner mask if not maskable
        const cornerR = width * 0.22;
        const inCornerX = x < cornerR || x > width - cornerR;
        const inCornerY = y < cornerR || y > height - cornerR;
        if (inCornerX && inCornerY) {
          const cx = x < cornerR ? cornerR : width - cornerR;
          const cy = y < cornerR ? cornerR : height - cornerR;
          const cdist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (cdist > cornerR) {
            a = 0;
          }
        }
      }

      if (a > 0) {
        // Draw Medical Cross
        const crossW = width * 0.12;
        const crossH = width * 0.6;
        const inVertCross = Math.abs(dx) <= crossW / 2 && Math.abs(dy) <= crossH / 2;
        const inHorizCross = Math.abs(dy) <= crossW / 2 && Math.abs(dx) <= crossH / 2;

        if (inVertCross || inHorizCross) {
          r = 255;
          g = 255;
          b = 255;
        }

        // Central Circle Badge
        const badgeR = width * 0.22;
        const goldBorder = width * 0.02;
        if (dist <= badgeR + goldBorder && dist >= badgeR) {
          // Gold border
          r = 250;
          g = 204;
          b = 21;
        } else if (dist < badgeR) {
          // Deep navy purple center
          r = 30;
          g = 27;
          b = 75;

          // Simple stylized "VK" representation in pixels inside badge
          const scale = width / 192;
          const kx = dx / scale;
          const ky = dy / scale;

          // Draw stylized letter pixels
          // 'V'
          const inV = (ky >= -12 && ky <= 12) && (
            (Math.abs(kx - (-14) - ky * 0.4) < 2.5 && ky <= 10) ||
            (Math.abs(kx - (-6) + ky * 0.4) < 2.5 && ky <= 10)
          );
          // 'K'
          const inK = (ky >= -12 && ky <= 12) && (
            (kx >= 4 && kx <= 8) || // vertical line of K
            (Math.abs(kx - 14 - ky * 0.8) < 2.5 && ky <= 0 && kx >= 6) || // top diagonal
            (Math.abs(kx - 14 + ky * 0.8) < 2.5 && ky >= 0 && kx >= 6)    // bottom diagonal
          );

          if (inV || inK) {
            r = 255;
            g = 255;
            b = 255;
          }
        }
      }

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bits per channel
  ihdrData[9] = 6; // RGBA color type
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // IDAT chunk
  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate icons
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180, false));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPng(64, 64, false));

console.log('Icons generated successfully in public/');
