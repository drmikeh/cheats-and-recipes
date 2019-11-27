---
title: React
description: Cheat sheet for React.js
reviewed: true
authorbox: true
toc: true
related: true
categories:
    - 'React'
tags:
    - 'React'
    - 'JavaScript'
    - 'library'
    - 'framework'
---

React.js is a declarative, component based JavaScript library for building user interfaces.
<!--more-->

## Stateful Class Component

```jsx
import React from 'react'

class Counter extends React.Component {
    state = {
        count: this.props.initialCount
    }
    inc = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    dec = () => {
        this.setState({
            count: this.state.count > 0 ? this.state.count - 1 : 0
        })
    }
    reset = () => {
        this.setState({
            count: 0
        })
    }
    render() {
        return (
            <div>
                <span className="count">The count is: {this.state.count}</span>
                <button onClick={this.inc}>+</button>
                <button onClick={this.dec}>-</button>
                <button onClick={this.reset}>0</button>
            </div>
        )
    }
}

export default Counter
```

## Stateless Function Component

```jsx
import React from 'react'

function Hello({ firstName, lastName }) {
    return (
        <p className="greeting">
            Hello {firstName} {lastName}
        </p>
    )
}

export default Hello
```

## Stateful Function Component

```jsx
import React from 'react'

function Counter({ initialCount }) {
    const [count, setCount] = React.useState(initialCount)

    const inc = () => setCount(c => c + 1)
    const dec = () => setCount(c => (c > 0 ? c - 1 : 0))
    const reset = () => setCount(0)

    return (
        <div>
            <span className="count">The count is: {count}</span>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
            <button onClick={reset}>0</button>
        </div>
    )
}

export default Counter
```

## React Hooks

### Summary of Hooks

| Hook                  | Description                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------- |
| `useState`            | Persists a value between renders. Updates will trigger a render.                                            |
| `useEffect`           | Handles side-effects such as getting data from a server or communicating with the browser API.              |
| `useContext`          | Returns the current context value for the specified context object.                                         |
| `useRef`              | Persist a value between renders, does not trigger a render.                                                 |
| `useImperativeHandle` | Customize the instance value that is exposed to parent components when using `ref`.                         |
| `useReducer`          | Persists a value between renders. Manages the state via the reducer pattern. Updates will trigger a render. |
| `useMemo`             | Memoize a _value_ between renders.                                                                          |
| `useCallback`         | Memoize a _function_ between renders.                                                                       |

### useState

Persists a value between renders. Updates will trigger a render.

```jsx
const [state, setState] = React.useState(initialStateValue)
```

### useEffect

Handle side-effects such as getting data from a server or communicating with the browser API (such as history, local storage, or geolocation services).

```jsx
React.useEffect(() => {
  /* side-effect code goes here */
  /* optionally return a cleanup function */
  },
  /* optional array of triggers */
}
```

### useContext

Returns the current context value for the specified context object.

```jsx
import ThemeContext from './ThemeContext'
...
const context = React.useContext(ThemeContext)
```

### useRef

Persist a value between renders, does _not_ trigger a render.

```jsx
import React from 'react'

function TextInputWithFocusButton() {
    const inputRef = React.useRef(null) // initialize inputRef.current to null
    const onButtonClick = () => {
        inputRef.current.focus() // inputRef.current points to the DOM node
    }
    return (
        <>
            <input ref={inputRef} type="text" />{' '}
            {/* React sets inputRef.current to the input DOM element */}
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    )
}

export default TextInputWithFocusButton
```

### useImperativeHandle

Customize the instance value that is exposed to parent components when using `ref`.

NOTE: `useImperativeHandle` should be used with `forwardRef`.

#### useRef vs. useImperativeHandle

`useImperativeHandle` provides a way to customize the object that is exposed to parent components that use a `ref`. For example, the customized object could have additional methods that the parent component can call so that it can directly interact with the `ref`.

### useReducer

Persists a value between renders. Manages the state via the `reducer` pattern. Updates will trigger a render.

```jsx
import React from 'react'

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count > 0 ? state.count - 1 : 0 }
        case 'reset':
            return { count: 0 }
        default:
            throw new Error()
    }
}

function Counter({ initialCount }) {
    const initialState = { count: initialCount }
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
        <div>
            <span className="count">The count is: {state.count}</span>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'reset' })}>0</button>
        </div>
    )
}

export default Counter
```

### useMemo

Memoize a value between renders.

```js
const memoizedValue = useMemo(() => {
    computeExpensiveValue(a, b)
}, [a, b])
```

### useCallback

Memoize a function between renders.

```js
const memoizedCallback = useCallback(() => {
    doSomething(a, b)
}, [a, b])
```

#### useMemo vs. useCallback

Both `useMemo` and `useCallback` take functions as arguments. The difference is that `useCallback` returns its function when the dependencies change while `useMemo` calls its function and returns the result.

In other words:

| hook          | description                                                    |
| ------------- | -------------------------------------------------------------- |
| `useCallback` | gives you referential equality between renders for _functions_ |
| `useMemo`     | gives you referential equality between renders for _values_    |
