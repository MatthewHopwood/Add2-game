var GameCanvas;
var ctx;
var Cards = [];
var target;
var first = Math.random() * 50 | 0;
var second = Math.random() * 50 | 0;
var third = Math.random() * 99 | 0;
var Card1;
var Card2;
var Card3;
var Random = Math.random() * 5 | 0;
var Won = false;
var Condition1 = false;
var Condition2 = false;
var GameMode = 'ingame';

function Card(x, y, number)
{
    this.x = x;
    this.y = y;
    this.number = number;
    this.width = 100;
    this.height = 75;
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        ctx.fillStyle = 'rgb(0, 100, 255)';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.font = '50px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillText(this.number, this.x + this.width / 2, this.y + this.height / 1.5);    
    }
    this.isTouched = function(x, y)
    {
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    Cards.push(this);
}

function targetCard(number)
{
    this.x = 200;
    this.y = 100;
    this.width = 200;
    this.height = 100;
    this.number = number;
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        ctx.fillStyle = 'rgb(50, 150, 255)';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.font = '50px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText(this.number, this.x + this.width / 2, this.y + this.height / 1.5);
    }
}

function StartGame()
{
    GameCanvas = document.getElementById('game_canvas');
    ctx = GameCanvas.getContext('2d');

    window.addEventListener('click', MouseClick, true);

    target = new targetCard(first + second);

    if (third == target.number)
    {
        third = target.number - 1;
    }
    
    if (third > target.number)
    {
        third = Math.random() * target.number - 1 | 0;
    }

    if (third == second)
    {
        third = second - 1;
    }
    
    if (third == first)
    {
        third = first - 1;
    }
    
    if (Random == 0)
    {
        Card1 = new Card(100, 400, first);
        Card2 = new Card(250, 400, second);
        Card3 = new Card(400, 400, third);
    }
    else if (Random == 1)
    {
        Card1 = new Card(100, 400, first);
        Card2 = new Card(400, 400, second);
        Card3 = new Card(250, 400, third);
    }
    else if (Random == 2)
    {
        Card1 = new Card(250, 400, first);
        Card2 = new Card(100, 400, second);
        Card3 = new Card(400, 400, third);
    }
    else if (Random == 3)
    {
        Card1 = new Card(250, 400, first);
        Card2 = new Card(400, 400, second);
        Card3 = new Card(100, 400, third);
    }
    else if (Random == 4)
    {
        Card1 = new Card(400, 400, first);
        Card2 = new Card(250, 400, second);
        Card3 = new Card(100, 400, third);
    }
    else if (Random == 5)
    {
        Card1 = new Card(400, 400, first);
        Card2 = new Card(100, 400, second);
        Card3 = new Card(250, 400, third);
    }
         
    MainLoop();
}

function MouseClick(Event)
{
    var x = Event.layerX;
    var y = Event.layerY;
    if (GameMode == 'ingame')
    {
        if (Card1.isTouched(x, y))
        {
            Condition1 = true;
            if (Condition1 && Condition2)
            {
                Won = true;
                GameOver();
            }
        }
    
        if (Card2.isTouched(x, y))
        {
            Condition2 = true;
            if (Condition2 && Condition1)
            {
                Won = true;
                GameOver();
            }
        }
    
        if (Card3.isTouched(x, y))
        {
            Won = false;
            GameOver();
        }
    }
}

function GameOver()
{
    GameMode = 'GameOver';

    if (Won)
    {
        ctx.font = '50px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('You Win', 300, 300)
    }
    else
    {
        ctx.font = '50px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('You Lose', 300, 300)
    }
}

function restartGame() 
{
    Cards = [];
    first = Math.random() * 50 | 0;
    second = Math.random() * 50 | 0;
    third = Math.random() * 99 | 0;
    Random = Math.random() * 5 | 0;
    Won = false;
    Condition1 = false;
    Condition2 = false;
    GameMode = 'ingame';
    StartGame();
}

$("#restart").on("click", function() {
    restartGame();
})

function MainLoop()
{
    ctx.clearRect(0, 0, 600, 600);

    if (GameMode == 'GameOver')
    {
        GameOver();
    }

    Card1.update();
    Card2.update();
    Card3.update();

    target.update();
    
    setTimeout(MainLoop, 16);
}

window.onload = function(e)
{
    console.log('Game Started')
    StartGame();
}
