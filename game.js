const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const box = 25;
const canvasSize = 23; 
let snake = [];
let score=0;
snake[0] = {
	x: Math.floor((canvasSize/2)) * box, //cordinates of respawn
	y: Math.floor((canvasSize/2)) * box
}
let dir;
document.addEventListener('keydown',direction);

function direction(event)
{
	if(event.keyCode==65)
		dir="LEFT";
	if(event.keyCode==87)
		dir="UP";
	if(event.keyCode==68)
		dir="RIGHT";
	if(event.keyCode==83)
		dir="DOWN";
}
let food = {
	x:Math.floor(1 + (Math.random()*(canvasSize-1))) * box,
	y:Math.floor(1 + (Math.random()*(canvasSize-1))) * box
}
//draw
function draw() {
	ctx.fillStyle = 'lightgreen';
	ctx.fillRect(box,box,canvasSize*box -box,canvasSize*box -box);
	//snake
	for(let i = 0; i<snake.length;i++)
		{
			ctx.fillStyle='purple';
			ctx.fillRect(snake[i].x,snake[i].y,box,box);
		}
let snakeX=snake[0].x;
let snakeY=snake[0].y;
			if(dir=="LEFT" && dir != "RIGHT")
				snakeX-=box;
			if(dir=="RIGHT" && dir != "LEFT")
				snakeX+=box;
			if(dir=="UP" && dir != "DOWN")
				snakeY-=box;
			if(dir=="DOWN" && dir != "UP")
				snakeY+=box;
			
			if(snakeX == food.x && snakeY == food.y)
				{  score+=1;
					 food = {
				x:Math.floor(1 + (Math.random()*(canvasSize-1))) * box,
				y:Math.floor(1 + (Math.random()*(canvasSize-1))) * box
					}	
				}
			else
			{
				snake.pop();
			}

			let newHead = {
				x: snakeX,
				y: snakeY
			};
			// snake.unshift(newHead);

//game over
			function collision(head, array){
				for(let i = 0;i < array.length;i++)
				{
					if(head.x == array[i].x && head.y==array[i].y)
					{
						return true;
					}
				}
				return false;
			}

			if(snakeX<box || snakeY<box || snakeX>((canvasSize-1)*box) || snakeY>((canvasSize-1)*box) || collision(newHead,snake))
			{
				clearInterval(game);
				if(confirm('Lost, again?')){
    				window.location.reload();  
				}
			}

			snake.unshift(newHead);

			//food
			ctx.fillStyle = 'red';
			ctx.fillRect(food.x,food.y,box,box)

			//score
			ctx.fillStyle = 'white';
			ctx.font = '24px Changa one';
			ctx.clearRect(0,0,50,25);
			ctx.fillText(score,box,0.8*box);

}

let game = setInterval(draw,115);
