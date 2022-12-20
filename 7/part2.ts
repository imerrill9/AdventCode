import * as fs from "fs";

type Command = {
  command: string;
  target?: string;
};

type File = {
  size: number;
  name: string;
};

type Directory = {
  name: string;
  files: File[];
  directories: Directory[];
  parent?: Directory;
  size?: number;
};

function interpretLine(line: string): Command | File | Directory {
  const tokens = line.split(" ");
  if (line.includes("$")) {
    return tokens[1] == "cd"
      ? { command: "cd", target: tokens[2] }
      : { command: "ls" };
  } else if (line.includes("dir")) {
    return { name: tokens[1], files: [], directories: [] };
  } else {
    return { size: parseInt(tokens[0]), name: tokens[1] };
  }
}

function createFileTree(
  tokens: (Command | File | Directory)[],
  currentDirectory: Directory
): Directory {
  //base case
  if (tokens.length === 0) {
    return cleanTree(currentDirectory.parent!);
  }
  const t = tokens.shift()!;

  // determine if anything needs done, (if it's the 'ls' command nothing is needed)
  if ("command" in t && "target" in t) {
    if (t.target == "..") {
      // move one up the file tree
      return createFileTree(tokens, currentDirectory.parent!);
    }
    const targetDirectory = currentDirectory.directories.find(
      (dir) => dir.name == t.target
    );
    // switch to other directory
    return createFileTree(tokens, targetDirectory!);
  } else if ("size" in t) {
    //add files to filelist for current directory
    currentDirectory.files.push(t as File);
  } else if ("directories" in t) {
    //add directory to directories for current directory and add parent refrence
    t.parent = currentDirectory;
    currentDirectory.directories.push(t as Directory);
  }
  return createFileTree(tokens, currentDirectory);
}

function cleanTree(tree: Directory): Directory {
  //removes circular refrence that was needed to go up a directory level
  delete tree.parent;
  tree.directories.forEach((d) => cleanTree(d));
  return tree;
}

function determineFileSizes(tree: Directory): Directory {
  let total = 0;
  tree.files.forEach((f) => (total += f.size));
  tree.directories.forEach((d) => (total += determineFileSizes(d).size!));
  tree.size = total;
  return tree;
}

function findDirectoryCanidates(
  tree: Directory,
  list: Directory[]
): Directory[] {
  tree.directories.forEach((d) => {
    if (d.size! >= 2586708) {
      list.push(d);
    }
    findDirectoryCanidates(d, list);
  });
  return list;
}

function run(): number {
  const tokens = fs
    .readFileSync("input.txt")
    .toString()
    .split("\n")
    .map((line) => interpretLine(line));

  // assuming we're starting at '/' for "simplicity"
  const fileTree = createFileTree(tokens, {
    name: "/",
    files: [],
    directories: [],
  });
  const sizedTree = determineFileSizes(fileTree);
  const candidates = findDirectoryCanidates(sizedTree, []).sort(
    (a, b) => a.size! - b.size!
  );
  return candidates[0].size!;
}

console.log(run());
