// game status element stored here to let us use more easily later

const statusDisplay = document.querySelector('.outcome');

// variable declaration to track game state throughout game

let gameActive = true;

// current player stored here so we know whos turn it is

let currentPlayer = "X";

// current game state will be stored here. Array is used to allow us to easily track played cells

let gameState = ["", "", "", "", "", "", "", "", "",];

// declared messages that will display game decision

const winningMessage = () => `Player ${currentPlayer} has won! `
const drawMessage = () => `Draw game!`
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn! `

// setting initial message

statusDisplay.innerHTML = currentPlayerTurn();



const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleCellPlayed(clickedCell, clickedCellIndex){
    // we update the internal game state to reflect played move, as well as UI
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation(){
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === ''){
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;

}
// this will check if there are any values in the game not yet populated
let roundDraw = !gameState.includes("");
if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
}
    // if we get to here then we know no one has won and moves can still be made so we change players
handlePlayerChange();
}


function handleCellClick(clickedCellEvent) {
    // save clicked html element in a variable for easier further use
    const clickedCell = clickedCellEvent.target;
    // here the 'data-cell-index' attribute from the clicked cell will be grabbed
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );
    // next we check if the call has already been played or if the game is paused
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    // if everythin is in order then the game will proceed
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// event listeners to the actual game cells

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);