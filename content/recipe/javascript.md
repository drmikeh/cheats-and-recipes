---
title: JavaScript Recipes
description: Recipes for the JavaScript language.
reviewed: true
authorbox: true
toc: true
related: true
categories:
    - 'javascript'
tags:
    - 'javascript'
---

Recipes for the JavaScript language.

<!--more-->

### A Delay function with Async / Await

```js
function delay(millis) {
    return new Promise(res => setTimeout(res, millis))
}

async function main() {
    console.log('Hello')
    await delay(2000)
    console.log('World')
}
```

### Reading a Data File

```js
const fs = require('fs')
exports.readFile = (fileName, separator = '\n') => {
    return fs
        .readFileSync(fileName, 'utf-8')
        .split(separator)
        .filter(Boolean)
        .map(n => parseInt(n))
}
```

### Writing a JSON file

```js
const fs = require('fs')
const customer = {
    name: 'Acme Corporation',
    address: '123 Main Street',
    phone: '123-456-7890'
}
const jsonString = JSON.stringify(customer)
try {
    fs.writeFileSync('./customer.json', jsonString)
} catch (e) {
    console.error('ERROR:', e.message)
}
```

### Writing to a file using streams

```js
const fs = require('fs')
try {
    const writer = fs.createWriteStream('helloworld.txt', 'utf-8')
    writer.write('hello world')
    writer.end()
} catch (e) {
    console.error('ERROR:', e.message)
}
```

### Array Union, Intersection, Difference

See: [Array intersection, difference and union in ES6 - Alvaro Saburido - Medium](https://medium.com/@alvaro.saburido/set-theory-for-arrays-in-es6-eb2f20a61848)

```javascript
const arrA = [1, 3, 4, 5]
const arrB = [1, 2, 5, 6, 7]

const union = [...new Set([...arrA, ...arrB])] // [ 1, 3, 4, 5, 2, 6, 7
const intersection = arrA.filter(x => arrB.includes(x)) // [1, 5]
const differenceAB = arrA.filter(x => !arrB.includes(x)) // [3, 4]
const differenceBA = arrB.filter(x => !arrA.includes(x)) // [2, 6, 7]

const symmetricalDifference = arrA
    .filter(x => !arrB.includes(x))
    .concat(arrB.filter(x => !arrA.includes(x))) // [2, 3, 4, 6, 7]
// another way: const symmetricalDifference = [...differenceAB, ...differenceBA]
```

### Function Composition

```javascript
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)

double = n => n * 2
inc = n => n + 1
const incAndDouble = pipe(inc, double)
console.log(incAndDouble(3))
```
