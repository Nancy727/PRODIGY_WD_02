const board = document.getElementById('board');
const squares = document.getElementsByClassName('square');
const players = ['X', 'O'];
let playerNameX = prompt("Enter Player X's name:");
let playerNameO = prompt("Enter Player O's name:");
let currentPlayer = players[0];
const endMessage = document.createElement('h2');
endMessage.textContent = `${playerNameX}'s turn!`;
endMessage.style.marginTop = '30px';
endMessage.style.textAlign = 'center';
board.after(endMessage);

const message = document.getElementById('message');
const balloons = document.getElementById('balloons');

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        if (squares[i].textContent !== '') {
            return;
        }
        squares[i].textContent = currentPlayer;
        squares[i].classList.add('clicked');
        if (checkWin(currentPlayer)) {
            showEndMessage(`Game over! ${currentPlayer === 'X' ? playerNameX : playerNameO} wins!`, true);
            return;
        }
        if (checkTie()) {
            showEndMessage(`Game is tied!`, false);
            return;
        }
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        endMessage.textContent = `${currentPlayer === 'X' ? playerNameX : playerNameO}'s turn!`;
    });
}

function checkWin(currentPlayer) {
    for (let i = 0; i < winning_combinations.length; i++) {
        const [a, b, c] = winning_combinations[i];
        if (squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
            return true;
        }
    }
    return false;
}

function checkTie() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === '') {
            return false;
        }
    }
    return true;
}

function restartButton() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = "";
        squares[i].classList.remove('clicked');
    }
    endMessage.textContent = `${playerNameX}'s turn!`;
    currentPlayer = players[0];
    message.innerHTML = '';
    balloons.innerHTML = '';
    balloons.style.display = 'none';
}

function showEndMessage(text, isWin) {
    endMessage.textContent = text;
    const card = document.createElement('div');
    card.style.padding = '20px';
    card.style.margin = '20px auto';
    card.style.width = '300px';
    card.style.backgroundColor = isWin ? '#87ceeb' : '#f08080';
    card.style.color = '#fff';
    card.style.borderRadius = '10px';
    card.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    card.style.fontSize = '20px';
    card.textContent = text;
    message.appendChild(card);
    if (isWin) {
        showBalloons();
    }
}

function showBalloons() {
    balloons.style.display = 'block';
    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.animationDuration = `${Math.random() * 2 + 3}s`;
        balloon.style.backgroundColor = getRandomColor();
        balloons.appendChild(balloon);
    }
}


function getRandomColor() {
    const colors = ['#ff69b4', '#ff4500', '#1e90ff', '#32cd32', '#ff6347', '#8a2be2'];
    return colors[Math.floor(Math.random() * colors.length)];
}
