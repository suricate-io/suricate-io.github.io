---
layout: default
title: Installing Suricate
permalink: /installation/
redirect_from:
  - /installation.html
---

# <i class="fa fa-cloud-download"></i> Installing Suricate

## Backend application

1. Download and install [maven](https://maven.apache.org/download.cgi)
2. Run the following commands

```bash
### Under "suricate" folder
## Switch to backend project
$ cd backend

## Create the binary
$ mvn package

## Run project
# Default environment
$ java -jar ./target/monitoring.jar
# Dev environment
$ java -jar -Dspring.profiles.active=dev ./target/monitoring.jar
```

## Frontend application (using YARN)

1. Download and install [Yarn](https://yarnpkg.com/latest.msi) (this soft allow you to use NPM packages)
2. Run the following commands

```bash
### Under "suricate" folder
## Switch to frontend project
$ cd frontend

## import dependencies
$ yarn install

## Run the project
$ ng serve --open
```

The application is accessible on <http://localhost:4200/>  
If you have no access create a new account on the application.

## (deprecated) Frontend application (using NPM)

1. Download and install [NodeJs](https://nodejs.org/en/download/) (this soft allow you to use NPM packages)
2. Run the following commands

```bash
### Under "suricate" folder
## Switch to frontend project
$ cd frontend

## import dependencies
$ npm install

## Run the project
$ ng serve --open
```

The application is accessible on <http://localhost:4200/>  
If you have no access create a new account on the application.