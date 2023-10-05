let score = document.getElementById('score');
let timeleft = document.getElementById('timeleft');
let start = document.getElementById('start');
let pause = document.getElementById('pause');
let squares = document.querySelectorAll('.square');
let Yourscore = 0;
let timeLeft = 0;
let hitPosition = null;
let timerId = null;
let randomMoleTd = null;
let TargetScore = 50;

let gameMusic = new Audio('./Assets/music/gameMusic.mp3');
let hitMusic = new Audio('./Assets/music/hitMusic.mp3');
let winMusic = new Audio('./Assets/music/crowd-cheer-ii-6263.mp3');
let lostMusic = new Audio('./Assets/music/lost-game.mp3');

pause.style.display = 'none';


function randomMole(){
    squares.forEach(square => {
        square.classList.remove('mole');
    })

    let randomsquare  = squares[Math.floor(Math.random()*squares.length)];
    randomsquare.classList.add('mole');
    hitPosition = randomsquare.id;
    
}
randomMole()

function countDown(){
    timeLeft--;
    timeleft.innerText = `Timeleft: ${timeLeft}`;

    if(timeLeft <= 30  && timeLeft > 10){
        timeleft.style.color = 'green';
    }else if(timeLeft <=10 && timeLeft >= 0){
        timeleft.style.color = 'black';
        timeleft.classList.add("active");
    }

    

    if(timeLeft === 0){
        hitMusic.pause();
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleTd);
        alert('Game over');
        if(TargetScore <= Yourscore){
            winMusic.play();
            alert("You win!");
        }else{
            lostMusic.play();
            alert("You lose!");
        }
    }
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
    
        if(timerId !== null){
            hitMusic.play();
            if(square.id === hitPosition){
                Yourscore++;
                score.innerText = `Your score: ${Yourscore}`;
                hitPosition = null;
            }else{
                Yourscore--;
                score.innerText = `Your score: ${Yourscore}`;
                hitPosition = null;
            }
        }
    })
})

function startgame(){
    pause.style.display = 'flex';
    
    gameMusic.play();
    winMusic.pause();
    lostMusic.pause();
    Yourscore = 0;
    timeLeft = 60;
    
    score.innerText = `Your score: 0`;
    timeleft.innerText = `Timeleft: 60`;

    //callback function
    timerId = setInterval(randomMole, 1000);
    randomMoleTd = setInterval(countDown, 1000);
    timeleft.classList.remove("active");

}

function pausegame() {
    if(pause.innerHTML === 'Pause'){
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleTd);
        timerId = null;
        randomMoleTd = null;
        pause.innerHTML = 'Resume';
    }else{
        gameMusic.play();
        randomMoleTd = setInterval(randomMole, 1000);
        timerId = setInterval(countDown, 1000);
        pause.innerHTML = 'Pause';
    }
}



start.addEventListener('click', startgame);
pause.addEventListener('click', pausegame);

