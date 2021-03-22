var player1Turn = true;
var filledBoxes = [];
var moves = [];
var moveCount = 0;

const reset = (element) => {
  const elements = document.querySelectorAll(`.${element}`);
  setTimeout(() => {
    for (let e of elements) {
      e.style.display = "none";
    }
  }, 500);

  player1Turn = false;
  filledBoxes = [];
  moves = [];
  moveCount = 0;
};

const endGame = () => {
  reset("round");
  reset("cross");
};

const checkCombinations = (fbp) => {
  const combinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  for (let c of combinations) {
    if (fbp.includes(c[0]) && fbp.includes(c[1]) && fbp.includes(c[2])) {
      return true;
    }
  }
};

const checkMatch = (p, id) => {
  if (moves.length > 4) {
    console.log("in");
    let filledByPlayer = moves.map((move) =>
      move.player === p ? move.id : null
    );
    console.log(filledByPlayer);
    // let msg = "";
    if (checkCombinations(filledByPlayer)) {
      p === 1 ? alert("P1 is the winner") : alert("P2 is the winner");
      return true;
    }
  }
  return false;
};

const clicked = (id) => {
  if (!filledBoxes.includes(id)) {
    console.log("hello");
    if (player1Turn) document.getElementById(`r${id}`).style.display = "block";
    else document.getElementById(`c${id}`).style.display = "block";
    filledBoxes.push(id);
    let player = player1Turn ? 1 : 2;
    moves.push({ player, id });
    checkMatch(player, id) ? endGame() : null;
    player1Turn = !player1Turn;
    moveCount++;
  }
};
