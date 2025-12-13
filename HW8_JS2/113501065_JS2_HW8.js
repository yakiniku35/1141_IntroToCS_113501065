document.getElementById("calculateButton")
document.getElementById("operationSelect")
document.getElementById("calculateButton").onclick = function () {

    let op = document.getElementById("operationSelect").value;

    switch (op) {
        case "add":
            alert("plus");
            break;
        case "subtract":
            alert("minus");
            break;
        case "multiply":
            alert("multiply");
            break;
        case "divide":
            alert("divide");
            break;
    }
};

