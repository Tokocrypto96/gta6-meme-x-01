// Entry program for the make.fun bounty "Post a GTA 6 meme on X"
// (gta6-meme-x-01). Node 22, standard library only.
//
// The meme itself lives on X; this repository only has to hand in the
// post's address. So the whole job of this program is: take POST.json
// from the repository root (the bot directory) and copy it into the
// output directory, where the grader picks it up.
//
// When it runs outside the grading container, the two directories can
// be pointed elsewhere through the environment:
//   MAKEFUN_BOT_DIR     (default: /bot)
//   MAKEFUN_OUTPUT_DIR  (default: /output)
//
// Local check:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "POST.json");
const target = join(outputDir, "POST.json");

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(source, target);
} catch (error) {
  console.error(`Could not copy ${source} to ${target}: ${(error as Error).message}`);
  process.exit(1);
}

console.log(`Copied ${source} -> ${target}`);
