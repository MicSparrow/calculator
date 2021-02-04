const calculator = document.querySelector(".calculator");
const display = calculator.querySelector(".display");
const keys = calculator.querySelector(".keys");
const numbers = calculator.querySelectorAll(".number");
const operators = calculator.querySelectorAll(".operator");
const equals = calculator.querySelector(".equal");
const trash = calculator.querySelector(".trash");
const backspace = calculator.querySelector(".backspace");
const decimal = calculator.querySelector(".decimal");
const zero = calculator.querySelector(".zero");

let firstValue = "";
let secondValue = "";
let currentOperation = null;
let removeZero = false;

window.addEventListener("keydown", setInput);
equals.addEventListener("click", evaluate);
trash.addEventListener("click", clearScreen);
backspace.addEventListener("click", deleteDigit);
decimal.addEventListener("click", insertDot);

numbers.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operators.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

function appendNumber(number) {
  if (display.textContent === "0" || removeZero) resetScreen();
  zero.remove();
  display.textContent += number;
}

function resetScreen() {
  display.textContent = "";
  removeZero = false;
}

function clearScreen() {
  display.textContent = "0";
  firstValue = "";
  secondValue = "";
  currentOperation = null;
}

function insertDot() {
  if (removeZero) resetScreen();
  if (display.textContent === "") display.textContent = "0";
  if (display.textContent.includes(".")) return;
  display.textContent += ".";
}

function deleteDigit() {
  display.textContent = display.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstValue = display.textContent;
  currentOperation = operator;
  removeZero = true;
}

function evaluate() {
  if (currentOperation === null || removeZero) return;
  if (currentOperation === "÷" && display.textContent === "0") {
    alert("Error");
    clearScreen();
    return;
  }

  secondValue = display.textContent;
  display.textContent = roundDecimals(
    operate(currentOperation, firstValue, secondValue)
  );
  currentOperation = null;
}

function roundDecimals(number) {
  return Math.round(number * 1000) / 1000;
}

function setInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") insertDot();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteDigit();
  if (e.key === "Delete") clearScreen();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "^" || e.key === "/")
    setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "x";
  if (keyboardOperator === "^") return "^";
  if (keyboardOperator === "-") return "-";
  if (keyboardOperator === "+") return "+";
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function power(a, b) {
  return Math.pow(a, b);
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "^":
      return power (a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
      break;
    default:
      return null;
  }
}
