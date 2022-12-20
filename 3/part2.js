import fs from "fs";

function findCommonItem([firstElf, secondElf, thirdElf]) {
  let firstSet = new Set(firstElf);
  let secondSet = new Set(secondElf);
  let thirdSet = new Set(thirdElf);
  for (let v of firstSet) {
    if (secondSet.has(v) && thirdSet.has(v)) {
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

function getElfGroups(fileLines) {
  const data = fileLines.reduce(
    (acc, line) => {
      if (acc.counter < 3) {
        let currentGroup = acc.elfGroups.pop();
        currentGroup.push(line);
        acc.elfGroups.push(currentGroup);
        acc.counter += 1;
      } else {
        acc.counter = 1;
        acc.elfGroups.push([line]);
      }
      return acc;
    },
    {
      counter: 0,
      elfGroups: [[]],
    }
  );
  return data.elfGroups;
}

function run() {
  const fileLines = fs.readFileSync("input.txt").toString().split("\n");

  return getElfGroups(fileLines)
    .map((group) => findCommonItem(group))
    .map((character) => determinePriority(character))
    .reduce((acc, priority) => acc + priority);
}

console.log(run());
