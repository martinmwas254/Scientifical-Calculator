class Calculator {
    private currentOperand: string = '';
    private previousOperand: string = '';
    private operation: string | undefined;
    private isNewCalculation: boolean = true; // To clear display after an operation

    constructor() {}

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.isNewCalculation = true;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number: string) {
        if (this.isNewCalculation) {
            this.currentOperand = number;
            this.isNewCalculation = false;
        } else {
            if (number === '.' && this.currentOperand.includes('.')) return;
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation: string) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.isNewCalculation = false; // Reset to false after choosing operation
    }

    compute() {
        let computation: number;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.isNewCalculation = true; // Ready for a new calculation or chained operation
    }

    // --- Scientific Functions ---

    // Trigonometric functions (expecting degrees, converting to radians for Math object)
    sin() {
        const num = parseFloat(this.currentOperand);
        if (isNaN(num)) return;
        this.currentOperand = Math.sin(num * Math.PI / 180).toString();
        this.isNewCalculation = true;
    }

    cos() {
        const num = parseFloat(this.currentOperand);
        if (isNaN(num)) return;
        this.currentOperand = Math.cos(num * Math.PI / 180).toString();
        this.isNewCalculation = true;
    }

    tan() {
        const num = parseFloat(this.currentOperand);
        if (isNaN(num)) return;
        this.currentOperand = Math.tan(num * Math.PI / 180).toString();
        this.isNewCalculation = true;
    }

    // Logarithmic functions
    log() { // Base e (natural logarithm)
        const num = parseFloat(this.currentOperand);
        if (isNaN(num) || num <= 0) return;
        this.currentOperand = Math.log(num).toString();
        this.isNewCalculation = true;
    }

    log10() { // Base 10 logarithm
        const num = parseFloat(this.currentOperand);
        if (isNaN(num) || num <= 0) return;
        this.currentOperand = Math.log10(num).toString();
        this.isNewCalculation = true;
    }

    // Power and Root functions
    pow(exponent: number) {
        const base = parseFloat(this.currentOperand);
        if (isNaN(base)) return;
        this.currentOperand = Math.pow(base, exponent).toString();
        this.isNewCalculation = true;
    }

    sqrt() {
        const num = parseFloat(this.currentOperand);
        if (isNaN(num) || num < 0) return;
        this.currentOperand = Math.sqrt(num).toString();
        this.isNewCalculation = true;
    }

    // Factorial (integer input only)
    factorial() {
        const num = parseInt(this.currentOperand);
        if (isNaN(num) || num < 0 || !Number.isInteger(num)) return;
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        this.currentOperand = result.toString();
        this.isNewCalculation = true;
    }

    // Constant Pi
    pi() {
        this.currentOperand = Math.PI.toString();
        this.isNewCalculation = true;
    }

    // Constant E (Euler's number)
    e() {
        this.currentOperand = Math.E.toString();
        this.isNewCalculation = true;
    }

    // Toggle sign
    toggleSign() {
        const num = parseFloat(this.currentOperand);
        if (isNaN(num)) return;
        this.currentOperand = (-num).toString();
    }

    getDisplayCurrentOperand() {
        return this.currentOperand === '' ? '0' : this.currentOperand;
    }

    getDisplayPreviousOperand() {
        if (this.previousOperand === '') {
            return '';
        }
        if (this.operation != null) {
            return '${this.previousOperand} ${this.operation}';
        }
        return this.previousOperand;
    }
}