// --- PART 1: Helper Functions for Math ---
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Cannot divide by zero";
    }
    return a / b;
}

// --- PART 2: UI Logic (Button Text Change) ---
const operationSelect = document.getElementById("operationSelect");
const calculateButton = document.getElementById("calculateButton");

// Function to update the button text based on selection
function updateButtonLabel() {
    const op = operationSelect.value;
    
    // Switch statement to change button text to match the PDF screenshot (Add, Subtract, etc.)
    switch (op) {
        case "add":
            calculateButton.innerText = "Add";
            break;
        case "subtract":
            calculateButton.innerText = "Subtract";
            break;
        case "multiply":
            calculateButton.innerText = "Multiply";
            break;
        case "divide":
            calculateButton.innerText = "Divide";
            break;
        default:
            calculateButton.innerText = "Calculate";
    }
}

// Listen for changes on the dropdown menu
operationSelect.onchange = updateButtonLabel;

// Run it once immediately to set the correct text when page loads
updateButtonLabel();


// --- PART 3: Calculation Logic ---
function calculate() {
    // 1. Get values and convert strings to numbers
    let num1 = parseFloat(document.getElementById("math1Input").value);
    let num2 = parseFloat(document.getElementById("math2Input").value);
    let op = operationSelect.value;
    let result = 0;

    // 2. Validation
    if (isNaN(num1) || isNaN(num2)) {
        // Use resultDisplay if you added it to HTML, otherwise alert
        let display = document.getElementById("resultDisplay");
        if(display) display.innerText = "Please enter valid numbers";
        else alert("Please enter valid numbers");
        return;
    }

    // 3. Perform Operation
    switch (op) {
        case "add":
            result = add(num1, num2);
            break;
        case "subtract":
            result = subtract(num1, num2);
            break;
        case "multiply":
            result = multiply(num1, num2);
            break;
        case "divide":
            result = divide(num1, num2);
            break;
    }

    // 4. Display Result
    // Check if result is a number (to handle the "Error" string from divide)
    let finalOutput = "";
    if (typeof result === "number") {
        finalOutput = "Result = " + result.toFixed(2); // Round to 2 decimals
    } else {
        finalOutput = result; // Show error message
    }

    let resultElement = document.getElementById("resultDisplay");
    if (resultElement) {
        resultElement.innerText = finalOutput;
    } else {
        alert(finalOutput); // Fallback if HTML isn't updated
    }
}

// Attach the calculate function to button click event
calculateButton.onclick = calculate;