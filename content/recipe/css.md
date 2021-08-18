---
title: CSS Recipes
description: Common recipes for CSS.
reviewed: true
authorbox: true
toc: true
related: true
categories:
    - 'css'
tags:
    - 'css'
    - 'styling'
    - 'web'
---

Common recipes for CSS and SCSS.

<!--more-->

### Responsive Font Size

You can have a font size grow or shrink based on the size of the viewport. This is handy for banners and headers.

```css
.header {
    font-size: calc(10px + 1vmin);  /* minimum of 10px + 1% of the viewport's larger dimension (width or height)
}
```

### Responsive Tricks

I found this in the article [3 easy CSS tricks for responsive websites I use for every project](https://sjorswijsman.medium.com/3-easy-css-tricks-for-responsive-websites-i-use-in-every-project-68ec334a1522).

There is a live demo [here](https://codepen.io/drmikeh/pen/jOmjzqL).


```css
html {
  font-size: calc(60% + 0.8vmin);
}
main {
  max-width: 40rem;
  margin: 0 auto;
}
* {
  font-size: 1rem;
}
h1 {
  font-size: 2.2rem;
}
h2 {
  font-size: 1.6rem;
}

h3 {
  font-size: 1.3rem;
}
```


### Smooth Scrolling

```css
html {
  scroll-behavior: smooth;
}
```


### Remove Blue Border From Focussed Buttons

```css
button:focus {
    outline: 0;
}
```

### Remove bullets from an Unordered List

```css
ul {
    list-style-type: none;
    padding-left: 0;
}
```

### Button Click Animation

See a live demo [here](https://codepen.io/drmikeh/pen/LYYwvgN).

```css
button {
    background: rgb(211, 211, 211);
    border: none;
    border-radius: 5px;
    font-size: 1.5rem;
    box-shadow: 2px 2px 5px 2px rgb(96, 96, 96);
}

button:active {
    background-color: rgb(160, 160, 160);
    transform: translate(2px, 2px);
    box-shadow: inset;
}

button:focus {
    outline: 0;
}
```

### Styling a Definition List

See a live demo [here](https://codepen.io/drmikeh/pen/gOOVydG).

```css
dl {
  display: flex;
  flex-flow: row wrap;
  border: solid #333;
  border-width: 1px 1px 0 0;
}
dt {
  flex-basis: 20%;
  padding: 2px 4px;
  background: #333;
  text-align: right;
  color: #fff;
}
dt::after {
  content: ":";
}
dd {
  flex-basis: 70%;
  flex-grow: 1;
  margin: 0;
  padding: 2px 4px;
  border-bottom: 1px solid #333;
}
```

### Center and Vertically Align with Flexbox

For a demo see: [Center and Vertically Align with Flexbox](https://codepen.io/drmikeh/pen/mdybNbd)

```css
.container {
    display: flex;
    justify-content: center;
    align-content: space-between;
    align-items: center;
}

.container > * {
    margin: 10px;
}
```

### A Card Layout with Flexbox or Grid

See live example [here](https://codepen.io/drmikeh/pen/xxxvRNW?editors=1100).

```css
body {
    text-align: center;
}

.cards-flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
}

.cards-grid {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    grid-column-gap: 5px;
    grid-row-gap: 10px;
}

.card {
    display: flex;
    flex-direction: column;
    background: lightgray;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    width: 250px;
}

.card .header {
    border-bottom: 1px solid gray;
}

.card .main {
    text-align: left;
    flex-grow: 1;
    padding: 1px 10px;
}

.card .footer {
    flex-grow: 0;
    border-top: 1px solid gray;
    padding: 15px;
    display: flex;
    justify-content: flex-end;
}
```

### A Pretty Box in a Box

```scss
.container {
    text-align: center;
    background: rgb(240, 240, 240);
    max-width: 600px;
    margin-top: 40px;
    padding: 20px;
    border: 1px solid rgb(192, 192, 192);
    border-radius: 10px;
}

@mixin pretty-box {
    border: 1px solid rgba(192, 192, 192, 0.2);
    border-radius: 10px;
    background: rgb(228, 228, 228);
    padding: 20px;
}
```

### Color Palette

See a live demo [here](https://codepen.io/drmikeh/pen/RwwxWrM?editors=1100).

```scss
$color-red: #FF0000;
$color-green: #00FF00;
$color-blue: #0000FF;

// colors from my Bear theme
$grayblue1: rgb(20, 28, 41)
$grayblue2: rgb(25, 33, 51)
$orangeyellow: rgb(240, 182, 82)
$gray: rgb(177, 176, 176)
$slateblue: rgb(82, 138, 157)
$almostblack: rgb(9, 12, 18)
$almostwhite: rgb(247, 247, 239)
```

### Background with Gradient

See a live demo [here](https://codepen.io/drmikeh/pen/wvvVZXy).

```css
background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
```

### A Sticky Footer with Flexbox

See a live demo [here](https://codepen.io/drmikeh/pen/YzZwvzy.)

```html
<body>
  <div class="content">
    content
  </div>
  <footer class="footer"></footer>
</body>
```

```css
html, body {
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1 0 auto;
}
.footer {
  flex-shrink: 0;
}
```

### Holy Grail Layout with Grid and Flexbox

For a live demo see [Holy Grail Layout with Grid and Flexbox](https://codepen.io/drmikeh/pen/BayBzLa?editors=1100)

Also see: [Holy Grail Layout with Grid and Flexbox with Cards](https://codepen.io/drmikeh/pen/GRgKmpy?editors=0100)

```css
/* for smaller screens we use flexbox */
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* for larger screens we use a grid */
@media (min-width: 600px) {
    .container {
        display: grid;
        grid-template-columns: 150px 1fr 150px;
        grid-template-rows: auto 1fr auto;
    }
}

header {
    grid-column: span 3;
    padding: 20px;
    text-align: center;
    font-size: 1rem;
    background-color: #369;
    color: white;
    display: flex; /* header is a container that uses flexbox */
}

header *:not(:last-child) {
    margin-right: 20px;
}

header > div:last-child {
    margin-left: auto;
}

main {
    flex: 1;
    padding: 20px;
}

nav {
    background-color: #f90;
    padding: 20px;
}

aside {
    padding: 20px;
    background-color: #f7e;
}

footer {
    grid-column: span 3;
    padding: 20px;
    text-align: center;
    font-size: 1.2rem;
    background-color: #6a3;
    color: white;
}
```

## Centering a Left-Justified Paragraph

This recipe centers a paragraph - the text is left-justified but the container `div` is centered.

A live demo is [here](https://codepen.io/drmikeh/pen/BaRZvJP).

```html
<section class="container">
  <h1>Our Title Is Centered</h1>
  <div class="description">
    <p class="left">We want this paragraph to be centered on the page but also left-justified. Let's see how to do it.</p>
  </div>
</section>
```

```css
body {
  text-align: center;
}

.container {
  margin: 0 auto;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-items: center;
  justifiy-content: center;
}
.description {
  width: 80%;
  margin: 0 auto;
}

.left {
  text-align: left;
}
```
