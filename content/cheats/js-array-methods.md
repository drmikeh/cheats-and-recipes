---
title: JavaScript Modern Array Methods
description: Cheat sheet for the JavaScript Modern Array Methods
reviewed: true
toc: true
related: true
categories:
    - 'JavaScript'
tags:
    - 'JavaScript'
    - 'Array'
---

Array methods are a powerful way to iterate over an array to create a new Array or value.

<!--more-->

### map

```js
;[1, 2, 3, 4, 5].map(n => n * n) // [1, 4, 9, 16, 25]
```

### filter

```js
;[1, 2, 3, 4, 5].filter(n => n % 2 === 0) // [2, 4]
```

### reduce

```js
;[1, 2, 3, 4, 5].reduce((a, b) => a + b, 0) // 15
```

### find

```js
const pets = [
    { id: 1, name: 'Snoopy' },
    { id: 2, name: 'Felix' },
    { id: 3, name: 'Tweetie' }
]
pets.find(p => p.id === 2) // { id: 2, name: 'Felix' }
```

### findIndex

```js
const pets = [
    { id: 1, name: 'Snoopy' },
    { id: 2, name: 'Felix' },
    { id: 3, name: 'Tweetie' }
]
pets.findIndex(p => p.id === 2) // 1
```

### Chaining Array methods

```js
const isNumber = n => !isNaN(n)
const square = n => n * n
const sum = (a, b) =>
    a +
    b[(1, 2, 3, 'foo', 4, 5, 'banana')]
        .filter(isNumber)
        .map(square)
        .reduce(sum, 0) // 55
```
