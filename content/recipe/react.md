---
title: React Recipes
description: Recipes for building React applications
reviewed: true
authorbox: true
toc: true
related: true
categories:
    - 'react'
tags:
    - 'react'
---

Recipes for building React applications.

<!--more-->

### How to Count Renders

```jsx
// define a Logger component that logs how many times it has been called
function Logger() {
  const numRenders = React.useRef(0)
  ++numRenders.current
  console.log(`You have rendered me ${numRenders.current} times.`)
  return null
}

// use the Logger component in your component
function MyComponent() {
    return {
        <Logger />
        <p>Hello, World</p>
    }
}
```
