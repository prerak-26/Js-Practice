let button = document.querySelectorAll(".button");
let scorePrint = document.querySelector(".score-print");
let resultPrint = document.querySelector("#result");
let resetScore = document.querySelector("#score");
let resultShow = document.querySelector(".result-print");

let score = JSON.parse(localStorage.getItem('score')) || {
    user: 0,
    computer: 0,
    draw: 0
}

function valuGenerator() {
    const randomValue = Math.floor(Math.random() * 3) + 1;
    return randomValue;
}

function selectComputerValue(randomValue) {
    let computerValue = '';
    switch (randomValue) {
        case 1:
            computerValue = 'rock';
            break;
        case 2:
            computerValue = 'paper';
            break;
        case 3:
            computerValue = 'scissors';
            break;
        default:
            break;
    }
    return computerValue;
}

function resultGenerator(userValue, computerValue) {
    let result = '';
    if (userValue === computerValue) {
        result = 'Draw';
        score.draw++;
    } else if (
        (userValue === 'rock' && computerValue === 'scissors') ||
        (userValue === 'paper' && computerValue === 'rock') ||
        (userValue === 'scissors' && computerValue === 'paper')
    ) {
        result = 'You win';
        score.user++;
    } else {
        result = 'Computer wins';
        score.computer++;
    }
    localStorage.setItem('score', JSON.stringify(score));
    return result;
}

button.forEach(element => {
    element.onclick = function() {
        const userValue = element.id;
        console.log(userValue)
        const randomValue = valuGenerator();
        const computerValue = selectComputerValue(randomValue);
        let result = resultGenerator(userValue, computerValue);
        resultPrint.innerText = result;
        resultShow.innerHTML = `You <img src="assests/${userValue}-emoji.png" alt="" class="result-img"><img src="assests/${computerValue}-emoji.png" alt="" class="result-img"> Computer`
        scorePrint.innerText = `You: ${score.user}, Computer: ${score.computer}, Draw: ${score.draw}`;
    }  
});

resetScore.addEventListener("click", function(){
    score.user = 0;
    score.computer = 0;
    score.draw = 0;
    localStorage.removeItem('score');
    scorePrint.innerText = `You: ${score.user}, Computer: ${score.computer}, Draw: ${score.draw}`;
    resultPrint.innerText = ``;
    resultShow.innerHTML = ``
});

