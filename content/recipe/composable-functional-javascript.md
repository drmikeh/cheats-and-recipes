---
title: Composable Functional JavaScript
description: Recipes on Composing Functions in JavaScript
reviewed: true
authorbox: true
toc: true
related: true
categories:
    - 'javascript'
tags:
    - 'javascript'
    - 'functional programming'
    - 'composition'
---

Recipes on Composing Functions in JavaScript

<!--more-->

### Composing Singular Pure Functions

```js
const double = n => n * 2
const inc = n => n + 1
const square = n => n * n

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)

const composed = pipe(inc, double, square)
console.log(composed(3)) // ((3 + 1) * 2 ) ^ 2 = 64;
```

### Box

```js
// Box is the identity functor!
const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    chain: f => f(x),
    ap: b2 => b2.map(x),
    toString: () => `Box(${x})`
})
Box.of = x => Box(x)

const result = Box('   42  ')
    .map(s => s.trim())
    .map(s => new Number(s))
    .fold(n => n + 1)
console.log(result.toString())
```

### Lazy Box

`LazyBox` is used to delay evaluation. Nothing happens until `fold` is called.

```js
const LazyBox = g => ({
    map: f => LazyBox(() => f(g())),
    fold: f => f(g()),
    toString: () => `LazyBox(${g})`
})

// example:
const result = LazyBox(() => '   42  ')
    .map(s => s.trim())
    .map(s => new Number(s))
    .map(n => n + 1)
    .fold(n => n) // fold makes things happen!
console.log(result.toString())
```

### Maybe Monad

The `Maybe` monad is used to gracefully handle errors. The error state propagates throughout the expressions, eliminating the need to handle errors explicitly, such as with `try/catch` blocks.

```js
const Left = x => ({
    map: f => Maybe(f(x)),
    fold: (f, g) => f(x), // exec the Left function
    toString: () => `Left(${x})`
})

const Right = x => ({
    map: f => Right(x), // f is ignored!
    fold: (f, g) => g(x), // exec the Right function
    toString: () => `Right(${x})`
})

const Maybe = x => (x != null ? Left(x) : Right(null))
```

An example:

```js
const findColor = name =>
    Maybe(
        {
            red: '#ff4444',
            blue: '#3b5998',
            yellow: '#fff68f'
        }[name]
    )

const blueColorValue = findColor('blue')
    .map(c => c.slice(1))
    .map(c => c.toUpperCase())
    .fold(
        x => x,
        e => 'NOT FOUND'
    )

const bogusColorValue = findColor('bogus')
    .map(c => c.slice(1))
    .map(c => c.toUpperCase())
    .fold(
        x => x,
        e => 'NOT FOUND'
    )

console.log(
    `Example 3: blue has the value ${blueColorValue} and bogus has the value ${bogusColorValue}`
)
```

### The Y Combinator

The Y combinator is an implementation of a fixed-point combinator in lambda calculus. In mathematics and computer science in general, a fixed point of a function is a value that is mapped to itself by the function. Essentially it is a way to implement recursion without self reference. In the lambda calculus it is not possible to refer to the definition of a function in a function body. Recursion may only be achieved by passing in a function as a parameter. The Y combinator demonstrates this style of programming. It does not have much practical value but is a bit fascinating to think about :-).

```js
const Y = f => {
  const g = h => (...args) => f(h(h))(...args)
  return f(g(g))
}

// example:
const fac = Y(f => n => (n > 1 ? n \* f(n - 1) : 1))
const fib = Y(f => n => (n > 1 ? f(n - 1) + f(n - 2) : n))

console.log('fac(5):', fac(5))
console.log('fib(10):', fib(10))
```
