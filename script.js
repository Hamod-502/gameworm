const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('scoreDisplay');
const playBtn = document.getElementById('playBtn');
const againBtn = document.getElementById('againBtn');
const modeSelection = document.getElementById('modeSelection');
const mode1Btn = document.getElementById('mode1Btn');
const mode2Btn = document.getElementById('mode2Btn');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

canvas.width = 600;
canvas.height = 400;

const gridSize = 20;
let speed = 150;
let snake = [{ x: 100, y: 100 }];
let food = { x: 200, y: 200 };
let dx = gridSize;
let dy = 0;
let score = 0;
let isPlaying = false;
let currentMode = 1;

function draw() {
    if (isPlaying) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFood();
        drawSnake();
        moveSnake();
        checkCollision();
        setTimeout(draw, speed);
    }
}

function drawSnake() {
    ctx.fillStyle = '#2ecc71';
    snake.forEach(part => ctx.fillRect(part.x, part.y, gridSize, gridSize));
}

function drawFood() {
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        updateScore();
        generateFood();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    
    if (currentMode === 1) {
        if (head.x < 0) {
            head.x = canvas.width - gridSize;
        } else if (head.x >= canvas.width) {
            head.x = 0;
        }
        if (head.y < 0) {
            head.y = canvas.height - gridSize;
        } else if (head.y >= canvas.height) {
            head.y = 0;
        }
    } else if (currentMode === 2) {
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            endGame();
        }
    }

    if (snake.slice(1).some(part => part.x === head.x && part.y === head.y)) {
        endGame();
    }
}

function endGame() {
    isPlaying = false;
    againBtn.style.display = 'block';
}

function resetGame() {
    snake = [{ x: 100, y: 100 }];
    dx = gridSize;
    dy = 0;
    score = 0;
    updateScore();
    generateFood();
}

function updateScore() {
    scoreDisplay.textContent = 'Score: ' + score;
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize,
        y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize
    };
}

playBtn.addEventListener('click', () => {
    isPlaying = true;
    playBtn.style.display = 'none';
    modeSelection.style.display = 'none';
    draw();
});

againBtn.addEventListener('click', () => {
    isPlaying = true;
    againBtn.style.display = 'none';
    resetGame();
    draw();
});

mode1Btn.addEventListener('click', () => {
    currentMode = 1;
    modeSelection.style.display = 'none';
    playBtn.style.display = 'block';
});

mode2Btn.addEventListener('click', () => {
    currentMode = 2;
    modeSelection.style.display = 'none';
    playBtn.style.display = 'block';
});

upBtn.addEventListener('click', () => {
    if (dy === 0) { dx = 0; dy = -gridSize; }
});

downBtn.addEventListener('click', () => {
    if (dy === 0) { dx = 0; dy = gridSize; }
});

leftBtn.addEventListener('click', () => {
    if (dx === 0) { dx = -gridSize; dy = 0; }
});

rightBtn.addEventListener('click', () => {
    if (dx === 0) { dx = gridSize; dy = 0; }
});
