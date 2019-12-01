---
title: CSS flexbox
description: Cheat sheet for Flexbox
reviewed: false
toc: true
related: true
categories:
    - 'css'
tags:
    - 'css'
    - 'flexbox'
    - 'styling'
    - 'layout'
---

Use CSS Flexbox to control the layout of HTML elements in a single dimension (horizontal or vertical).

<!--more-->

### Simple example

```css
.container {
    display: flex;
}

.container > div {
    flex: 1 1 auto;
}
```

### Container

```css
.container {
    display: flex;
    display: inline-flex;

    flex-direction: row; /* ltr - default */
    flex-direction: row-reverse; /* rtl */
    flex-direction: column; /* top-bottom */
    flex-direction: column-reverse; /* bottom-top */

    flex-wrap: nowrap; /* one-line */
    flex-wrap: wrap; /* multi-line */

    align-items: flex-start; /* vertical-align to top */
    align-items: flex-end; /* vertical-align to bottom */
    align-items: center; /* vertical-align to center */
    align-items: stretch; /* same height on all (default) */

    justify-content: flex-start; /* horizontal alignment - default */
    justify-content: flex-end;
    justify-content: center;
}
```

### Child

```css
.container > div {
    /* This: */
    flex: 1 0 auto;

    /* Is equivalent to this: */
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: auto;

    order: 1;

    align-self: flex-start; /* left */
    margin-left: auto; /* right */
}
```

## Recipes

### Vertical center

```css
.container {
    display: flex;
    align-items: center; /* vertical */
    justify-content: center; /* horizontal */
}
```

### Reordering

```css
.container > .top {
    order: 1;
}

.container > .bottom {
    order: 2;
}
```

### Mobile layout

```css
.container {
    display: flex;
    flex-direction: column;
}

.container > .top {
    flex: 0 0 100px;
}

.container > .content {
    flex: 1 0 auto;
}
```

A fixed-height top bar and a dynamic-height content area.

### Vertical

```css
.container {
    align-items: center;
}
```

Vertically-center all items.

### Left and right

```css
.menu > .left {
    align-self: flex-start;
}
.menu > .right {
    align-self: flex-end;
}
```

## References

-   [MDN: Using CSS flexbox](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)
-   [Ultimate flexbox cheatsheet](http://www.sketchingwithcss.com/samplechapter/cheatsheet.html)
