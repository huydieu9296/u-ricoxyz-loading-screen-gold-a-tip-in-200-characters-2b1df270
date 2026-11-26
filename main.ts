// Loading Screen Gold — entry program.
// Bounty: "Loading Screen Gold: A Tip in 200 Characters" — write a funny,
// useful loading-screen tip in at most 200 characters.
// The entry itself (111 characters, exactly one line):
//   Tip: while this builds, stretch, drink water, and remember — the AI also
//   has no idea why it's taking this long.
// It turns the dead time of a loading screen into a joke at the AI's expense:
// the user is told to look after themselves while the model, for all its
// confidence, waits just as blindly as they do.
// This program reads that single line from entry.txt next to this file and
// writes it byte-identical to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Runs with no network, any CWD, in a read-only /bot directory.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Absolute path to entry.txt, resolved from this file's own location so the
// program works no matter what the current working directory is.
const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.txt");

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputPath = join(outputDir, "entry.txt");

let raw: Buffer;
try {
  raw = readFileSync(sourcePath);
} catch (err) {
  fail(`cannot read ${sourcePath}: ${(err as Error).message}`);
}

// Reject invalid UTF-8 instead of silently replacing bad bytes: the gate
// scores the file as UTF-8 text, so a replacement character would change it.
let text: string;
try {
  text = new TextDecoder("utf-8", { fatal: true }).decode(raw);
} catch {
  fail("entry.txt is not valid UTF-8");
}

// Gate: exactly one line, 1-200 characters, not only whitespace, no CR/LF
// anywhere (including a trailing newline).
// Count code points (not UTF-16 units) so the 200-char gate matches the
// scorer's character count even for non-BMP characters.
const charCount = [...text].length;
if (text.includes("\r") || text.includes("\n")) {
  fail("entry must be exactly one line with no newline characters");
}
if (charCount < 1 || charCount > MAX_CHARS) {
  fail(`entry must be 1-${MAX_CHARS} characters, got ${charCount}`);
}
if (text.trim().length === 0) {
  fail("entry must not be only whitespace");
}

try {
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, raw);
} catch (err) {
  fail(`cannot write ${outputPath}: ${(err as Error).message}`);
}

// Verify the written file is byte-identical before reporting success.
const written = readFileSync(outputPath);
if (!written.equals(raw)) {
  fail("verification failed: output differs from entry.txt");
}

const bytes = raw.length;
console.log(`wrote ${outputPath}: ${charCount} characters, ${bytes} bytes`);
console.log(`entry: ${text}`);
