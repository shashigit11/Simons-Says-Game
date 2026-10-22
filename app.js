let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game is started");
        started = true;
    levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");

    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");

    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIndx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIndx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);

    //rdm btn chose
    gameFlash(randBtn);
}

// function checkAns(){

//     let idx = level-1;

//     if(userSeq[idx] === gameSeq[idx]) {
//         console.log("same value");
//     }else{
//         h2.innerText = `Game Over! Press Any Key to Start.`;
//     }

// }

function checkAns() {
    let idx = userSeq.length - 1; // last pressed button
    if (userSeq[idx] === gameSeq[idx]) {
        console.log("Correct so far!");
        if (userSeq.length === gameSeq.length) {
            // user finished the sequence correctly
            setTimeout(levelUp, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver(){
    h2.innerText = `Game Over! Your score was ${level} Press Any Key to Start.`;
    
    if(level > highestScore){
        highestScore = level;
        localStorage.setItem("New High Score: ", highestScore);
    }
    h3.innerText = "Highest Score so far is "+ highestScore; 
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
    document.querySelector("body").style.backgroundColor="white";}, 150);

    reset();
}  

function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns();
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}