# standard-readme-linter-regex

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> A dumb regex linter for standard-readme

This is a linter that only checks by searching your document for string matches. It does not check for these matches based on what section they're in, which is why it is called a dumb checker. 

## Table of Contents

- [Install](#install)
- [Usage](#usage)
	- [Options](#options)
	- [Alias](#alias)
	- [Configuration](#configuration)
- [Checks](#checks)
- [Examples](#examples)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Install

```sh
npm i -g standard-readme-linter-regex
```

## Usage

```sh
standard-readme-linter-regex README.MD -c /Users/richard/src/standard-readme-linter-regex/config.js -r standard-readme-linter-regex -p richardlitt -n RichardLitt -l https://burntfen.com
```

### Options

```
--project, -p The overarching project
--repo, -r The name of the repository
--config, -c The full path to a config js file to require
--projectName The name of the project
--projectLink The link to the project's main page
```

### Alias

This package is aliased as `srlr`.

### Configuration

You can also use an external configuration file to define extra RegExps to check. For instance:

```sh
srlr README.MD -c /Users/richard/src/standard-readme-linter-regex/example-config.js
```

See the [example config file](example-config.js) for an example.

Note: **These will override existing checks.**

## Checks

#### README

Is the filename `README`?

#### markdown

Is it a Markdown file, ending in `.md`?

#### project

Who is the GitHub organization or profile to whom this repository belongs? What is the project? 

Note: _This is used in the link checking. It will automatically default to the parent folder's name if no project is provided through the CLI._

#### repo

Does the title matches the folder name and is it prefixed with `#`?

#### titleAtStart

Does the title start the README?

#### standardReadmeBadge

Is the standard-readme badge present?

#### install

Is there an install section?

#### usage

Is there an usage section?

#### maintainers

Is there an maintainers section?

#### contribute

Is there a contribute section?

#### issuesLink

Is there a link to the GitHub issues?

Note: _This uses the `project` setting._

#### license

Is there a license  section?

#### codeRepo

Is this a repository holding code? Or is there a string that says: `This repository is only for documents.`?

#### mitLicense

Is there an MIT license, formatted as `[MIT](LICENSE)`?

Note: _This does not appear if `codeRepo` is `true`.

#### ccLicense

Is there a `CC-BY` string? 

Note: _This appears if `codeRepo` is `true`.

#### copyright

Is there a `©` symbol?

#### copyrightYear

Is the year after the copyright symbol?

#### copyrightName

Is there a copyright name?

## Examples

```sh
~/src/RichardLitt/standard-readme-linter-regex $ srlr README.md
README:true
markdown:true
project:RichardLitt
repo:true
titleAtStart:true
standardReadmeBadge:false
install:true
usage:true
maintainers:true
contribute:true
issuesLink:false
license:true
codeRepo:false # Note: This is dumb, and matches the string in the example above.
ccLicense:true # mitLicense disabled for non-code Repos. Same error with matching.
mitLicense:true
copyright:true
copyrightYear:true
copyrightName:true
```

## Maintainers

[@RichardLitt](https://github.com/RichardLitt).

## Contribute

Please do! Check out [the issues](https://github.com/RichardLitt/standard-readme-linter-regex/issues).

## License

[MIT](LICENSE) © 2016 Richard Littauer
