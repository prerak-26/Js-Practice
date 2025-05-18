let button = document.querySelectorAll(".button");
let resultPrint = document.querySelector("#result");
let resetScore = document.querySelector("#score");

const score = {
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
            computerValue = 'Rock';
            break;
        case 2:
            computerValue = 'Paper';
            break;
        case 3:
            computerValue = 'Scissors';
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
        (userValue === 'Rock' && computerValue === 'Scissors') ||
        (userValue === 'Paper' && computerValue === 'Rock') ||
        (userValue === 'Scissors' && computerValue === 'Paper')
    ) {
        result = 'You win';
        score.user++;
    } else {
        result = 'Computer wins';
        score.computer++;
    }
    return result;
}

button.forEach(element => {
    element.onclick = function() {
        const userValue = element.textContent;
        const randomValue = valuGenerator();
        const computerValue = selectComputerValue(randomValue);
        let result = resultGenerator(userValue, computerValue);
        resultPrint.innerText = `You: ${userValue}, computer: ${computerValue}. Result: ${result}
        User: ${score.user}, Computer: ${score.computer}, Draw: ${score.draw}`;
    }  
});

resetScore.addEventListener("click", function(){
    score.user = 0;
    score.computer = 0;
    score.draw = 0;
    resultPrint.innerText = `User: ${score.user}, Computer: ${score.computer}, Draw: ${score.draw}`;
});
