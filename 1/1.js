import fs from 'fs'

const fileLines = fs.readFileSync('input.txt').toString().split("\n");

const allElves = fileLines.reduce((elves, line) => {
    if (line === '') {
        elves.push({'total': 0})
    } else {
        let currentElf = elves.pop()
        currentElf.total += parseInt(line)
        elves.push(currentElf)
    }
    return elves
}, [{total: 0}])

const sortedElves = allElves.sort((a, b) => b.total - a.total)

// top three total
console.log(sortedElves[0].total + sortedElves[1].total + sortedElves[2].total)
