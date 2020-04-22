---
title: Docker Cheatsheet
description: Cheat sheet for Docker CLI Commands
reviewed: false
toc: true
related: true
categories:
    - 'docker'
tags:
    - 'docker'
    - 'containers'
    - 'cloud'
    - 'virtualization'
---

Cheat sheet for Docker CLI Commands

<!--more-->

### General Commands

```shell
docker --help                       # list all docker commands
docker <command> --help             # show help for a specific command
docker info                         # show system information
docker system prune -a              # stop and remove all containers and remove all images
```

### Docker Images

```shell
docker images                       # list all installed images
docker image ls                     # list all installed images
docker pull <image>                 # pull an image from a docker registry
docker push <image>                 # push an image to a docker registry
docker rmi <image>                  # remove an image
docker history <image>              # show image layers
docker inspect <image>              # show lots of detailed information about an image
```

### Docker Builds

```shell
docker build -t <image name> .      # build and tag an image using current directory as the build context
```


### Docker Containers

```shell
docker ps                                                         # list all running containers
docker ps -a                                                      # list all containers (running or stopped)
docker create --name <container_name> -p 8080:80 <image>          # create a container with port mapping
docker start [-i | -d] <container_name>                           # start a container
docker restart <container_name>                                   # restart a container
docker run --name <container_name> [-i | -d] -p 8080:80 <image>   # create and start a container with port mapping
docker attach <container>                                         # Attach stdin/stdout/stderr streams to a running container
docker exec <container> <command>                                 # Run a command in a running container
docker exec <container> -it bash                                  # Create a bash process inside the container and connect it to the terminal
docker container stats --no-stream <container>                    # Display a live stream of container(s) resource usage statistics
```

### Running Docker Commands to access a Remote Docker Host

```shell
DOCKER_HOST=<hostname | ip> docker <command>
```
