---
title: Git Recipes
description: Recipes for using Git
reviewed: true
authorbox: true
toc: true
related: true
categories:
    - 'git'
tags:
    - 'git'
    - 'version control'
---

Recipes for using Git.

<!--more-->

### My Git Aliases

I have these in my `~/.gitconfig`:

```
co = checkout
diffs = diff --staged
g = log --graph --all --branches --decorate --pretty=format:'[%C(auto)%h%Creset][%C(cyan)%an %ar%Creset]%C(auto)%d%Creset %s %C(auto)%Creset'
gb = log --graph --all --simplify-by-decoration --pretty=format:'%C(auto)%d%Creset'
lg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative
ls = log --stat --all --decorate
unmerged = branch --no-merged master
unpushed = log --branches --not --remotes --no-walk --decorate --oneline
```

I have these in my `~/.alias` file:

```shell
alias homegit='export GITHUB_HOST=github.com'
alias workgit='export GITHUB_HOST=github.homedepot.com'
alias gchd='git config user.email michael_a_hopper@homedepot.com'
alias gcdrmike='git config user.email drmikeh@gmail.com'
alias gam='git add -A && git commit -am $1'
alias gl='git changelog -l'
alias ga='git add -A'
alias gc='git commit'
alias gcm='git commit -m $1'
alias gs='git status'
alias gg='git g'
alias gd='git diff'
alias gds='git diffs'
alias gb='git branch -a'
alias gi='git remote show origin'
alias gr='git remote -v'
alias gpum='git pull upstream master'
```

### Git Extras

I use some of the commands available from [git-extras](https://github.com/tj/git-extras). You can instal `git-extras` with `homebrew`:

```shell
brew install git-extras
```

My favorite `git-extras` commands are:

```shell
git alias  # easily add an alias to the .gitconfig file
git ignore # easily add a line to the local .gitignore file
git info   # show detailed information about the repo
git authors # create the AUTHORS file
git back # Removes the latest commits, and add their changes to your staging area
git changelog # Generates a changelog from git tags and commit messages
git undo [n] # Remove the latest n commits (n defaults to 1)
git show-unmerged-branches # Show all branches not merged in to current HEAD
git standup [-d n] # Recall what you did for a given range of time
git obliterate # Completely remove a file from the repository, including past commits and tags
git local-commits # List all commits on the local branch that have not yet been sent to origin
git pr # Checks out a pull request from GitHub
git delta # Lists files that differ from another branch
```
