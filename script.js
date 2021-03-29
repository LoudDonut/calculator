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
	console.log(a);
	console.log(b);
	let numA = parseInt(a);
	let numB = parseInt(b);

	return operate(numA, numB);
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
			if (!calcValues.operate) {
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
			if (!calcValues.operate) {
				calcValues.operate = true;
				if (input === "÷") {
					calcValues.divide = true;
				}
				else if (input === "x") {
					calcValues.multiply = true;
				}
				else if (input === "-") {
					calcValues.subtract = true;
				}
				else if (input === "+") {
					calcValues.add = true;
				}
			}
			else {
				if (input === "=") {
					calcValues.result = convertOperate(calcValues.numbers, calcValues.numbersTwo);
					display.textContent = calcValues.result;
				}
			}
		});
	});
	const clear = document.querySelector("#ac");
	clear.addEventListener("click", () => {
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
//store result as first set of numbers
//if operator selected then continue with a second set
//else reset and and start from the beginning