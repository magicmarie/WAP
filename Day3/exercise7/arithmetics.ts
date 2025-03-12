// exercise 7
// Create two TypeScript modules: one module contains 4 methods that calculate add, subtract, multiply,
// and divide between two numbers passed as parameters. The other module will import the calculator
// methods to test and print out the results.

export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  return a / b;
}
