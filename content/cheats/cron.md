---
title: Cron
description: Cheat sheet for cron
reviewed: false
toc: true
related: true
categories:
    - 'CLI'
tags:
    - 'CLI'
    - 'cron'
---

A time-based job scheduler in Unix-like computer operating systems.

<!--more-->

## Format

### Format

```
Min  Hour Day  Mon  Weekday
*    *    *    *    *  command to be executed
┬    ┬    ┬    ┬    ┬
│    │    │    │    └─  Weekday  (0=Sun .. 6=Sat)
│    │    │    └──────  Month    (1..12)
│    │    └───────────  Day      (1..31)
│    └────────────────  Hour     (0..23)
└─────────────────────  Minute   (0..59)
```

### Examples

| Example        | Description           |
| -------------- | --------------------- |
| `0 * * * *`    | every hour            |
| `*/15 * * * *` | every 15 mins         |
| `0 */2 * * *`  | every 2 hours         |
| `0 0 * * 0`    | every Sunday midnight |
| ---            | ---                   |
| `@reboot`      | every reboot          |

### Crontab

```bash
# Adding tasks easily
echo "@reboot echo hi" | crontab

# Open in editor
crontab -e

# List tasks
crontab -l [-u user]
```
