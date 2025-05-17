let button = document.querySelectorAll(".button");
let resultPrint = document.querySelector("#result");
console.log(result);

button.forEach(element => {
    element.onclick = function() {
        const userValue = element.textContent;
        const randomValue = valuGenerator();
        const computerValue = selectComputerValue(randomValue);
        let result = resultGenerator(userValue, computerValue);
        resultPrint.innerText = `You: ${userValue}, computer: ${computerValue}. Result: ${result}`;
    }  
});

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
    } else if (
        (userValue === 'Rock' && computerValue === 'Scissors') ||
        (userValue === 'Paper' && computerValue === 'Rock') ||
        (userValue === 'Scissors' && computerValue === 'Paper')
    ) {
        result = 'You win';
    } else {
        result = 'Computer wins';
    }
    return result;
}