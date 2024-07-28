// script.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');
const hearts = [];
let collectedHearts = 0;

canvas.width = 800;
canvas.height = 600;

const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 20,
    height: 20,
    dx: 0,
    dy: 0,
    speed: 4
};

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawHearts() {
    hearts.forEach(heart => {
        ctx.drawImage(heart.img, heart.x, heart.y, heart.width, heart.height);
    });
}

function updatePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function detectCollision() {
    hearts.forEach((heart, index) => {
        if (
            player.x < heart.x + heart.width &&
            player.x + player.width > heart.x &&
            player.y < heart.y + heart.height &&
            player.y + player.height > heart.y
        ) {
            hearts.splice(index, 1);
            collectedHearts++;
            message.innerText = `Hearts collected: ${collectedHearts}`;
            if (collectedHearts === hearts.length) {
                message.innerText = 'I love you!';
            }
        }
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawHearts();
    updatePlayer();
    detectCollision();
    requestAnimationFrame(update);
}

function moveUp() {
    player.dy = -player.speed;
}

function moveDown() {
    player.dy = player.speed;
}

function moveLeft() {
    player.dx = -player.speed;
}

function moveRight() {
    player.dx = player.speed;
}

function keyDown(e) {
    if (e.key === 'ArrowUp' || e.key === 'w') moveUp();
    if (e.key === 'ArrowDown' || e.key === 's') moveDown();
    if (e.key === 'ArrowLeft' || e.key === 'a') moveLeft();
    if (e.key === 'ArrowRight' || e.key === 'd') moveRight();
}

function keyUp(e) {
    if (
        e.key === 'ArrowUp' || e.key === 'w' ||
        e.key === 'ArrowDown' || e.key === 's' ||
        e.key === 'ArrowLeft' || e.key === 'a' ||
        e.key === 'ArrowRight' || e.key === 'd'
    ) {
        player.dx = 0;
        player.dy = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function init() {
    for (let i = 0; i < 5; i++) {
        const heart = {
            x: Math.random() * (canvas.width - 20),
            y: Math.random() * (canvas.height - 20),
            width: 20,
            height: 20,
            img: new Image()
        };
        heart.img.src = 'heart.png';
        hearts.push(heart);
    }
    update();
}

init();