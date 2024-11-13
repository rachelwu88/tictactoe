const PLAYER_X_CLASS = 'x';
const PLAYER_O_CLASS = 'circle';
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.getElementById('winningMessageText');
let isPlayer_O_Turn = false;

startGame()

restartButton.addEventListener('click', startGame);

function startGame() {
	isPlayer_O_Turn = false;
	cellElements.forEach(cell => {
		cell.classList.remove(PLAYER_X_CLASS);
		cell.classList.remove(PLAYER_O_CLASS);
		cell.innerHTML =''; 		//CLEARS THE IMG
		cell.removeEventListener('click', handleCellClick);
		cell.addEventListener('click', handleCellClick, { once: true });
	})
	setBoardHoverClass();
	winningMessageElement.classList.remove('show');
}

function handleCellClick(e) {
	const cell = e.target;
	const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
	placeMark(cell, currentClass);
	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurns();
		setBoardHoverClass();
	}
}
//edited to change colors & background
function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = "It's a draw!";
		winningMessageElement.style.backgroundColor = "	#ffbf00";	//gold bg
	} else {
		const winnerColor = isPlayer_O_Turn ? "#8ae1f0" : "#fbbfd0"; //blue bg or pink bg -- depends who wins
		winningMessageTextElement.innerText = `${isPlayer_O_Turn ? "Blue Ghost" : "Pink Ghost"} wins!`;
		winningMessageElement.style.backgroundColor = winnerColor;  //sets bg color
	}
	winningMessageElement.classList.add('show');
}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS);
	})
}
//Edited it for pacman img
function placeMark(cell, currentClass) {
    const pacmanImage = document.createElement('img');
    pacmanImage.src = currentClass === PLAYER_X_CLASS ? 'images/pacman-x.png' : 'images/pacman-o.png';
    cell.appendChild(pacmanImage); //add pacman img to parent(which is the cell)
	cell.classList.add(currentClass)
}

function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn;
}

function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_X_CLASS);
	boardElement.classList.remove(PLAYER_O_CLASS);
	if (isPlayer_O_Turn) {
		boardElement.classList.add(PLAYER_O_CLASS);
	} else {
		boardElement.classList.add(PLAYER_X_CLASS);
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}