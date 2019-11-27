---
title: Flex Demo
description: Using Flexbox with Hugo
reviewed: false
toc: true
authorbox: true
related: true
categories:
    - 'Flexbox'
tags:
    - 'Flexbox'
---

This is just a test page for using Flexbox with Hugo.

<!--more-->

{{< flex >}}
{{< flex-column >}}

### useMemo

Memoize a value between renders.

```js
const memoizedValue = useMemo(() => {
    computeExpensiveValue(a, b)
}, [a, b])
```

{{< /flex-column >}}

{{< flex-column >}}

### useCallback

Memoize a function between renders.

```js
const memoizedCallback = useCallback(() => {
    doSomething(a, b)
}, [a, b])
```

{{< /flex-column >}}
{{< /flex >}}
