const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {
  constructor() {
    this.playerTurn = "O";

    this.grid = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    // Screen.addCommand("t", "test command (remove)", TTT.testCommand);

    let moveUp = () => {
      this.cursor.resetBackgroundColor.call(this.cursor);
      this.cursor.up();
      this.cursor.setBackgroundColor.call(this.cursor);
      Screen.render();
    };

    let moveDown = () => {
      this.cursor.resetBackgroundColor.call(this.cursor);
      this.cursor.down();
      this.cursor.setBackgroundColor.call(this.cursor);
      Screen.render();
    };

    let moveRight = () => {
      this.cursor.resetBackgroundColor.call(this.cursor);
      this.cursor.right();
      this.cursor.setBackgroundColor.call(this.cursor);
      Screen.render();
    };

    let moveLeft = () => {
      this.cursor.resetBackgroundColor.call(this.cursor);
      this.cursor.left();
      this.cursor.setBackgroundColor.call(this.cursor);
      Screen.render();
    };

    Screen.addCommand("w", "go up", moveUp);
    Screen.addCommand("s", "go down", moveDown);
    Screen.addCommand("a", "go left", moveLeft);
    Screen.addCommand("d", "go right", moveRight);
    Screen.addCommand("h", "show commands", Screen.printCommands);

    Screen.render();
  }

  // Remove this
  // static testCommand() {
  //   console.log("TEST COMMAND");
  // }

  static checkWin(grid) {
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    // helper function to flatten the grid into 1-dim array
    const flatten = (grid) => {
      let result = [];

      for (let el of grid) {
        if (Array.isArray(el)) {
          let resp = flatten(el);
          result = result.concat(resp);
        } else {
          result.push(el);
        }
      }

      return result;
    };

    let roundWon = false;
    let playerWon = undefined;

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let gameState = flatten(grid);

    for (let i = 0; i < winningConditions.length; i++) {
      const winCond = winningConditions[i];
      let a = gameState[winCond[0]];
      let b = gameState[winCond[1]];
      let c = gameState[winCond[2]];

      if (a === " " || b === " " || c === " ") continue;
      if (a === b && b === c) {
        roundWon = true;
        playerWon = a;
        break;
      }
    }

    if (roundWon) {
      return playerWon;
    }

    let roundDraw = !gameState.includes(" ");
    if (roundDraw) return "T";
    else return false;
  }

  static endGame(winner) {
    if (winner === "O" || winner === "X") {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === "T") {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }
}

module.exports = TTT;
