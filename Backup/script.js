const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(a, operator, b) {
	if (operator === "+") {
		return add(a, b);
	}
	else if (operator === "-") {
		return subtract(a, b);
	}
	else if (operator === "x") {
		return multiply(a, b);
	}
	else if (operator === "÷") {
		return divide(a, b);
	}
	else {
		return "ERROR in operate()";
	}
}

function evaluate(string) {
	let toArray = [];
	let numStringOne = "";
	let numStringTwo = "";
	for (i = 0; i < string.length; i++) { //create array from string
		toArray.push(string[i]);
	}
	console.log(toArray);
	let operatorCount = countOperators(toArray)
	if (operatorCount === 2) { //If a second operator is entered it will evaulate
		let operatorIndex = toArray.findIndex(operator => {
			if (operator === "x" || operator === "+" || operator === "-" ||
				operator === "÷") {
				return true;
			}
		});
		for (j = 0; j < operatorIndex; j++) {
			numStringOne += toArray[j];
		}
		for (k = operatorIndex + 1; k < toArray.length; k++) {
			numStringTwo += toArray[k];
		}
		let operator = toArray[operatorIndex];
		numStringOne = parseInt(numStringOne);
		numStringTwo = parseInt(numStringTwo);
		return operate(numStringOne, operator, numStringTwo)
	}
}

function countOperators(array) {
	let operatorCount = 0;
	for (i = 0; i < array.length; i++) {
		let item = array[i];
		if (item === "x" || item === "+" || item === "-" ||
		item === "÷" || item === "=") {
			operatorCount += 1;
		}
	}
	return operatorCount
}

function displayInput() { //and output
	const buttons = document.querySelectorAll(".calc-button-container");
	const display = document.querySelector(".display > p");
	const ac = document.querySelector("#ac");
	let stringOfInputs = "";
	buttons.forEach(button => {
		button.addEventListener("click", e => {
			input = e.target.textContent;
			stringOfInputs += input;
			let lastInput = stringOfInputs[stringOfInputs.length - 1];
			if (lastInput === "=") { //Removes equal sign
				lastInput = "";
			}
			let result = evaluate(stringOfInputs);
			if (typeof(result) === "number") {
				display.textContent = result + lastInput;
				stringOfInputs = result.toString() + lastInput;
			}
			else {
				display.textContent = stringOfInputs;
				}
		});
	});
	ac.addEventListener("click", () => {
		display.textContent = "0";
		stringOfInputs = "";
	});
}

displayInput();