import Calculator from "./calculator.js";
import CalculatorAdapter from "./calculator-adapter.js";

const calculator = new Calculator();
const calculatorAdapter = new CalculatorAdapter();

// Old way of using the calculator
// console.log(calculator.operation(3, 4, "multiplication"));

// Using the adapter
console.log(
  "With Adapter: ",
  calculatorAdapter.operation(3, 4, "multiplication")
);

console.log("Regular: ", calculator.add(1, 4));
