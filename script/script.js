const allBtn = document.querySelectorAll('button[data-value]');
const operBtn = document.querySelectorAll('#actionOperator');
const equalsBtn = document.querySelector('#actionEquals');
const display = document.querySelector('#displayScreen');

let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetScreen = false;

if (display && display.textContent === '') display.textContent = '0';

// number
allBtn.forEach(button => {
    button.addEventListener('click', () => {
        if (shouldResetScreen) {
            display.textContent = '';
            shouldResetScreen = false;
        }

        const value = button.dataset.value;
        if (value === '.' && display.textContent.includes('.')) return;

        if (display.textContent === '0' && value !== '.') display.textContent = value;
        else display.textContent += value;
    });
});

// operator
operBtn.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('actionClear')) {
            display.textContent = '0';
            firstOperand = '';
            secondOperand = '';
            currentOperator = null;
            shouldResetScreen = false;
            return;
        }

        const map = { divide: '/', times: '*', minus: '-', plus: '+' };
        const val = button.value || button.dataset.value;
        const op = map[val] || val;

        if (currentOperator !== null && !shouldResetScreen) calculate();
        firstOperand = display.textContent || '0';
        currentOperator = op;
        shouldResetScreen = true;
    });
});

// Equals button
if (equalsBtn) equalsBtn.addEventListener('click', calculate);

function calculate() {
    if (currentOperator === null || shouldResetScreen) return;

    secondOperand = display.textContent || '0';
    const a = parseFloat(firstOperand);
    const b = parseFloat(secondOperand);

    if (isNaN(a) || isNaN(b)) {
        display.textContent = 'Error';
        currentOperator = null;
        shouldResetScreen = true;
        return;
    }

    let result;
    switch (currentOperator) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = b === 0 ? 'Error' : a / b; break;
        default: result = 'Error';
    }

    display.textContent = result;
    firstOperand = (typeof result === 'number') ? String(result) : result;
    currentOperator = null;
    shouldResetScreen = true;
}