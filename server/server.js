// #### SERVER SIDE ####
function onStart() {
  console.log('server.js is sourced!')
}; onStart();


// ## SERVER ##
const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.static('server/public'));


// ## CALCULATIONS ##
let calculations = []
function runCalculation() {
    // runs calculation
  let numOne = calculations[calculations.length-1].numOne;
  let numTwo = calculations[calculations.length-1].numTwo;
  let operator = calculations[calculations.length-1].operator;
  let result;
  switch (operator) {
    case '+':
        result = Number(numOne) + Number(numTwo);
        break;
    case '-':
        result = Number(numOne) - (numTwo);
        break;
    case '*':
        result = Number(numOne) * Number(numTwo);
        break;
    case '/':
        result = Number(numOne) / Number(numTwo);
        break;
    default:
        console.error('ERROR: NO OPERATOR FOUND');
        break;
  }
    // store answer in calculations array
  calculations[calculations.length-1].result = result;
}


// ## ROUTES ##
app.get('/calculations', (req, res) => {
    console.log(' - GET request received by client.');
    console.log(' - Sending calculation history to client...');
    console.log(' - Calculation history:', calculations);
  res.send(calculations);
});
// app.get('/latestCalculation', (req, res) => {
//     console.log(' - GET request received by client.');
//     console.log(' - Sending latest calculation to client...');
//   res.send(calculations[calculations.length-1]);
// });
app.post('/calculations', (req, res) => {
    console.log('POST request received!');
  let newCalculation = req.body;
    console.log(' - Calculation data parsed from request...');
    console.log(' - Calculation data:', newCalculation); 
  calculations.push(newCalculation);
    console.log(' - Running calculation...');
  runCalculation();
    console.log(' - Updating calculation history...');
    console.log(' - Calculation history:', calculations);
    console.log(' - Done!');
  res.sendStatus(201);
})
app.post('/clearHistory', (req, res) => {
  console.log('POST request received!');
  console.log(' - Clearing history...');
  calculations = [];
  console.log(' - Done!');
res.sendStatus(201);
})


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
