// Selectors //
const hisDisplay = document.querySelector('.history-display');
const resDisplay = document.querySelector('.result-display');
const tempResult = document.querySelector('.temp-display'); 
const numbers = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const clearAll = document.querySelector('.clear-all');
const clearLastEntry = document.querySelector('.backspace');

// Variable Placeholders //
let subDisplay = '';
let outputDisplay = '';
let result = null;
let lastOperation = '';
let haveDot = false;

// Arrow Functions //  
const mathOperation = () => {
  subDisplay = parseFloat(subDisplay); //turns a string into a number
  outputDisplay = parseFloat(outputDisplay);
  if (typeof lastOperation === 'string') {
    switch (lastOperation) {
      case '+':
        result = subDisplay + outputDisplay;
        break;
      case '-':
        result = subDisplay - outputDisplay;
        break;
      case '*':
        result = subDisplay * outputDisplay;
        break;
      case '/':
      if (outputDisplay === 0) {
        subDisplay = 'You can\'t divide by zero!';
        outputDisplay = '';
        result = 'Nice try!';
      } else {
        result = subDisplay / outputDisplay;
      }
    }
  }            
}

const clearVar = (operation = '') => {
    subDisplay += outputDisplay+ ' ' + operation + ' ';
    hisDisplay.innerText = subDisplay;
    resDisplay.innerText = '';
    outputDisplay = '';
    tempResult.innerText = result;
}

const clickNumbers = (key) => {
    numbers.forEach(button => {
      if (button.innerText === key) {
        button.click();
      }
    })
}

const clickOperator = (key) =>{
    operator.forEach( operation => {
      if(operation.innerText === key){
        operation.click()
      }
    })
}

const clickEqual = () =>{
    equal.click();
}

const clickLastEntry = () => {
    clearLastEntry.click();
}

// Event listeners //
numbers.forEach( number => {
  number.addEventListener('click', (e)=>{
    if(e.target.innerText === '.' && !haveDot){
      haveDot = true; //if dot has not been previously clicked then allow it to be clicked
    } else if (e.target.innerText === '.' && haveDot){
      return; //if dot has been previously clicked then do not allow it to be clicked
    }
    outputDisplay += e.target.innerText;
    resDisplay.innerText = outputDisplay;
  })
});

operator.forEach( operation => {
  operation.addEventListener('click', (e)=> {
    if (!outputDisplay) return; //if no number button clicked then do not allow operator to be clicked
    haveDot = false; //allows dot to be clicked again for new number being entered
    const operationName = e.target.innerText;
    if (subDisplay && outputDisplay && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(outputDisplay); 
    }
    clearVar(operationName);
    lastOperation = operationName;
  })
});

equal.addEventListener('click', (e)=> {
  if (!subDisplay || !outputDisplay) return; //checks if there are 2 numbers for the operation to be made
  haveDot = false;
  mathOperation();
  clearVar();
  resDisplay.innerText = result;
  tempResult.innerText = '';
  outputDisplay = result;
  subDisplay = '';
});

clearAll.addEventListener('click', (e)=>{
  hisDisplay.innerText ='0';
  resDisplay.innerText ='0';
  tempResult.innerText = '';
  subDisplay = '';
  outputDisplay = '';
  result = '';
});

clearLastEntry.addEventListener('click', (e) => {
  resDisplay.innerText = '';
  outputDisplay= '';
});

window.addEventListener('keydown', (e)=>{
  if(
    e.key === '0' ||
    e.key === '1' || 
    e.key === '2' ||
    e.key === '3' ||
    e.key === '4' ||
    e.key === '5' ||
    e.key === '6' ||
    e.key === '7' ||
    e.key === '8' ||
    e.key === '9' ||
    e.key === '.' 
  ){
    clickNumbers(e.key)
  } else if (
    e.key === '+' ||
    e.key === '-' ||
    e.key === '*' ||
    e.key === '/'   
  ){
    clickOperator(e.key) 
  } else if (
    e.key === 'Enter' ||
    e.key === '=' 
  ){
    clickEqual()
  } else if (
    e.key === 'Backspace' ||
    e.key === 'Delete'
  ){
    clickLastEntry()
  }
});  