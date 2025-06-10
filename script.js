// Get references to HTML elements
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const scientificButtons = document.querySelectorAll('[data-scientific]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Create an instance of the Calculator
const calculator = new Calculator();

// Function to update the display
function updateDisplay() {
    currentOperandTextElement.innerText = calculator.getDisplayCurrentOperand();
    previousOperandTextElement.innerText = calculator.getDisplayPreviousOperand();
}

// Event listeners for number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        updateDisplay();
    });
});

// Event listeners for operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        updateDisplay();
    });
});

// Event listener for equals button
equalsButton.addEventListener('click', button => {
    calculator.compute();
    updateDisplay();
});

// Event listener for all clear button
allClearButton.addEventListener('click', button => {
    calculator.clear();
    updateDisplay();
});

// Event listener for delete button
deleteButton.addEventListener('click', button => {
    calculator.delete();
    updateDisplay();
});

// Event listeners for scientific buttons
scientificButtons.forEach(button => {
    button.addEventListener('click', () => {
        const scientificFunction = button.dataset.scientific;
        switch (scientificFunction) {
            case 'sin':
                calculator.sin();
                break;
            case 'cos':
                calculator.cos();
                break;
            case 'tan':
                calculator.tan();
                break;
            case 'log':
                calculator.log();
                break;
            case 'log10':
                calculator.log10();
                break;
            case 'sqrt':
                calculator.sqrt();
                break;
            case 'pow2':
                calculator.pow(2);
                break;
            case 'pow3':
                calculator.pow(3);
                break;
            case 'factorial':
                calculator.factorial();
                break;
            case 'pi':
                calculator.pi();
                break;
            case 'e':
                calculator.e(); // Add a button for 'e' in HTML if needed
                break;
            case 'toggleSign':
                calculator.toggleSign();
                break;
            default:
                break;
        }
        updateDisplay();
    });
});

// Initialize display
updateDisplay();