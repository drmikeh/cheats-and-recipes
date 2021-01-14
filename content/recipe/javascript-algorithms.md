---
title: JavaScript Algorithms
description: Common algorithms implemented in the JavaScript language.
reviewed: true
authorbox: true
toc: true
related: true
categories:
    - 'javascript'
tags:
    - 'javascript'
    - 'algorithms'
    - 'data structures'
---

Common reusable algorithms for the JavaScript language.

<!--more-->

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

### GCD & LCM

```js
// Greatest common divisor of 2 integers
const gcd2 = (a, b) => (b ? gcd2(b, a % b) : b === 0 ? a : NaN)

// Greatest common divisor of a list of integers
function gcd(array) {
    let n = 0
    for (let i = 0; i < array.length; i++) n = gcd2(array[i], n)
    return n
}

// Least common multiple of 2 integers
const lcm2 = (a, b) => (a * b) / gcd2(a, b)

// Least common multiple of a list of integers
function lcm(array) {
    let n = 1
    for (let i = 0; i < array.length; i++) n = lcm2(array[i], n)
    return n
}

// usage:
const array = [6, 18, 42]
console.log(gcd(array))
console.log(lcm(array))
```

### Frequency Counting

```js
const freqCount = arr => arr.reduce((map, item) => {
    const count = map.get(item)
    map.set(item, count ? count + 1 : 1)
    return map
}, new Map())

// usage:
const array = ['apple', 'banana', 'apple', 'orange', 'apple', 'banana']
const fq = freqCount(array)
console.log(fq)                     // Map(3) { 'apple' => 3, 'banana' => 2, 'orange' => 1 }
```

### Generating Combinations of Two

```js
// returns an array of all unique combinations of two items from the input array
function getCombinations(array) {
    const combinations = []
    const a2 = [...array]
    while (a2.length > 1) {
        const first = a2.shift()
        a2.forEach(second => combinations.push([first, second]))
    }
    return combinations
}

// usage:
console.log(getCombinations([1, 2, 3, 4, 5]))
```

### Generating All Combinations of Zero or More

```js
/**
 * Returns a 2D array of all unique combinations of zero or more items from the input array.
 *
 * @param {Array} arr - the array of values that needs all combinations
 */
function getAllCombinations(arr) {
    return arr.reduce((subsets, value) =>
        subsets.concat(
            subsets.map(set => [...set, value])
        ),
        [[]]
    )
}

// Usage:
getAllCombinations([1, 2, 3])
/* returns:
[
  [],       [ 1 ],
  [ 2 ],    [ 2, 1 ],
  [ 3 ],    [ 3, 1 ],
  [ 3, 2 ], [ 3, 2, 1 ]
]
*/
```

### Generating Permutations

```js
/**
 * Return a 2D array containing all of the permutations of the input array.
 * Does not mutate the input array.
 *
 * @param {Array} input - the array of values that need permuting
 */
const permute = input => {
    const array = Array.from(input)
    const permute = (res, item, key, arr) => res.concat(arr.length > 1 &&
        arr
            .slice(0, key)
            .concat(arr.slice(key + 1))
            .reduce(permute, [])
            .map(perm => [item].concat(perm))
        || item
    )

    return array.reduce(permute, [])
}

// usage:
console.log(permute([1, 2, 3, 4]))
```

Another version:

```js
/**
 * Permute the elements in the specified array by swapping them in-place and
 * calling the specified callback function on the array for each permutation.
 *
 * NOTE: when permutation succeeds, the array should be in the original state on exit!
 *
 * @param {Array} array - the array of values that need permutating
 * @param {function} callback - will be called for each permutation
 * @returns the number of permutations, returns 0 for an undefined, null, or empty array
 */
function permute(array, callback) {
    // Do the actual permuation work on array, starting at index
    function p(array, index, callback) {
        // Swap elements i1 and i2 in array a
        function swap(a, i1, i2) {
            let t = a[i1]
            a[i1] = a[i2]
            a[i2] = t
        }
        if (index === array.length - 1) {
            callback(array)
            return 1
        } else {
            let count = p(array, index + 1, callback)
            for (let i = index + 1; i < array.length; i++) {
                swap(array, i, index)
                count += p(array, index + 1, callback)
                swap(array, i, index)
            }
            return count
        }
    }

    if (!array || array.length == 0) {
        return 0
    }
    return p(array, 0, callback)
}

// sample usage: prints each permutation and the total count of permutations
console.log(permute([1, 2, 3, 4], console.log))
```

### Binary Search

A binary search is a fast way to find a value in a large sorted array. To make this more flexible, the `binarySearch` computes values using the `f` callback function until is finds a computed value that is closest to `target` without going over, or null if no such value exists.

```js
/**
 *
 * @param {Array} array - an array of values each of which are passed into `f`
 * @param {Function} f - the evaluation function (should return a Number)
 * @param {Number} target - the target that we want to get closest to without going over
 * @returns{Number} - the value from the `array` that evaluates to a result that is
 *     closest to `target` without going over, or null if no valid value was found.
 */
function binarySearch(array, f, target) {
    let low = 0
    let high = array.length - 1
    while (low < high) {
        const mid = Math.ceil((low + high) / 2)
        if (f(array[mid]) <= target) {
            low = mid
        } else {
            high = mid - 1
        }
    }
    return array[low] <= target ? array[low] : null
}

// example:
const data = [1, 5, 12, 29, 63, 81, 94, 99]
const f = n => n * n + 3 * n + 5
const target = 5000
const found = binarySearch(data, f, target)
console.log({ target, found, value: f(found) })
```

### Breadth-First and Depth-First Search

I use recursion here for its elegance, but non-recursive implementations may be more appropriate when traversing deeper trees.

```js
function dfs(node, fn, level = 0) {
    fn(node, level)
    if (node.children) {
        node.children.forEach(function(child) {
            dfs(child, fn, level + 1)
        })
    }
}

function bfs(root, fn) {
    function processLevel(nodes, level) {
        let nextLevelNodes = []
        nodes.forEach(node => {
            fn(node, level)
            if (node.children) {
                nextLevelNodes = nextLevelNodes.concat(node.children)
            }
        })
        if (nextLevelNodes.length > 0) {
            processLevel(nextLevelNodes, level + 1)
        }
    }
    fn(root, 0)
    processLevel(root.children, 1)
}

// example
const georgia = {
    name: 'Georgia',
    children: [
        {
            name: 'Cobb',
            children: [
                { name: 'Marietta' },
                { name: 'Smyrna' },
                { name: 'Kennesaw' }
            ]
        },
        {
            name: 'Gwinnett',
            children: [
                { name: 'Duluth' },
                { name: 'Lawrenceville' },
                { name: 'Norcross' },
                { name: 'Suwanee' }
            ]
        }
    ]
}

console.log('dfs:')
dfs(georgia, (area, level) => console.log(' '.repeat(level * 2), area.name))

console.log('bfs:')
bfs(georgia, (area, level) => console.log(' '.repeat(level * 2), area.name))
```

### Topological Sort of a DAG

Coming soon...
