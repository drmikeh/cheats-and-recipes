---
title: Functional JavaScript
description: Cheat sheet for functional programming with JavaScript
date: 2019-11-24
reviewed: true
toc: true
related: true
categories:
    - 'javascript'
tags:
    - 'javascript'
    - 'functional programming'
---

Functional programming is writing functions and expressions that are free from any side-effects, including mutating variables.

<!--more-->

## Immutable Object and Array Operations

### Update an object

```js
const obj = { name: 'Mike', age: 29 }
const newObject = { ...obj, name: 'Michael' } // changes name to 'Michael'
```

### Add an item to an array

```js
const items = ['apple', 'orange']
const newItems = [...items, 'banana'] // adds banana
```

### Update an item in an array using map

```js
const pets = [
    { id: 1, name: 'Snoopy', age: 5 },
    { id: 2, name: 'Felix', age: 3 }
]
const newPets = pets.map(pet => (pet.id !== 2 ? pet : { ...pet, age: 4 })) // Felix is now 4
```

### Remove an item from an array using filter

```js
const pets = [
    { id: 1, name: 'Snoopy', age: 5 },
    { id: 2, name: 'Felix', age: 3 }
]
const newPets = pets.filter(pet => pet.id !== 2) // removes Felix
```

## Immutable Array Operations

```js
const clone = x => [...x]
const push = y => x => [...x, y]
const pop = x => x.slice(0, -1)
const unshift = y => x => [y, ...x]
const shift = x => x.slice(1)
const sort = f => x => [...x].sort(f)
const Delete = i => x => [...x.slice(0, i), ...x.slice(i + 1)]
const splice = (s, c, ...y) => x => [...x.slice(0, s), ...y, ...x.slice(s + c)]

const a = [1, 2, 3, 4, 5]
console.log(clone(a))
console.log(push(6)(a))
console.log(pop(a))
console.log(unshift(0)(a))
console.log(shift(a))
console.log(sort((a, b) => a < b)(a))
console.log(Delete(3)(a))
console.log(splice(1, 3, 12, 13, 14)(a))
```
