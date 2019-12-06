---
title: Pivotal Concourse
description: Cheat sheet for Pivotal Concourse
reviewed: false
toc: true
related: true
categories:
    - 'cloud'
tags:
    - 'pivotal'
    - 'concourse'
    - 'fly'
    - 'cloud'
    - 'ci/cd'
---

Pivotal Concourse is a CI/CD tool.

<!--more-->

### fly commands

| Action                                                 | Command                                                                |
| ------------------------------------------------------ | ---------------------------------------------------------------------- |
| Get help                                               | `fly -h` or `fly command -h`                                           |
| Login and specify target                               | `fly -t myTarget login --concourse-url url-of-my-concourse-server`     |
| List saved targets                                     | `fly targets`                                                          |
| Download and replace the current fly from the target   | `fly -t myTarget sync`                                                 |
| See your saved targets                                 | `cat ~/.flyrc`                                                         |
| Execute a task                                         | `fly -t myTarget e -c hello_world.yml`                                 |
| Set Pipeline (pushes the pipeline.yml file)            | `fly -t myTarget sp -c pipeline.yml -p myPipeline -l myParameters.yml` |
| Unpause Pipeline                                       | `fly -t myTarget up -p myPipeline`                                     |
| Pause Pipeline                                         | `fly -t myTarget pp -p myPipeline`                                     |
| View the results of recent builds across all pipelines | `fly -t myTarget builds`                                               |
| View the results of a previous build                   | `fly -t myTarget watch --build build_number`                           |
| Manually trigger a job                                 | `fly -t myTarget tj -j myPipeline/jobName -w`                          |
| Destroy Pipeline                                       | `fly -t myTarget dp -p myPipeline`                                     |
