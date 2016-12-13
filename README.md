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
standard-readme-linter-regex ./standard-readme-linter-regex/README.MD -r standard-readme-linter-regex -p RichardLitt
```

### Options

```
--project, -p The overarching project or GitHub owner
--repo, -r    The name of the repository
--config, -c  The name a config file
```

### Alias

This package is aliased as `srlr`.

### Configuration

You can also use an external configuration file to define extra regexps. For instance:

```sh
srlr README.MD -c ../srlr-options.json
```

```json
{
  "includes": {
    "betterBadge": "[![](https://img.shields.io/badge/project-standard-readme-blue.svg?style=flat-square)](http://github.com/RichardLitt/standard-readme)",
  },
  "excludes": {
    "noTODO": "(TODO|TBD)",
  },
  "override": [
    "standardReadmeBadge"
  ]
}
```

## Maintainers

[@RichardLitt](https://github.com/RichardLitt).

## Contribute

Please do! Check out [the issues](https://github.com/RichardLitt/standard-readme-linter-regex/issues).

## License

[MIT](LICENSE) © 2016 Richard Littauer
