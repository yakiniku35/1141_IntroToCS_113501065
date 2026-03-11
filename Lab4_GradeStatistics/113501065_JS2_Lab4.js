// Set up event listeners and variables
let submitBtn = document.getElementById("submitBtn");
let mathInput = document.getElementById("mathInput");
let engInput = document.getElementById("engInput");
let tableBody = document.getElementById("tableBody");

let rowCount = 0;

// If press Enter -> submit
mathInput.addEventListener("keypress", pressEnter);
engInput.addEventListener("keypress", pressEnter);

// Function to handle Enter key press
function pressEnter(event) {
    if (event.key === "Enter") {
        addRow();
    }
}

// Click submit button
submitBtn.addEventListener("click", addRow);

// Function to add a new row to the table
function addRow() {
    let mathVal = Number(mathInput.value);
    let engVal = Number(engInput.value);

    if (mathInput.value === "" || engInput.value === "" || isNaN(mathVal) || isNaN(engVal)) {
        alert("Please enter valid numbers.");
        return;
    }

    rowCount++;

    let avg = ((mathVal + engVal) / 2).toFixed(2);

    let row = `
        <tr>
            <td>${rowCount}</td>
            <td>${mathVal}</td>
            <td>${engVal}</td>
            <td>${avg}</td>
        </tr>
    `;

    tableBody.innerHTML += row;

    updateColumnAverages();

    mathInput.value = "";
    engInput.value = "";
}


// Function to update column averages
function updateColumnAverages() {
    let rows = tableBody.querySelectorAll("tr");

    let mathSum = 0;
    let engSum = 0;
    let overallSum = 0;

    rows.forEach(row => {
        let cells = row.querySelectorAll("td");
        mathSum += Number(cells[1].textContent);
        engSum += Number(cells[2].textContent);
        overallSum += Number(cells[3].textContent);
    });

    let count = rows.length;

    document.getElementById("mathAvg").textContent = (mathSum / count).toFixed(2);
    document.getElementById("engAvg").textContent = (engSum / count).toFixed(2);
    document.getElementById("overallAvg").textContent = (overallSum / count).toFixed(2);
}
