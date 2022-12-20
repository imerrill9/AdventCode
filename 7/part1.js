"use strict";
exports.__esModule = true;
var fs = require("fs");
function interpretLine(line) {
    var tokens = line.split(" ");
    if (line.includes("$")) {
        return tokens[1] == "cd"
            ? { command: "cd", target: tokens[2] }
            : { command: "ls" };
    }
    else if (line.includes("dir")) {
        return { name: tokens[1], files: [], directories: [] };
    }
    else {
        return { size: parseInt(tokens[0]), name: tokens[1] };
    }
}
function createFileTree(tokens, currentDirectory) {
    //base case
    if (tokens.length === 0) {
        return cleanTree(currentDirectory.parent);
    }
    var t = tokens.shift();
    // determine if anything needs done, (if it's the 'ls' command nothing is needed)
    if ("command" in t && "target" in t) {
        if (t.target == "..") {
            // move one up the file tree
            return createFileTree(tokens, currentDirectory.parent);
        }
        var targetDirectory = currentDirectory.directories.find(function (dir) { return dir.name == t.target; });
        // switch to other directory
        return createFileTree(tokens, targetDirectory);
    }
    else if ("size" in t) {
        //add files to filelist for current directory
        currentDirectory.files.push(t);
    }
    else if ("directories" in t) {
        //add directory to directories for current directory and add parent refrence
        t.parent = currentDirectory;
        currentDirectory.directories.push(t);
    }
    return createFileTree(tokens, currentDirectory);
}
function cleanTree(tree) {
    //removes circular refrence that was needed to go up a directory level
    delete tree.parent;
    tree.directories.forEach(function (d) { return cleanTree(d); });
    return tree;
}
function determineFileSizes(tree) {
    var total = 0;
    tree.files.forEach(function (f) { return (total += f.size); });
    tree.directories.forEach(function (d) { return (total += determineFileSizes(d).size); });
    tree.size = total;
    return tree;
}
function findDirectoriesSmallerThanHundredThousand(tree, list) {
    tree.directories.forEach(function (d) {
        if (d.size <= 100000) {
            list.push(d);
        }
        findDirectoriesSmallerThanHundredThousand(d, list);
    });
    return list;
}
function run() {
    var tokens = fs
        .readFileSync("input.txt")
        .toString()
        .split("\n")
        .map(function (line) { return interpretLine(line); });
    // assuming we're starting at '/' for "simplicity"
    var fileTree = createFileTree(tokens, {
        name: "/",
        files: [],
        directories: []
    });
    var sizedTree = determineFileSizes(fileTree);
    return findDirectoriesSmallerThanHundredThousand(sizedTree, []).reduce(function (acc, d) { return acc + d.size; }, 0);
}
console.log(run());
