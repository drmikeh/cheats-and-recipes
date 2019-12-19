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
