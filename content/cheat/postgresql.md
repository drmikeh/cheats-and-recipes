---
title: PostgreSQL Cheatsheet
description: Cheat sheet for PostgreSQL
reviewed: true
toc: true
related: true
categories:
    - 'database'
tags:
    - 'database'
    - 'PostgreSQL'
---

PostgreSQL is a relational database.

<!--more-->

### Shell Commands

```shell
createdb <dbname>                               # create a database
dropdb <dbname>                                 # delete a database
psql                                            # login to default database & default user
psql -d <dbname> -f <filename>                  # connect to the specified database and run a SQL script
psql -h <hostname> -U <username> -d <dbname>    # login to remote database
```

### psql Commands

| Command                                                        | Description                       |
| -------------------------------------------------------------- | --------------------------------- |
| `\l`                                                           | list all databases                |
| `\c <database>`                                                | connect to <database>             |
| `\d`                                                           | list all tables and other objects |
| `\dt`                                                          | list all tables                   |
| `\du`                                                          | list all users and their roles    |
| `\d <table_name>`                                              | list details about <table_name>   |
| `\h`                                                           | show help                         |
| `\q`                                                           | quit                              |
| `CREATE USER <username> with encrypted password 'my-password'` | create a user                     |
| `ALTER USER <username> SUPERUSER;`                             | make a user an admin user         |
| `CREATE DATABASE <username>;`                                  | create a database                 |
| `GRANT ALL PRIVILEGES ON DATABASE <dbname> TO <username>;`     | grant all privileges              |

## References

-   [Official PostgreSQL Website](https://www.postgresql.org/)
