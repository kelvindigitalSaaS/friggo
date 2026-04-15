/**
 * Generate PNG icons from the SVG for PWA/iOS compatibility.
 * Run: node scripts/generate-png-icons.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SVG_PATH = resolve(ROOT, "public/kaza-icon.svg");
const OUT_DIR = resolve(ROOT, "public/icons");

const SIZES = [48, 72, 96, 128, 152, 180, 192, 256, 384, 512];

mkdirSync(OUT_DIR, { recursive: true });

for (const size of SIZES) {
  const outPath = resolve(OUT_DIR, `icon-${size}.png`);
  await sharp(SVG_PATH)
    .resize(size, size)
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(outPath);
  console.log(`✅ ${size}x${size} → ${outPath}`);
}

console.log("\n🎉 All PNG icons generated!");
