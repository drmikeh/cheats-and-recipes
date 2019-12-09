---
title: JavaScript Promises Cheatsheet
description: Cheat sheet for JavaScript Promises
reviewed: true
toc: true
related: true
categories:
    - 'javascript'
tags:
    - 'javascript'
    - 'promises'
    - 'ES-2015'
---

A promise represents the eventual result of an asynchronous operation. JavaScript promises were added to the language in ES-2015.

<!--more-->

### Making promises

```js
new Promise((resolve, reject) => {
    if (ok) {
        resolve(result)
    } else {
        reject(error)
    }
})
```

For asynchronous programming, see: [Promises](https://babeljs.io/learn-es2015/#promises)

### Using promises

```js
promise
  .then(result => { ··· })
  .catch(error => { ··· })
```

### Using promises with finally

```js
promise
  .then(result => { ··· })
  .catch(error => { ··· })
  .finally(() => { // logic independent of success/error })
```

The handler is called when the promise is fulfilled or rejected.

### Promise functions

```js
Promise.all(···)
Promise.race(···)
Promise.reject(···)
Promise.resolve(···)
```

### Async-await

```js
async function run() {
    const user = await getUser()
    const tweets = await getTweets(user)
    return [user, tweets]
}
```

`async` functions are another way of using promises.

See: [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

### Promise.all with async-await

Use `Promise.all` to execute concurrent asynchronous operations and wait for them all to resolve (or any of them to reject).

Example:

```js
try {
    const [departments, products, cart] = (
        await Promise.all([
            axios.get('/departments'),
            axios.get('/products'),
            axios.get('/cart')
        ])
    ).map(r => r.data)
    this.setState({
        departments,
        products,
        cart,
        loading: false
    })
} catch (e) {
    console.error('ERROR:', e)
    this.setState({ updating: false })
    alert('ERROR: ' + e.message)
}
```
