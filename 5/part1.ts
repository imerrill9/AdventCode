import * as fs from "fs";

type Move = {
  quantity: number;
  from: number;
  to: number;
};

function getMove(line: string): Move {
  const numbers = line.match(/\d+/g)!.map(Number);
  return { quantity: numbers[0], from: numbers[1], to: numbers[2] };
}

function executeMoves(moves: Move[]): string {
  let stacks: string[][] = [
    ["G", "D", "V", "Z", "J", "S", "B"],
    ["Z", "S", "M", "G", "V", "P"],
    ["C", "L", "B", "S", "W", "T", "Q", "F"],
    ["H", "J", "G", "W", "M", "R", "V", "Q"],
    ["C", "L", "S", "N", "F", "M", "D"],
    ["R", "G", "C", "D"],
    ["H", "G", "T", "R", "J", "D", "S", "Q"],
    ["P", "F", "V"],
    ["D", "R", "S", "T", "J"],
  ];

  moves.forEach((move) => {
    let moving = stacks[move.from - 1].splice(
      stacks[move.from - 1].length - move.quantity,
      move.quantity
    );
    stacks[move.to - 1].push(...moving.reverse()); // remove reverse() for part2
  });

  return getTopBoxes(stacks);
}

function getTopBoxes(finalStacks: string[][]): string {
  return finalStacks.map((stack) => stack[stack.length - 1]).join("");
}

function run(): string {
  const moves: Move[] = fs
    .readFileSync("input.txt")
    .toString()
    .split("\n")
    .map((line) => getMove(line));
  return executeMoves(moves);
}

console.log(run());
