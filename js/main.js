"use strict";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const groundImg = new Image();
groundImg.src = 'img/bg.png';
const foodImg = new Image();
foodImg.src = 'img/food.png';
let box = 50;
let score = 0;
let food = {
  x: Math.floor(Math.random() * 11 + 1) * box,
  y: Math.floor(Math.random() * 9 + 1) * box
};
let snake = [];
snake[0] = {
  x: 6 * box,
  y: 5 * box
};
let direction;
document.addEventListener("keyup", snakeMove);

function snakeMove(e) {
  if (e.keyCode == 37 && direction != "right") {
    direction = "left";
  }

  if (e.keyCode == 38 && direction != "down") {
    direction = "up";
  }

  if (e.keyCode == 39 && direction != "left") {
    direction = "right";
  }

  if (e.keyCode == 40 && direction != "up") {
    direction = "down";
  }
}

function drawGame() {
  ctx.drawImage(groundImg, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lightblue" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "white";
  ctx.font = `${box}px Arial`;
  ctx.fillText(`Score: ${score}`, box * 0.25, box * 0.85);
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score += 1;
    food = {
      x: Math.floor(Math.random() * 11 + 1) * box,
      y: Math.floor(Math.random() * 9 + 1) * box
    };
  } else {
    snake.pop();
  }

  if (snakeX < 2 * box && direction == 'left') snakeX = 13 * box;
  if (snakeX > 11 * box && direction == 'right') snakeX = 0;
  if (snakeY < 2 * box && direction == 'up') snakeY = 11 * box;
  if (snakeY > 9 * box && direction == 'down') snakeY = 0;
  if (direction == 'left') snakeX -= box;
  if (direction == 'right') snakeX += box;
  if (direction == 'up') snakeY -= box;
  if (direction == 'down') snakeY += box;
  let newHead = {
    x: snakeX,
    y: snakeY
  };
  snake.unshift(newHead);
}

let game = setInterval(drawGame, 150);

function btnsHndlr() {
  let btns = document.querySelectorAll('#mobileBtns span');
  btns[0].parentElement.style.display = 'block';
  btns.forEach(btn => btn.addEventListener("click", () => {
    if (btn.getAttribute('class').match(/\w+$/) == 'left' && direction != "right") {
      direction = 'left';
    }

    if (btn.getAttribute('class').match(/\w+$/) == 'right' && direction != "left") {
      direction = 'right';
    }

    if (btn.getAttribute('class').match(/\w+$/) == 'up' && direction != "down") {
      direction = 'up';
    }

    if (btn.getAttribute('class').match(/\w+$/) == 'down' && direction != "up") {
      direction = 'down';
    }
  }));
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) btnsHndlr();