---
title: regex
description: Cheat sheet for the regular expressesions
reviewed: false
toc: true
related: true
categories:
    - 'other'
tags:
    - 'regex'
    - 'javascript'
---

Regular Expressions are a powerful way to do pattern matching on strings.

<!--more-->

### Character classes

| Pattern  | Description                          |
| -------- | ------------------------------------ |
| `.`      | Any character, except newline        |
| `\w`     | Word                                 |
| `\d`     | Digit                                |
| `\s`     | Whitespace                           |
| `\W`     | Not word                             |
| `\D`     | Not digit                            |
| `\S`     | Not whitespace                       |
| `[abc]`  | Any of a, b, or c                    |
| `[a-e]`  | Characters between `a` and `e`       |
| `[1-9]`  | Digit between `1` and `9`            |
| `[^abc]` | Any character except `a`, `b` or `c` |

### Anchors

| Pattern | Description      |
| ------- | ---------------- |
| `^abc`  | Start with `abc` |
| `abc$`  | End with `abc`   |

### Escaped characters

| Pattern    | Description                            |
| ---------- | -------------------------------------- |
| `\. \* \\` | Escape special character used by regex |
| `\t`       | Tab                                    |
| `\n`       | Newline                                |
| `\r`       | Carriage return                        |

### Groups

| Pattern | Description   |
| ------- | ------------- |
| `(abc)` | Capture group |

### Quantifiers

| Pattern  | Description           |
| -------- | --------------------- |
| `a*`     | Match 0 or more       |
| `a+`     | Match 1 or more       |
| `a?`     | Match 0 or 1          |
| `a{5}`   | Match exactly 5       |
| `a{,3}`  | Match up to 3         |
| `a{3,}`  | Match 3 or more       |
| `a{1,3}` | Match between 1 and 3 |
