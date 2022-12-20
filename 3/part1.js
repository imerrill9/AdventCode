import fs from "fs";

function findCommonItem(firstHalf, secondHalf) {
  let firstSet = new Set(firstHalf);
  let secondSet = new Set(secondHalf);
  for (let v of firstSet) {
    if (secondSet.has(v)) {
      return v;
    }
  }
}

function determinePriority(character) {
  // create ['a', 'b', 'c', ...] and ['A', 'B', 'C'] from ascii codes
  const lowerCases = Array.from(Array(26)).map((_, i) =>
    String.fromCharCode(i + 97)
  );
  const upperCases = Array.from(Array(26)).map((_, i) =>
    String.fromCharCode(i + 65)
  );

  const asciiValue = character.charCodeAt(0);
  if (asciiValue > 97) {
    //lowercase
    return lowerCases.indexOf(character) + 1;
  } else {
    //uppercase
    return upperCases.indexOf(character) + 27;
  }
}

function run() {
  const fileLines = fs.readFileSync("input.txt").toString().split("\n");

  const commonItems = fileLines.map((line) => {
    const chars = [...line];
    const firstHalf = chars.slice(0, Math.ceil(chars.length / 2));
    const secondHalf = chars.slice(Math.ceil(chars.length / 2));
    return findCommonItem(firstHalf, secondHalf);
  });

  const priorities = commonItems.map((v) => determinePriority(v));

  return priorities.reduce((acc, n) => n + acc, 0);
}

console.log(run());
