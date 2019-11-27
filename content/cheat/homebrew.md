---
title: Homebrew
description: Cheat sheet for the Homebrew package manager for MacOS.
reviewed: false
toc: true
related: true
categories:
    - 'CLI'
tags:
    - 'CLI'
    - 'Homebrew'
    - 'MacOS'
---

The missing package manager for macOS (or Linux).

<!--more-->

### Commands

| Command                    | Description                |
| -------------------------- | -------------------------- |
| `brew install git`         | Install a package          |
| `brew upgrade git`         | Upgrade a package          |
| ---                        | ---                        |
| `brew unlink git`          | Unlink                     |
| `brew link git`            | Link                       |
| `brew switch git 2.5.0`    | Change versions            |
| ---                        | ---                        |
| `brew list --versions git` | See what versions you have |

### More package commands

| Command            | Description                 |
| ------------------ | --------------------------- |
| `brew info git`    | List versions, caveats, etc |
| `brew cleanup git` | Remove old versions         |
| `brew edit git`    | Edit this formula           |
| `brew cat git`     | Print this formula          |
| `brew home git`    | Open homepage               |

### Global commands

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `brew update`   | Update brew and cask                     |
| `brew list`     | List installed                           |
| `brew outdated` | What's due for upgrades?                 |
| `brew doctor`   | Check your system for potential problems |

### Brew Cask commands

| Command                     | Description                 |
| --------------------------- | --------------------------- |
| `brew cask install firefox` | Install the Firefox browser |
| `brew cask list`            | List installed applications |

Cask commands are used for interacting with graphical applications.

## Also see

-   [Homebrew homepage](https://brew.sh/) _brew.sh_
-   [Homebrew docs](https://docs.brew.sh) _docs.brew.sh_