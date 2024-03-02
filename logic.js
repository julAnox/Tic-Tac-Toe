let board = Array(9).fill(null);
let currentPlayer = 'X';

function handleClick(index) {
    if (board[index] === null) {
        board[index] = currentPlayer;
        const winner = checkWinner();
        render();

        if (winner) {
            if (winner === 'tie') {
                setStatus('Ничья!');
            } else {
                setStatus(`Победитель: ${winner}`);
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function render() {
    const items = document.querySelectorAll('.item');
    items.forEach((item, index) => {
        item.textContent = board[index];
        if (board[index] === 'X') {
            item.style.color = 'black';
        } else if (board[index] === 'O') {
            item.style.color = 'white';
        }
    });
}

function setStatus(message) {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    for (let cell of board) {
        if (cell === null) {
            return null;
        }
    }

    return 'tie';
}

function resetGame() {
    board = Array(9).fill(null);
    render();
    setStatus('');
}

document.querySelectorAll('.item').forEach((item, index) => {
    item.addEventListener('click', () => handleClick(index));
});

document.getElementById('reset').addEventListener('click', resetGame);

render();