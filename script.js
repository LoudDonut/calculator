const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(a, b) {
	if (calcValues.add) {
		return add(a, b);
	}
	else if (calcValues.subtract) {
		return subtract(a, b);
	}
	else if (calcValues.multiply) {
		return multiply(a, b);
	}
	else if (calcValues.divide) {
		return divide(a, b);
	}
	else {
		return "ERROR in operate()";
	}
}

function convertOperate(a, b) {
	let numA = parseFloat(a);
	let numB = parseFloat(b);

	return operate(numA, numB);
}

function falsifyOperators(operator) {
	calcValues.operate = false;
	calcValues.divide = false;
	calcValues.multiply = false;
	calcValues.subtract = false;
	calcValues.add = false;
	if (operator === "÷") {
		calcValues.operate = true;
		calcValues.divide = true;
	}
	else if (operator === "x") {
		calcValues.operate = true;
		calcValues.multiply = true;
	}
	else if (operator === "-") {
		calcValues.operate = true;
		calcValues.subtract = true;
	}
	else if (operator === "+") {
		calcValues.operate = true;
		calcValues.add = true;
	}
}

function updateResults(numbers, numbersTwo) {
	calcValues.result = convertOperate(numbers, numbersTwo);
	calcValues.numbers = calcValues.result.toString();
	calcValues.numbersTwo = "";
}

function clearValues() {
	calcValues = {
		numbers: "",
		numbersTwo: "",
		operator: "",
		operate: false,
		divide: false,
		multiply: false,
		subtract: false,
		add: false,
		result: null,
	};
}

function decimalCheck(result) {
	result = result.toString();
	for (i = 0; i < result.length; i++) {
		if (result[i] === ".") {
			return true;
		}
	}
	return false;
}

function display(toDisplay) {
	const display = document.querySelector(".display > p");
	if (toDisplay === Infinity) {
		toDisplay = "https://en.wikipedia.org/wiki/Division_by_zero"
		//Idea to deconstruct the calculator?
	}
	display.textContent = toDisplay;
}

function callFunctionsEquals() {
	updateResults(calcValues.numbers, calcValues.numbersTwo);
	decimalCheck(calcValues.result)
	if (decimalCheck) {
		calcValues.result = Math.round(calcValues.result * 1000000) / 1000000
	}
	display(calcValues.result);
	falsifyOperators();
}

function callFunctionsOp(input) {
	updateResults(calcValues.numbers, calcValues.numbersTwo);
	decimalCheck(calcValues.result)
	if (decimalCheck) {
		calcValues.result = Math.round(calcValues.result * 1000000) / 1000000
	}
	display(calcValues.result);
	falsifyOperators(input);
}

let calcValues = {
	numbers: "",
	numbersTwo: "",
	operator: "",
	operate: false,
	divide: false,
	multiply: false,
	subtract: false,
	add: false,
	result: null,
};

function main() {
	const numpad = document.querySelectorAll(".keypad");
	numpad.forEach(button => {
		button.addEventListener("click", (e) => {
			let input = e.target.textContent;
			if (calcValues.result != null && !calcValues.operate) {
				clearValues();
				calcValues.numbers += input;
				display(calcValues.numbers);
			}
			else if (!calcValues.operate) {
				calcValues.numbers += input;
				display(calcValues.numbers);
			}
			else {
				calcValues.numbersTwo += input;
				display(calcValues.numbersTwo);
			}
		});
	});
	const decPoint = document.querySelector("#decPoint");
	decPoint.addEventListener("click", (e) => {
		let input = e.target.textContent;
		let decimalExist;
		if (calcValues.result != null && !calcValues.operate) {
			clearValues();
			calcValues.numbers += "0.";
			display(calcValues.numbers);
		}
		else if (!calcValues.operate) {
			decimalExist = decimalCheck(calcValues.numbers);
			if (!decimalExist && !(calcValues.numbers === "")) {
				calcValues.numbers += input;
				display(calcValues.numbers);
			} 
			else if (calcValues.numbers === "") {
				calcValues.numbers += "0.";
				display(calcValues.numbers);
			}
		}
		else {
			decimalExist = decimalCheck(calcValues.numbersTwo);
			if (!decimalExist && !(calcValues.numbersTwo === "")) {
				calcValues.numbersTwo += input;
				display(calcValues.numbersTwo);
			} 
			else if (calcValues.numbersTwo === "") {
				calcValues.numbersTwo += "0.";
				display(calcValues.numbersTwo);
			}
		}
	});
	const operators = document.querySelectorAll(".operators");
	operators.forEach(button => {
		button.addEventListener("click", (e) => {
			let input = e.target.textContent;
			if (calcValues.numbers.length > 0 &&
				calcValues.numbersTwo.length === 0) { //initial operator input
				falsifyOperators(input);
			}
			else if (input === "=" && calcValues.numbers.length > 0 &&
				calcValues.numbersTwo.length > 0) {
				callFunctionsEquals();
			}
			else if (calcValues.numbers.length > 0 &&
					calcValues.numbersTwo.length > 0) { //when operating after using another operator
				if (input === "÷") {
					callFunctionsOp(input);
				}
				else if (input === "x") {
					callFunctionsOp(input);
				}
				else if (input === "-") {
					callFunctionsOp(input);
				}
				else if (input === "+") {
					callFunctionsOp(input);
				}
			}
		});
	});
	const clear = document.querySelector(".ac");
	clear.addEventListener("click", () => {
		clearValues();
		display("0");;
	});
	const backspace = document.querySelector(".backspace");
	backspace.addEventListener("click", () => {
		let numbersLength = calcValues.numbers.length - 1;
		let numbersTwoLength = calcValues.numbersTwo.length -1;
		if (calcValues.result != null && !calcValues.operate) {
			clearValues();
			display("0");
		}
		else if (!calcValues.operate && numbersLength < 1) {
			calcValues.numbers = calcValues.numbers.slice(0, numbersLength);
			display("0");
		}
		else if (!calcValues.operate) {
			calcValues.numbers = calcValues.numbers.slice(0, numbersLength);
			display(calcValues.numbers);
		}
		else if (calcValues.operate && numbersTwoLength < 1) {
			calcValues.numbers = calcValues.numbers.slice(0, numbersLength);
			display("0");
		}
		else {
			calcValues.numbersTwo = calcValues.numbersTwo.slice(0, numbersTwoLength);
			display(calcValues.numbersTwo);
		}
	});
}

main();

//Add keyboard supports