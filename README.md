# Star UI monorepo

[![Build Status](https://travis-ci.org/Star-UI/Star-UI.svg?branch=master)](https://travis-ci.org/Star-UI/Star-UI)

* **@star-ui/base** Base components

## Project management packages

* Global

  * [Yarn](https://yarnpkg.com/en/) - dependency manager

* Local

  * [Lerna](https://github.com/lerna/lerna) - monorepo management tool

## Usage

1.  Install global packages

```sh
npm i -g yarn
```

2.  Install dependencies

```sh
yarn run bootstrap
```

3.  Start script

```sh
cd packages/client
yarn run start
```

## Work with dependency

### Adding a dependency

Install <package> to <root>:

```sh
yarn add -W <package>[@version] [--dev]
```

Install <package> to <@root/module>:

```sh
lerna add <package>[@version] [--dev] --scope=<@root/module>
```
