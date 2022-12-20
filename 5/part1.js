"use strict";
exports.__esModule = true;
var fs = require("fs");
function getMove(line) {
    var numbers = line.match(/\d+/g).map(Number);
    return { quantity: numbers[0], from: numbers[1], to: numbers[2] };
}
function executeMoves(moves) {
    var stacks = [
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
    moves.forEach(function (move) {
        var _a;
        var moving = stacks[move.from - 1].splice(stacks[move.from - 1].length - move.quantity, move.quantity);
        (_a = stacks[move.to - 1]).push.apply(_a, moving);
    });
    return getTopBoxes(stacks);
}
function getTopBoxes(finalStacks) {
    return finalStacks.map(function (stack) { return stack[stack.length - 1]; }).join("");
}
function run() {
    var moves = fs
        .readFileSync("input.txt")
        .toString()
        .split("\n")
        .map(function (line) { return getMove(line); });
    return executeMoves(moves);
}
console.log(run());
