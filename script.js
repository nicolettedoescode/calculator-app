let display = document.getElementById('display');
let currentOperand = '';
let previousOperand = '';
let operation = null;
let shouldResetDisplay = false;

function appendNumber(number) {
    if (currentOperand.includes('.') && number === '.') return;
    if (shouldResetDisplay) {
        currentOperand = number.toString();
        shouldResetDisplay = false;
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function updateDisplay() {
    display.innerText = currentOperand;
}

function chooseOperation(op) {
    if (currentOperand === '' && op === '-') {
        currentOperand = '-';
        updateDisplay();
        return;
    }
    if (currentOperand === '') return;

    // Handle single operand operations (√ and %)
    if (op === '√' || op === '%') {
        operation = op;
        calculate();
        return;
    }

    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    shouldResetDisplay = true;
}

function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) && (operation !== '√' && operation !== '%')) return;
    if (isNaN(current) && (operation !== '√' && operation !== '%')) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        case '√':
            result = Math.sqrt(current);
            break;
        case '^':
            result = Math.pow(prev, current);
            break;
        case '%':
            result = current / 100;
            break;
        default:
            return;
    }

    currentOperand = result;
    operation = null;
    previousOperand = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}
