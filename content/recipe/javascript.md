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

### Accurately Rounding Floating Point Numbers

```js
function roundAccurately(amount, decimalPlaces) {
    const positiveAmount = Math.abs(amount);
    const result = Number(Math.round(positiveAmount + "e" + decimalPlaces) + "e-" + decimalPlaces);
    return amount < 0 ? -result : result;
}
```

### Formatting a Floating Point Number to US Dollar and Cents

```js
function formatAmount(amount) {
    const isNegative = amount < 0;
    const absoluteAmount = Math.abs(amount);
    const scaledAmount = roundAccurately(absoluteAmount, 2) * 100;
    const dollars = Math.floor(scaledAmount / 100);
    const cents = Math.abs(Math.round(scaledAmount % 100));
    const paddedCents = String(cents).padStart(2, '0');
    const sign = isNegative ? '-' : '';
    return `$${sign}${dollars}.${paddedCents}`;
}
```

### A range function

```js
const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)
```

usage:

```js
const data = range(0, 10, 2) // [0, 2, 4, 6, 8, 10]
```

### A sleep function with Async / Await

```js
// as a classic function
function sleep(millis) {
    return new Promise(res => setTimeout(res, millis))
}
// or as a one-liner:
const sleep = millis => new Promise(res => setTimeout(res, millis))
```

usage:

```js
async function main() {
    console.log('Hello')
    await sleep(2000)
    console.log('World')
}
```

### Lifting promises via transforming a function

```js
// Using Lift to transform a function that works with values
// to a function that works with Promises
const liftP = func => (...args) => Promise.all(args).then(values => func(...values))
```

**Usage:**

```js
/**
 * @param {number} x
 * @param {number} x
 * @returns {number}
 */
const add = (x, y) => x + y // a simple function

/**
 * @param {Promise<number>} x
 * @param {Promise<number>} x
 * @returns {Promise<number>}
 */
const addP = liftP(add) // transform the function to work with promises

const promise1 = Promise.resolve(3)
const promise2 = Promise.resolve(4)
const promiseValue = addP(promise1, promise2)
promiseValue.then(v => console.log({ v }))

const pv3 = addP(5, 7)
console.log({ pv3 })
pv3.then(v3 => console.log({ v3 }))
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

### requestIdleCallback and Generator Functions

You can use `requestIdleCallback` in the browser to nicely run long JavaScript programs without tying up the main thread for too long.
This works nicely with `generator` functions because `requestIdleCallback` will need to run in batches to periodically give the main thread back to the browser for user interactions and other things that need processing.

```js
// Generic scheduler / runner for iterators (such as generator functions).
// For every yield, it checks to see if there is time remaining on the idle loop
// If so, it executes more work, otherwise it queues up for the next idle period
function runNicely(it, onYield, onComplete) {
    function scheduleBatch() {
        requestIdleCallback(deadline => {
            let val = null
            do {
                val = it.next()
                onYield && onYield(val.value)
                if (deadline.timeRemaining() <= 0) {
                    return scheduleBatch()
                }
            } while (!val.done)
            onComplete && onComplete(val.value)
        })
    }
    scheduleBatch()
}
```

usage:

```js
// Sum all numbers up to the specified number.
// Written as a generator and yields every `batchSize` steps,
function* summation(x, batchSize = 1000) {
    let sum = 0
    for (let n = 1; n <= x; n++, sum += n) {
        if (n % batchSize === 0) yield n / x
    }
    return sum
}

function render(id, value, className) {
    const element = document.getElementById(id)
    element.innerHTML = value
    if (className) {
        element.className = className
    }
}

function testItOut() {
    function onYield(result) {
        render('result', Math.round(result * 100) + '%', 'result running')
    }

    function onComplete(result) {
        render('result', result, 'result done')
    }
    runNicely(summation(100000000), onYield, onComplete)
}

testItOut()
```

And the HTML for this example:

```html
<h1>Using requestIdleCallback with a JavaScript Generator</h1>
<div class="result" id="result"></div>
```
