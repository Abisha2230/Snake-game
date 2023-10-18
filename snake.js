const gameBoard = document.getElementById('snake-board');
const context = gameBoard.getContext('2d');
const scoreText = document.getElementById('scoreValue');

const Width = gameBoard.width;
const Height = gameBoard.height;
const Unit = 20;
let foodX;
let foodY;
let xVel = 25;
let yVel = 0;
let score = 0;
let active = true;
let start = false;

let snake = [

    {x:Unit*3,y:0},
    {x:Unit*2,y:0},
    {x:Unit,y:0},
    {x:0,y:0}
]

window.addEventListener('keydown',keyPress)

startGame();
function startGame(){
    context.fillStyle ='white';
    context.fillRect(0,0,Width,Height) ;
    createFood();
    foodDisplay();
    //drawSnake();
    //moveSnake();
    //clearBoard();
    //drawSnake()
    drawSnake();

   
}
 
function clearBoard(){
    context.fillStyle = 'white';
    context.fillRect(0,0,Width,Height);
}

 function createFood(){
    foodX = Math.floor(Math.random()*Width/Unit)*Unit;
    foodY = Math.floor(Math.random()*Height/Unit)*Unit;
     
 }
function foodDisplay(){
    context.fillStyle ='deepskyblue';
    context.fillRect(foodX,foodY,Unit,Unit) ;
}
function drawSnake(){
    context.fillStyle = 'yellow';
    context.strokeStyle = 'brown';
    snake.forEach((snakePart)=>{
        context.fillRect(snakePart.x,snakePart.y,Unit,Unit);
        context.strokeRect(snakePart.x,snakePart.y,Unit,Unit);
      })
}
function moveSnake(){
    const head = {x:snake[0].x+xVel,y:snake[0].y+yVel}
    snake.unshift(head)
    if(snake[0].x==foodX && snake[0].y==foodY){
        score +=1;
        scoreText.textContent = score;
        createFood();
    }
    else
        snake.pop();
    
}

function nextTick(){
    if(active){
    setTimeout(()=>{
        clearBoard();
        foodDisplay();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();


    },200)
}
else{
    clearBoard();
    context.font = "bold 50px serif ";
    context.fillStyle ='black';
    context.textAlign = 'center';
    context.fillText ("Game Over!!",Width/2,Height/2)
}

}
function keyPress(event){
    if(!start){
        start=true;
        nextTick();
    }
    const Left = 37
    const Up = 38
    const Right = 39
    const Down = 40

    switch(true){
           case(event.keyCode==Left&& xVel!=Unit):
           xVel = -Unit;
            yVel = 0;
         break;
         case(event.keyCode==Right && xVel!=-Unit):
            xVel = Unit;
            yVel = 0;
            break;

            case(event.keyCode==Up && yVel!=Unit):
            xVel = 0;
            yVel = -Unit;
            break;

            case(event.keyCode==Down&&yVel!=-Unit):
            xVel= 0;
            yVel = Unit;
            break;

    }
}

function checkGameOver(){
switch(true){
    case(snake[0].x<0):
    case(snake[0].x>=Width):
    case(snake[0].y<0):
    case(snake[0].y>=Height):
    active = false;
    break;

}

}