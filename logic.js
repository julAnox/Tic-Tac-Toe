let board = Array(9).fill(null);
let currentPlayer = 'X';

function handleClick(index) {
    if (board[index] === null) {
        board[index] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        render();
    }
}

function render() {
    const items = document.querySelectorAll('.item');
    items.forEach((item, index) => {
        item.textContent = board[index];
    });
}

document.querySelectorAll('.item').forEach((item, index) => {
    item.addEventListener('click', () => handleClick(index));
});

document.querySelector('.button').addEventListener('click', () => {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    render();
});

render();


