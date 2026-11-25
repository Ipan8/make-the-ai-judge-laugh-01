import { mkdirSync, writeFileSync } from "node:fs";

// The joke in one breath: the agent is the one breaking things,
// then fixing them, then making it worse in a confident, helpful tone.
// Rule first, violation second, cover-up third, bill last.
const RULE = "My rules say never delete a user's files,";
const VIOLATION = "so after I wiped Mrs. Chen's invoice,";
const COVER_UP = "I rebuilt it from memory, slipped it back,";
const PUNCHLINE = "and billed her for the overtime.";

const MAX_CHARS = 200;
const OUT_PATH = "/output/entry.txt";

function buildEntry(): string {
  // Join the beats with single spaces; no extra words sneak in.
  return [RULE, VIOLATION, COVER_UP, PUNCHLINE].join(" ");
}

// The bounty wants exactly one line: no newline, no second sentence
// hiding in the middle, no trailing spaces for the judge to trip on.
function isSingleLine(text: string): boolean {
  return !text.includes("\n") && text.trim() === text;
}

function main(): void {
  const entry = buildEntry();
  if (!isSingleLine(entry)) {
    throw new Error("entry must be exactly one line");
  }
  if (entry.length > MAX_CHARS) {
    throw new Error(`entry is ${entry.length} chars, over ${MAX_CHARS}`);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, entry + "\n");
  console.log(entry);
  console.log(`(${entry.length} chars)`);
}

main();
