

let canvas = document.getElementById('game'),
    ctx = canvas.getContext('2d'),
    ballRadius = 9,
    x = canvas.width / (Math.floor(Math.random() * 10) + 3), // Fixed Math.random() usage
    y = canvas.height - 40,
    dx = 2,
    dy = -2;
    

let paddleHeight = 15,
    paddleWidth = 72,
    paddleX = (canvas.width - paddleWidth) / 2;

function drawPaddle() {
    ctx.fillStyle = 'black'; // Set the fill color before drawing
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
}

document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.getBoundingClientRect().left; // Corrected offset reference
    if (relativeX > paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

let rowCount = 5,
    columnCount = 9,
    brickWidth = 54,
    brickHeight = 18,
    brickPadding = 12,
    topOffset = 40,
    leftOffset = 33,
    score = 0;

let bricks = [];
for (let c = 0; c < columnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < rowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}


function drawBricks() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + leftOffset;
                let brickY = (r * (brickHeight + brickPadding)) + topOffset;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight); // Corrected method from roundRect() to rect()
                ctx.fillStyle = 'blue';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI *2);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.closePath();
}
function hitDetection(){
    for(let c=0;c<columnCount;c++){
        for(let r=0;r<rowCount;r++){
            let b = bricks[c][r];
            if(b.status === 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy =-dy;
                    b.status=0;
                    score++;
                    if(score === rowCount * columnCount){
                        alert('You Win');
                        document.location.reload();
                    }
                }
            }
        }
    }
}
function trackScore(){
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = "black";
    ctx.fillText('Score:'+score,8,24)
}
const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click',resetGame);
function resetGame(){
    location.reload();
}
function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBricks();
    drawBall();
    hitDetection();
    trackScore();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert('Game Over!');
            document.location.reload();
        }
    }
    if(y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy;
    }
    x += dx;
    y += dy;
}


setInterval(init, 10);
