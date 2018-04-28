# 🌟 Star UI

[![Build Status](https://travis-ci.org/Star-UI/Star-UI.svg?branch=master)](https://travis-ci.org/Star-UI/Star-UI)

* [**@star-ui/base** Base components](https://github.com/Star-UI/Star-UI/tree/master/packages/reset)
  ([demo](https://star-ui.github.io/Star-UI/))

## Get started

0.  Install global packages

```sh
npm i -g yarn lerna
```

1.  Install dependencies

```sh
yarn run bootstrap
```

2.  Start script

```sh
cd packages/client
yarn run start
```

## Project management

Used **[Lerna](https://github.com/lerna/lerna)** monorepo management tool with **[Yarn](https://yarnpkg.com/en/)**
dependecy manager

### Adding a dependency

Install <package> to <root>:

```sh
yarn add -W <package>[@version] [--dev]
```

Install <package> to <@root/module>:

```sh
lerna add <package>[@version] [--dev] --scope=<@root/module>
```

## Git config

* `LF` line ending (line feed, `\n`).

  For automatic correction you can do:

  ```sh
  git config --global core.autocrlf input
  ```
