# standard-readme-linter-regex

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> A dumb regex linter for standard-readme

## Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [Options](#options)
  - [Alias](#alias)
  - [Configuration](#configuration)
- [Contribute](#contribute)
- [License](#license)

## Install

```sh
npm i -g standard-readme-linter-regex
```

## Usage

```sh
standard-readme-linter-regex README.MD -c config.js -r standard-readme-linter-regex -p richardlitt -n RichardLitt -l https://burntfen.com
```

### Options

```
--project, -p The overarching project
--repo, -r The name of the repository
--config, -c The path to a config js file to require
--projectName The name of the project
--projectLink The link to the project's main page
```

### Alias

This package is aliased as `srlr`.

### Configuration

You can also use an external configuration file to define extra regexps. For instance:

```sh
srlr README.MD -c example-config.js
```

See the [example config file](example-config.js) for an example.

## Maintainers

[@RichardLitt](https://github.com/RichardLitt).

## Contribute

Please do! Check out [the issues](https://github.com/RichardLitt/standard-readme-linter-regex/issues).

## License

[MIT](LICENSE) © 2016 Richard Littauer
