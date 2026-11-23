// One-star review entry: writes a single deadpan one-star review of sleep,
// an everyday essential, to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Fully deterministic: one fixed string, no randomness, no time, no network.
//
// The joke: sleep is filed as a complaint in earnest against a thing that
// cannot be fixed. The grievance is the sharpest true one everyone knows -
// eight hours a night and you still wake up tired - and the sting turns in
// the last few words, when the hotel that charges full price turns out never
// to clean the room. One line, one joke, no exclamation marks, deadpan throughout.
// At 133 characters it also stays well inside the 160 cap while keeping the
// review short enough that the exact-tie rule (smaller text wins) favours it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "One star. Sleep takes eight hours a night and returns me still tired, like a hotel that charges full price and never cleans the room.";

// Gate: the entry must be UTF-8 text of 1-160 characters, a single line,
// not only white space. No trailing newline is written, so the file's
// character count is exactly the review's length and the gate sees one
// clean line.
const chars = [...REVIEW].length;
if (chars < 1 || chars > 160 || REVIEW.trim().length === 0) {
  console.error(`entry must be 1-160 characters, got ${chars}`);
  process.exit(1);
}
if (REVIEW.includes("\n") || REVIEW.includes("\r")) {
  console.error("entry must be a single line");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REVIEW, "utf8");
