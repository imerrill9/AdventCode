import * as fs from "fs";

type Range = {
  start: number;
  end: number;
};

function doesOverlapAtAll(range1: Range, range2: Range): boolean {
  //example of true 1-5, 4-7
  return (
    withinRange(range1.start, range2) ||
    withinRange(range1.end, range2) ||
    withinRange(range2.start, range1) ||
    withinRange(range2.end, range1)
  );
}

function withinRange(value: number, range: Range): boolean {
  return value <= range.end && value >= range.start;
}

function getInputs(range: string): Range {
  const values = range.split("-");
  return { start: parseInt(values[0]), end: parseInt(values[1]) };
}

function run(): number {
  const fileLines = fs.readFileSync("input.txt").toString().split("\n");

  const results: number = fileLines
    .map((line) => {
      let splitLine = line.split(",");
      return doesOverlapAtAll(getInputs(splitLine[0]), getInputs(splitLine[1]));
    })
    .reduce((acc, b) => (b === true ? acc + 1 : acc), 0);

  return results;
}

console.log(run());
