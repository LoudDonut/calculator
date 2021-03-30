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
	let numA = parseInt(a);
	let numB = parseInt(b);

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
			console.log(result[i]);
			return true;
		}
	}
	return false;
}

function display(toDisplay) {
	const display = document.querySelector(".display > p");
	display.textContent = toDisplay;
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
	const display = document.querySelector(".display > p");
	const numpad = document.querySelectorAll(".keypad");
	numpad.forEach(button => {
		button.addEventListener("click", (e) => {
			let input = e.target.textContent;
			if (calcValues.result != null && !calcValues.operate) {
				clearValues();
				calcValues.numbers += input;
				display.textContent = calcValues.numbers;
			}
			else if (!calcValues.operate) {
				calcValues.numbers += input;
				display.textContent = calcValues.numbers;
			}
			else {
				calcValues.numbersTwo += input;
				display.textContent = calcValues.numbersTwo;
			}
		});
	});
	const decPoint = document.querySelector("#decPoint");
	decPoint.addEventListener("click", (e) => {
		let input = e.target.textContent;
		console.log(input);
	});
	const operators = document.querySelectorAll(".operators");
	operators.forEach(button => {
		button.addEventListener("click", (e) => {
			let input = e.target.textContent;
			if (!calcValues.operate) { //initial operator input
				calcValues.operate = true;
				if (input === "÷") {
					falsifyOperators(input);
				}
				else if (input === "x") {
					falsifyOperators(input);
				}
				else if (input === "-") {
					falsifyOperators(input);
				}
				else if (input === "+") {
					falsifyOperators(input);
				}
			}
			else if (input === "=") {
				updateResults(calcValues.numbers, calcValues.numbersTwo);
				decimalCheck(calcValues.result)
				display.textContent = calcValues.result;
				falsifyOperators();
			}
			else if (calcValues.operate) { //when operating after using another operator
				if (input === "÷") {
					updateResults(calcValues.numbers, calcValues.numbersTwo);
					decimalCheck(calcValues.result)
					display.textContent = calcValues.result;
					falsifyOperators(input);
				}
				else if (input === "x") {
					updateResults(calcValues.numbers, calcValues.numbersTwo);
					decimalCheck(calcValues.result)
					display.textContent = calcValues.result;
					falsifyOperators(input);
				}
				else if (input === "-") {
					updateResults(calcValues.numbers, calcValues.numbersTwo);
					decimalCheck(calcValues.result)
					display.textContent = calcValues.result;
					falsifyOperators(input);
				}
				else if (input === "+") {
					updateResults(calcValues.numbers, calcValues.numbersTwo);
					decimalCheck(calcValues.result)
					display.textContent = calcValues.result;
					falsifyOperators(input);
				}
			}
		});
	});
	const clear = document.querySelector("#ac");
	clear.addEventListener("click", () => {
		clearValues();
		display.textContent = "0";
	});
}

main();

//obtain input (check)
//store the first set of numbers (check)
//display set with each new input (check)
//choose operator and store operator (check)
//store second set of numbers (check)
//display second set with each new input (check)
//when = is pressed call operate and store the returned results (check)
//display results (check)
//store result as first set of numbers (check)
//if operator selected then continue with a second set (check)
//else reset and and start from the beginning (check)

//decimal count = after . start counting with a for loop
//input = decimal count
//if results has more then 8 decimals round the numbers