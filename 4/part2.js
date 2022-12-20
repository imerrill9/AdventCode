"use strict";
exports.__esModule = true;
var fs = require("fs");
function doesOverlapAtAll(range1, range2) {
    //example of true 1-5, 4-7
    return (withinRange(range1.start, range2) ||
        withinRange(range1.end, range2) ||
        withinRange(range2.start, range1) ||
        withinRange(range2.end, range1));
}
function withinRange(value, range) {
    return value <= range.end && value >= range.start;
}
function getInputs(range) {
    var values = range.split("-");
    return { start: parseInt(values[0]), end: parseInt(values[1]) };
}
function run() {
    var fileLines = fs.readFileSync("input.txt").toString().split("\n");
    var results = fileLines
        .map(function (line) {
        var splitLine = line.split(",");
        return doesOverlapAtAll(getInputs(splitLine[0]), getInputs(splitLine[1]));
    })
        .reduce(function (acc, b) { return (b === true ? acc + 1 : acc); }, 0);
    return results;
}
console.log(run());
