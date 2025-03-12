### Explain the difference between primitive types and object references in JavaScript.
In JavaScript, primitive types and object references differ in how they are stored and accessed.

Primitive Types are immutable and therefore stored by value directly in memory.

Examples(return value): string("string"), number("number"), boolean("boolean"), null("object"), undefined("undefined"), bigint("bigint"), symbol("symbol")

```
let x = 20;
let b = a;  // Copying value
b = 25;
console.log(a); // 10 (original remains unchanged)
```

Object References are mutable and therefore stored by reference in memory rather than value. When assigned to a variable, only the reference (memory address) is copied.

Examples: {}, [], Function, Map, Set

```
let obj1 = { name: "Alice" };
let obj2 = obj1;  // Copying reference
obj2.name = "Bob";
console.log(obj1.name); // "Bob" (Both reference the same object)
```


### What are the advantages for using TypeScript?
TypeScript provides static typing and better tooling support
- Type Safety – Prevents runtime errors by catching mistakes at compile-time.
- Better Code Completion – Provides autocompletion and IntelliSense in editors.
- Improved Maintainability – Enforces better structure and readability.
- Optional Static Typing – Can gradually add types without rewriting JavaScript.
- ES6+ Features – Supports modern JavaScript features before browsers do.


### How can we run TypeScript code in the browser?
Since browsers don’t understand TypeScript directly, we must compile it to JavaScript first before running it.

You can use a bundler like Vite, Webpack, or Parcel. (PS: We haven't learnt those yet).

You can use a CDN and therefore no build tools.

Steps:

Install TypeScript:
``` npm install -g typescript```

Compile .ts file to .js:
```tsc script.ts```

Include the compiled JavaScript file in index.html:
```<script src="script.js"></script>```

Using ts-node for Server-Side TypeScript
For backend TypeScript, you can use tsx: ```npx tsx server.ts```

### What are the differences between let and const? and what is their scope?
let
- Allows reassignment.
- Cannot be redeclared in the same scope.
- Block-scoped ({}), meaning it's only accessible inside the block where it is defined.
- Not hoisted to the top like var.

const
- Cannot be reassigned after initialization.
- Also block-scoped ({}).
- Must be initialized at declaration.
- Works for objects and arrays, but their properties/elements can be modified.

Scope Differences
- Both let and const have block scope, meaning they are only available inside the {} block where they are defined.
- Unlike var, they are not function-scoped and do not get hoisted in a usable way.


### What is an IIFE and write a snippet code for one.
An IIFE is a function that executes immediately after it's defined. Variables inside an IIFE can not be accessed outside of it.

```
(function () {
    console.log("Hello, IIFE!");
})();
````

Arrow Function IIFE:
```
(() => {
    console.log("IIFE using arrow function!");
})();
```
