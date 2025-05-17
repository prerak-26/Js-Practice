let currentvalue = '0.0';
document.querySelector('.display').value = currentvalue;


let selected = document.querySelectorAll('.button');

selected.forEach(current => {
    current.onclick = function () {
        let selected_value = current.textContent;
        if(currentvalue == '0.0'){
            currentvalue = '';
        }
        currentvalue = currentvalue + selected_value;
        document.querySelector('.display').value = currentvalue;
    }
});

let clear = document.querySelector('.clear');

clear.onclick = function (){
    currentvalue = '0.0'
    document.querySelector('.display').value = currentvalue;
}

let calculate = document.querySelector('.equal');

calculate.onclick = function (){
    document.querySelector('.display').value = eval(currentvalue)
}