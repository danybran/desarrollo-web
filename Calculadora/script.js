let displayElement;
let currentNumber = '';
let previousNumber = '';
let operation = null;
let operationString = '';

function setup() {
    noCanvas();
    displayElement = select('#display');
    updateDisplay();
}

function appendNumber(number) {
    if (currentNumber.length < 10) {
        currentNumber += number;
        operationString += number;
        updateDisplay();
    }
}

function appendDecimal() {
    if (!currentNumber.includes('.')) {
        currentNumber += '.';
        operationString += '.';
        updateDisplay();
    }
}

function setOperation(op) {
    if (currentNumber === '') return;
    if (previousNumber !== '') {
        calculate();
    }
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';
    operationString += ` ${op} `;
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousNumber);
    const curr = parseFloat(currentNumber);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }
    currentNumber = result.toString();
    operation = null;
    previousNumber = '';
    operationString = currentNumber;
    updateDisplay();
}

function clearDisplay() {
    currentNumber = '';
    previousNumber = '';
    operation = null;
    operationString = '';
    updateDisplay();
}

function updateDisplay() {
    displayElement.html(operationString || '0');
}
