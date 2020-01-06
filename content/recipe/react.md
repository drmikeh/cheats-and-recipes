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

### A RESTful / CRUD Custom Hook

First define a service using Axios

```js
```

Then define a _generic_ custom hook:

-   generic in that it works for any RESTful endpoint
-   uses Dependency Injection for doing CRUD operations via a Service

```jsx
import { useState, useEffect } from 'react'
import toastr from '../toastr'
import 'toastr/build/toastr.min.css'

function useCrud(service, initialValue, initialLoading) {
    const [items, setItems] = useState(initialValue)
    const [loading, setLoading] = useState(initialLoading)

    // initial load of items
    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const response = await service.get()
                setTimeout(() => {
                    setLoading(false)
                    setItems(response.data)
                }, 800)
            } catch (error) {
                toastr.error(error)
            }
        })()
    }, [])

    async function create(item) {
        try {
            const response = await service.post(item)
            setItems([...items, response.data])
        } catch (error) {
            toastr.error(error)
        }
    }

    async function destroy(id) {
        try {
            // Filter all items except the one to be removed
            const remaining = items.filter(item => item.id !== id)
            await service.delete(id)
            setItems(remaining)
        } catch (error) {
            toastr.error(error)
        }
    }

    async function destroyMany(filter) {
        const keepers = items.filter(item => !filter(item))
        const losers = items.filter(item => filter(item))
        const promises = losers.map(item => service.delete(item.id))
        Promise.all(promises)
            .then(responses => {
                setItems(keepers)
            })
            .catch(error => {
                console.log('HERE')
                toastr.error(error)
            })
    }

    async function update(updatedItem) {
        try {
            const response = await service.put(updatedItem)
            const updatedItemFromServer = response.data
            const newItems = items.map(item =>
                item.id !== updatedItemFromServer.id
                    ? item
                    : updatedItemFromServer
            )
            setItems(newItems)
        } catch (error) {
            toastr.error(error)
        }
    }

    function length() {
        return items ? items.length : 0
    }

    function find(id) {
        return items.find(item => item.id === id)
    }

    function filter(fn) {
        return items.filter(fn)
    }

    function reduce(fn, initialValue) {
        return items.reduce(fn, initialValue)
    }

    return {
        loading,
        items,
        setItems,
        create,
        destroy,
        destroyMany,
        update,
        length,
        find,
        filter,
        reduce
    }
}

export default useCrud
```

Usage:

```jsx
import useCrud from '../../hooks/use-crud'

const TodoApp = () => {
    const todos = useCrud(TodoService, [])

    function onUpdateTitle(id, title) {
        const foundTodo = todos.find(id)
        const updatedTodo = {
            ...foundTodo,
            title
        }
        todos.update(updatedTodo)
    }

    function onToggleCompleted(id) {
        const foundTodo = todos.find(id)
        const updatedTodo = {
            ...foundTodo,
            completed: !foundTodo.completed
        }
        todos.update(updatedTodo)
    }

    function onDeleteCompleted() {
        todos.destroyMany(todo => todo.completed)
    }
}
```
