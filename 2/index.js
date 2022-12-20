import fs from "fs";

const PLAYER_SCENARIOS = [
  { name: "rock", move: "X", C: "WIN", B: "LOSE", A: "DRAW", points: 1 },
  { name: "paper", move: "Y", A: "WIN", C: "LOSE", B: "DRAW", points: 2 },
  { name: "scissors", move: "Z", B: "WIN", A: "LOSE", C: "DRAW", points: 3 },
];

const GAME_SCORES = {
  WIN: 6,
  LOSE: 0,
  DRAW: 3,
};

const SECOND_GAME_STRAT = {
  X: "LOSE",
  Y: "DRAW",
  Z: "WIN",
};

function playGame2(opponentMove, outcome) {
  const desiredOutcome = SECOND_GAME_STRAT[outcome];
  const neededMove = PLAYER_SCENARIOS.find(
    (s) => s[opponentMove] === desiredOutcome
  );
  return neededMove.points + GAME_SCORES[desiredOutcome];
}

const fileLines = fs.readFileSync("input.txt").toString().split("\n");

const results = fileLines.map((line) => {
  const moves = line.split(" ");
  return playGame2(moves[0], moves[1]);
});

console.log(results.reduce((acc, n) => acc + n, 0));

function playGame(opponentMove, playerMove) {
  const move = PLAYER_SCENARIOS.find((s) => s.move == playerMove);
  const outcome = move[opponentMove];
  return move.points + GAME_SCORES[outcome];
}
