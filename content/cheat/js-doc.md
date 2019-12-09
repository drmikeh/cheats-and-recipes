---
title: JSDoc Cheatsheet
description: Cheat sheet for the JSDOC syntax.
reviewed: false
toc: true
related: true
categories:
    - 'javascript'
tags:
    - 'javascript'
    - 'jsdoc'
---

JSDoc 3 is an API documentation generator for JavaScript, similar to Javadoc or phpDocumentor. You add documentation comments directly to your source code, right alongside the code itself. The JSDoc tool will scan your source code and generate an HTML documentation website for you.

<!--more-->

### Functions

```js
/**
 * This is a function.
 *
 * @param {string} n - A string param
 * @return {string} A good string
 *
 * @example
 *
 *     foo('hello')
 */

function foo(n) {
    return n
}
```

See: <http://usejsdoc.org/index.html>

### Types

| Type                            | Description                           |
| ------------------------------- | ------------------------------------- |
| `@param {string=} n`            | Optional                              |
| `@param {string} [n]`           | Optional                              |
| `@param {(string\|number)} n`   | Multiple types                        |
| `@param {*} n`                  | Any type                              |
| `@param {...string} n`          | Repeatable arguments                  |
| `@param {string} [n="hi"]`      | Optional with default                 |
| `@param {string[]} n`           | Array of strings                      |
| `@return {Promise<string[]>} n` | Promise fulfilled by array of strings |

See: <http://usejsdoc.org/tags-type.html>

### Variables

```js
/**
 * @type {number}
 */
var FOO = 1
```

```js
/**
 * @const {number}
 */
const FOO = 1
```

### Typedef

```js
/**
 * A song
 * @typedef {Object} Song
 * @property {string} title - The title
 * @property {string} artist - The artist
 * @property {number} year - The year
 */
```

```js
/**
 * Plays a song
 * @param {Song} song - The {@link Song} to be played
 */

function play(song) {}
```

See: <http://usejsdoc.org/tags-typedef.html>

### Typedef Shorthand

```js
/**
 * A song
 * @typedef {{title: string, artist: string, year: number}} Song
 */
```

```js
/**
 * Plays a song
 * @param {Song} song - The {@link Song} to be played
 */

function play(song) {}
```

See: <http://usejsdoc.org/tags-typedef.html>

### Importing types

```js
/**
 * @typedef {import('./Foo').default} Bar
 */

/**
 * @param {Bar} x
 */

function test(x) {}
```

This syntax is [TypeScript-specific](https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript#import-types).

### Other keywords

```js
/**
 * @throws {FooException}
 * @private
 * @deprecated
 * @see
 *
 * @function
 * @class
 */
```

### Renaming

```js
/*
 * @alias Foo.bar
 * @name Foo.bar
 */
```

Prefer `alias` over `name`. See: <http://usejsdoc.org/tags-alias.html>
