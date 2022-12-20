import * as fs from "fs";

type Range = {
  start: number;
  end: number;
};

function doesOverlap(range1: Range, range2: Range): boolean {
  //example of true: 1-4, 2-3
  return (
    (range1.start <= range2.start && range1.end >= range2.end) ||
    (range2.start <= range1.start && range2.end >= range1.end)
  );
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
      return doesOverlap(getInputs(splitLine[0]), getInputs(splitLine[1]));
    })
    .reduce((acc, b) => (b === true ? acc + 1 : acc), 0);

  return results;
}

console.log(run());
