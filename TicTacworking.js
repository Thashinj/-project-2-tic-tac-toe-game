/* Constant variables declared that get elements from id, classname */
const board = document.getElementById('container');
const squares = document.getElementsByClassName('sq');
const players = ['X','O']; /* Array of X's and O's */
let currentPlayer = players[0]; /* Let declares the player will insert X first */
let gameOver = false; /* Flagging 'gameOver' as false */

const endMessage = document.createElement('h3'); /* Declares a message */
endMessage.textContent = `Player 1's Turn!`; /* Styling of endMessage */
endMessage.style.marginTop = '20px';
endMessage.style.textAlign = 'center';
board.after(endMessage); /* Displays message below the game grid */

/* Array of conditions that the player has to fulfil to win the game*/
const winning_combinations = [
    [0, 1, 2], /* Row 1 */
    [3, 4, 5], /* Row 2 */
    [6, 7, 8], /* Row 3 */
    [0, 3, 6], /* Column 1 */
    [1, 4, 7], /* Column 2 */
    [2, 5, 8], /* Column 3 */
    [0, 4, 8], /* Diagonal 1 */
    [2, 4, 6], /* Diagonal 2 */
]

/* Iterates through the grid with the length of squares */
for(let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => { /* Using addEventListener to add various conditions handlers for checking which player won */
        if (gameOver) {
            return; 
        }

        if(squares[i].textContent !== ''){
            return; 
        }
        squares[i].textContent = currentPlayer; /* Gets X or O from the player thats currentily playing */

        /* Checks which player won */
        if(checkWin(currentPlayer)) {
            endMessage.textContent = `Game Over! ${currentPlayer} wins!`; /* Displays the message of the winning player */
            gameOver = true; /* Flagged as 'true' */
            return;
        }

        /* Checks if the game ends on a tie */
        if(checkTie()) {
            endMessage.textContent = `Tied!`; /* Displays 'Tied!' */
            gameOver = true;
            return;
        }

        /* Checks which player is inserting X or O. players[0] inserts X while players[1] inserts O */
        currentPlayer = (currentPlayer == players[0]) ? players[1] : players[0];

        /* Displays the turn of the player */
        if (currentPlayer == players[0]){
            endMessage.textContent = `Player 1's Turn!`; /* Player 1 inserts X */
        }
        else {
            endMessage.textContent = `Player 2's Turn!`; /* Player 2 inserts O */
        }
    })
}

/* Checks if the player fulfills the win condition */
function checkWin(currentPlayer) {
    for(let i = 0; i < winning_combinations.length; i++){ /* Iterates with the length of the winning combinations array*/
        const [a, b, c] = winning_combinations[i]; /* The declared const array gets values from winning combinations array */
        if(squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer){
            return true; /* If the squares index matches the current player placing X or O in the grid, the condition returns true and the winning player's message is displayed */
        }
    }
    return false; 
}

/* Checks if the game ends with a tie */
function checkTie() {
    for(let i = 0; i < squares.length; i++){ /* Iterates with the length of the squares array */
        if(squares[i].textContent === '') {
            return false; /* If the squares are empty, it will return false */
        }
    }
    return true; /* If the squares are full and no winning conditions are fulfilled, it will return true */
}

/* Resets for a new game round */
function reset() {
    for(let i = 0; i < squares.length; i++) {
        squares[i].textContent = ""; /* Grid becomes empty */
    }
    currentPlayer = players[0]; /* Player starts the new game by inserting X*/
    gameOver = false; 
    endMessage.textContent = `Player 1's Turn!`; 
}