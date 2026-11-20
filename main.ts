// news-image-20261119 entry, Node 22, standard library only.
// The front page is the entry.png sitting next to this file. This program
// copies that file into the output directory so the grader reads exactly
// those bytes. Run it outside the grader with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  throw new Error("entry.png is missing next to main.ts");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

const copied = statSync(target).size;
const original = statSync(source).size;
if (copied !== original) {
  throw new Error(`entry.png copy is incomplete: ${copied} of ${original} bytes`);
}
