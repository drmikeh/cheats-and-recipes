---
title: Pivotal Cloud Foundry
description: Cheat sheet for Pivotal Cloud Foundry
reviewed: false
toc: true
related: true
categories:
    - 'cloud'
tags:
    - 'pivotal cloud foundry'
    - 'pcf'
    - 'cloud'
---

PCF is a application PaaS (Platform as a Service) cloud platform.

<!--more-->

| Action                      | Command                                                                             |
| --------------------------- | ----------------------------------------------------------------------------------- |
| Get help                    | `cf -h` or `cf command -h`                                                          |
| Login and specify target    | `cf login -a https://api.run-np.homedepot.com -u ldap_id -o org_name -s space_name` |
| List organizations          | `cf [orgs | o]`                                                                     |
| Create a new org            | `cf co org_name`                                                                    |
| Create a new space          | `cf create-space org_name`                                                          |
| Show list of buildpacks     | `cf buildpacks`                                                                     |
| Deploy an app               | `cf push`                                                                           |
| Restart an app              | `cf restage`                                                                        |
| See what apps are running   | `cf [apps | a]`                                                                     |
| Show environment variables  | `cf env [app_name]`                                                                 |
| Show the recent log entries | `cf logs app_name -recent`                                                          |
