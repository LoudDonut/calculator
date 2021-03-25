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
	else if (operator === "*") {
		return multiply(a, b);
	}
	else if (operator === "/") {
		return divide(a, b);
	}
	else {
		return "ERROR in operate()";
	}
}