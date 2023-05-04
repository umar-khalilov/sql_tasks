## Description

SQL tasks from jsn ninjas

## Installation

You need install Docker: 23.0.1 and Docker Compose: v2.15.1 or latest version and type commands in CLI at the root directory of project. Also need Node.js 16-20 version and npm.

## Running the app

```bash
npm run docker:up
```

After the first launch of containers
you need to open a new terminal tab at the root directory.
Type command in terminal:

```bash
npm run up:migrations
```

If you want to down migration
you need type command in terminal:

```bash
npm run down:migrations
```

After migrations you need run seeds, so
you need type in terminal:

```bash
npm run up:seeds
```

## Stopping the app

For stop the project
Type command in terminal:

```bash
npm run docker:stop
```

## Downing the app

For downing containers and network the project
Type command in terminal:

```bash
npm run docker:down
```

## Removing the app

For remove all docker containers, images, networks, and volumes the project
Type command in terminal:

```bash
npm run docker:prune
```
