// #### CLIENT SIDE ####
function onStart() {
    console.log('client.js is sourced!');
}; onStart(); getCalculations();


// ## USER INPUT FUNCTIONALITY ##
let operator;
function setOperator(event) {
    event.preventDefault();
        // stores button into global operator
    let operatorFinder = event.target.innerText
    operator = operatorFinder
    console.log('Operator recieved. Operator:', operator)
}
function clearForms(event) {
        // immediate actions
    event.preventDefault();
    console.log(' - In clear function - ');
        // clear forms
    document.getElementById('numOne').value = '';
    document.getElementById('numTwo').value = '';
}
function bundleForm(event){
        // immediate actions
    event.preventDefault();
        // bundle calculation info
    let numOne = Number(document.getElementById('numOne').value);
    let numTwo = Number(document.getElementById('numTwo').value);
    let formData = {
        numOne: numOne,
        numTwo: numTwo,
        operator: operator
    }
        // send bundle to server
    if (numOne, numTwo) {
        axios({
            method: 'POST',
            url: '/calculations',
            data: formData
            })
                // get calculation information
            .then((response) => {
                console.log('Confirmed server recieved form submission.')
                console.log('Grabbing calculations...')
                getCalculations();
            })
            .catch(function(error) {
                console.log(error);
                alert('Something bad happened! Check the console for more details.');
            });
    } else {
        console.error('ERROR: NEED BOTH INPUTS')
    }
}
function clearHistory(event) {
    axios({
        method: 'POST',
        url: '/clearHistory',
        data: null
        })
            // get calculation information
        .then((response) => {
            console.log('Confirmed server recieved request.')
            console.log('Grabbing calculations...')
            getCalculations();
        })
        .catch(function(error) {
            console.log(error);
            alert('Something bad happened! Check the console for more details.');
        });
}


// ## RETRIEVE DATA AND RENDER ##
function getCalculations() {
    axios({
        method: 'GET',
        url: '/calculations'
      })
      .then(function(response) {
          console.log('GET response recieved from server!');
        let calculationHistory = response.data;
          console.log(' - Parsing data from response package...')
          console.log(' - Calculations:', calculationHistory);
        renderDisplay(calculationHistory);
        }).catch(function(error) {
            console.log(error);
            alert('Something bad happened! Check the console for more details.');
        })
}
function renderDisplay(calculationHisory) {
    if (calculationHisory[calculationHisory.length-1]) {
        let answerDisplay = document.getElementById('answer');
        answerDisplay.innerHTML = '';
        answerDisplay.innerHTML += calculationHisory[calculationHisory.length-1].result;
        let historyDisplay = document.getElementById('calculationHistory');
        historyDisplay.innerHTML = '';
        for (let calculation of calculationHisory)
            historyDisplay.innerHTML +=
            `
            <li onclick="recallCalculation(event)">${calculation.numOne} ${calculation.operator} ${calculation.numTwo} = ${calculation.result}</li>
            `
    } else {
        let answerDisplay = document.getElementById('answer');
        answerDisplay.innerHTML = '';
        let historyDisplay = document.getElementById('calculationHistory');
        historyDisplay.innerHTML = '';
    }
}
