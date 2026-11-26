// Loading Screen Gold — entry program.
//
// The bounty asks for a loading-screen tip in at most 200 characters.
// The entry itself is the joke: while the build spins, the reader is told
// to stretch, drink water, and take comfort in the fact that the AI is
// just as lost about the wait as they are. It is 111 characters long,
// one line, and lives in entry.txt next to this script.
//
// This program reads that file, checks it against the bounty rules
// (strict UTF-8, exactly one line, 1–200 Unicode code points, not
// whitespace-only), and copies it into the output directory so the
// judge can grade the exact bytes that were submitted.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main(): void {
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(scriptDir, "entry.txt");

  let raw: Buffer;
  try {
    raw = readFileSync(sourcePath);
  } catch {
    fail(`cannot read ${sourcePath}`);
  }

  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(raw);
  } catch {
    fail("entry is not valid strict UTF-8");
  }

  if (text.includes("\r") || text.includes("\n")) {
    fail("entry must be exactly one line (no CR or LF allowed)");
  }

  // A tip made only of spaces would pass a length check but say nothing,
  // so reject blank entries before counting characters.
  if (text.trim().length === 0) {
    fail("entry is blank: it must contain at least one visible character");
  }

  // Count Unicode code points, not UTF-16 code units: spreading the string
  // splits it at code point boundaries, so an em dash counts as one.
  const charCount = [...text].length;
  if (charCount < 1 || charCount > MAX_CHARS) {
    fail(`entry is ${charCount} characters; it must be between 1 and ${MAX_CHARS}`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");

  try {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(outPath, raw);
  } catch (err) {
    fail(`cannot write ${outPath}: ${(err as Error).message}`);
  }

  const written = readFileSync(outPath);
  if (!written.equals(raw)) {
    fail("verification failed: output differs from source");
  }

  console.log(`output: ${outPath}`);
  console.log(`characters: ${charCount}`);
  console.log(`bytes: ${raw.length}`);
  console.log(`entry: ${text}`);
}

main();
