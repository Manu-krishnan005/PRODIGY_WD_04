let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
let isAI = false;
let playerSymbol = "X"; // Player's chosen symbol
let aiSymbol = "O";     // AI's symbol

// Set the game mode (AI or 2-player)
function setMode(mode) {
    if (mode === 'ai') {
        isAI = true;
        document.getElementById("mode-select").style.display = "none";
        document.getElementById("player-select").style.display = "block"; // Show symbol selection
    } else {
        isAI = false;
        document.getElementById("mode-select").style.display = "none";
    }
}

// Player chooses to play as X or O
function chooseSymbol(symbol) {
    playerSymbol = symbol;
    aiSymbol = symbol === "X" ? "O" : "X"; // AI gets the opposite symbol
    turn = "X";  // Always starts with X
    document.getElementById("player-select").style.display = "none"; // Hide symbol selection
    
    // If player chooses O, AI (X) makes the first move
    if (playerSymbol === "O") {
        aiMove();
    }
}

// Event listeners for the boxes
boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "" && turn === playerSymbol) {
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();

            // AI move if it's AI's turn and game is not over
            if (!isGameOver && isAI && turn === aiSymbol) {
                aiMove();
            }
        } else if (!isGameOver && e.innerHTML === "" && !isAI) {
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

// Change turn
function changeTurn() {
    turn = turn === "X" ? "O" : "X";
}

// Check for win
function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 != "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins!";
            document.querySelector("#play-again").style.display = "inline";
            // After the game ends, prompt to play again
            setTimeout(() => {
                if (confirm("Do you want to play again?")) {
                    resetGame();
                    // Prompt user to choose game mode after reset
                    document.getElementById("mode-select").style.display = "inline";
                }
            }, 500); // Give some time before prompting
        }
    }
}

// Check for draw
function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw!";
            document.querySelector("#play-again").style.display = "inline";
            // After the game ends, prompt to play again
            setTimeout(() => {
                if (confirm("Do you want to play again?")) {
                    resetGame();
                    // Prompt user to choose game mode after reset
                    document.getElementById("mode-select").style.display = "inline";
                }
            }, 500); // Give some time before prompting
        }
    }
}

// Reset game
function resetGame() {
    isGameOver = false;
    turn = playerSymbol; // Reset turn to player's symbol
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
    });

    // If player is O, AI (X) makes the first move again
    if (playerSymbol === "O") {
        aiMove();
    }
}

// Play again functionality
document.querySelector("#play-again").addEventListener("click", () => {
    resetGame();
    // Prompt user to choose game mode after resetting
    document.getElementById("mode-select").style.display = "inline";
});

// AI makes a move
function aiMove() {
    let availableBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerHTML === "") {
            availableBoxes.push(index);
        }
    });

    if (availableBoxes.length > 0) {
        let randomIndex = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        boxes[randomIndex].innerHTML = aiSymbol;
        checkWin();
        checkDraw();
        changeTurn();
    }
}
