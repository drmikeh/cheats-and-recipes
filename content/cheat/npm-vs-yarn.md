---
title: npm vs yarn Cheatsheet
description: Cheat sheet comparing npm and yarn
reviewed: false
toc: false
related: true
categories:
    - 'package managers'
tags:
    - 'npm'
    - 'yarn'
---

Compares npm and yarn commands.
Taken from [Infinite Red's NPM vs YARN Cheatsheet](https://infinite.red/files/yarn.pdf).

<!--more-->

| npm                         | yarn                 | description                                                     |
| --------------------------- | -------------------- | --------------------------------------------------------------- |
| npm init                    | yarn init            | Create a new package.json file                                  |
| npm install                 | yarn                 | Install is the default behavior                                 |
| npm install taco --save     | yarn add taco        | Add package to package.json                                     |
| npm uninstall taco --save   | yarn remove taco     | Remove package from package.json                                |
| npm install taco --save-dev | yarn add taco --dev  | Add package to package.json as a dev dependency                 |
| npm update --save           | yarn upgrade         | Upgrade to newest versions of packages                          |
| npm install taco --global   | yarn global add taco | Install a package globally                                      |
| npm link                    | yarn link            | Links a project for local testing                               |
| npm outdated                | yarn outdated        | List the outdated dependencies                                  |
| npm publish                 | yarn publish         | Publish a package to a repository                               |
| npm run                     | yarn run             | Run a script from package.json                                  |
| npm cache clean             | yarn cache clean     | Clean the local cache                                           |
| npm login                   | yarn login           | login to a repository                                           |
| npm logout                  | yarn logout          | logout to a repository                                          |
| np test                     | yarn test            | run unit tests                                                  |
| no equivalent               | yarn why taco        | Explain why taco package is installed (transitive dependencies) |


