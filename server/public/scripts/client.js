function onStart() {
    console.log('client.js is sourced!');
}; onStart()

function runCalculation(event) {
        // immediate actions
    event.preventDefault();
    console.log(' - In runCalculation function - ');
        // gather input data
    let firstNumber = document.getElementById('firstNumber').value;
    let secondNumber = document.getElementById('secondNumber').value;
        // runs calculation
    
}

function clearForms(event) {
        // immediate actions
    event.preventDefault();
    console.log(' - In clear function - ');
        // clear forms
    document.getElementById('firstNumber').value = '';
    document.getElementById('secondNumber').value = '';
}

function renderPage() {
    console.log('not rendered yay!')
}

function setOperator(event) {
    event.preventDefault();
        // stores button into global operator
    let operatorFinder = event.target.innerText
    operator = operatorFinder
    console.log('Operator recieved. Operator:', operator)
}

let operator;
