import * as fs from "fs";

function* streamSignal(signal: string) {
  let start = 0;
  while (true) {
    const buffer = signal.slice(start, start + 14);
    if (buffer.length < 14) {
      break;
    } else {
      start++;
      yield buffer;
    }
  }
}

function hasDuplicates(buffer: string): boolean {
  let letterSet = new Set(buffer);
  return letterSet.size == 14;
}

function run(): number {
  const stream = streamSignal(fs.readFileSync("input.txt").toString());
  let count = 13;
  let buffer;
  let duplicatesFound = false;
  do {
    count++;
    buffer = stream.next();
    duplicatesFound = hasDuplicates(buffer.value);
  } while (!duplicatesFound && !buffer.done);
  return count;
}

console.log(run());
