// exercise 2
// Create a TypeScript function that takes an array of numbers and returns the second largest number within that array.

function secondLargestNumber(arr: number[]): number {
  if (arr.length < 2) {
    throw new Error('Array must have at least two elements');
  }

  let largest = arr[0];
  let secondLargest = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
    } else if (arr[i] > secondLargest && arr[i] < largest) {
      secondLargest = arr[i];
    }
  }

  return secondLargest;
}
console.log(secondLargestNumber([20 ,120 ,111 ,215 ,54 ,78])); // Output: 120


// exercise 3
// Create a TypeScript function that takes an array of numbers and returns a new array containing the squares of each number (use Array.map()).

function squareNumbers(arr: number[]): number[] {
  return arr.map(num => num * num);
}
console.log(squareNumbers([1, 2, 3, 4, 5])); // Output: [1, 4, 9, 16, 25]

// Create a TypeScript function that takes an array of numbers and returns a new array containing all even numbers (use Array.filter()).

function evenNumbers(arr: number[]): number[] {
  return arr.filter(num => num % 2 === 0);
}
console.log(evenNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])); // Output: [2, 4, 6, 8, 10]

// exercise 4
// Create a TypeScript function that takes any number of arguments and returns their sum (use the rest operator).

function sum(...args: number[]): number {
  return args.reduce((acc, num) => acc + num);
}
console.log(sum(1, 2, 3, 4, 5)); // Output: 15


// exercise 5
// Given two arrays:
// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];
// Use the spread operator to concatenate them into a single array.

function concatenateArrays(arr1: number[], arr2: number[]): number[] {
  return [...arr1, ...arr2];
}
console.log(concatenateArrays([1, 2, 3], [4, 5, 6])); // Output: [1, 2, 3, 4, 5, 6]


// exercise 6
// Create a TypeScript function that takes an object with the following properties: name (string), age (number), 
// and isStudent (boolean). The function should return a string describing the person as per the example below 
// (use Template literals).

interface Person {
  name: string;
  age: number;
  isStudent: boolean;
}

function describePerson(person: Person): string {
  return `${person.name} is ${person.age} years old and is ${person.isStudent ? 'a student' : 'not a student'}.`;
}

const person: Person = { name: "Alice", age: 25, isStudent: true };
console.log(describePerson(person)); // Output: "Alice is 25 years old and is a student."
console.log(describePerson({ name: "Bob", age: 30, isStudent: false })); // Output: "Bob is 30 years old and is not a student."

