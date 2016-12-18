/* eslint-disable no-control-regex */
const escapeRegExp = require('escape-string-regexp')
// const ghDescription = require('gh-description')

// function validateFile (data, opts) {
//   opts = opts || {}
//   // TODO Refactor the validators that check file name and place here.

// }

module.exports = function validate (data, path, opts) {
  opts = opts || {}
  const check = {}

  const pathArr = path.split('/')
  const repo = pathArr[pathArr.length - 2] || opts.repo
  // Is called README
  check.README = (pathArr[pathArr.length - 1].split('.')[0] === 'README')
  // Is a markdown file with .md ending only
  check.markdown = (pathArr[pathArr.length - 1].split('.')[1] === 'md')

  check.project = opts.project || pathArr[pathArr.length - 3]

  var currentDir = new RegExp(`(# (${repo}|.* \\(${repo}\\))|(${repo}|.* \\(${repo}\\))\n===)`, 'i')

  // The title matches the folder name and is prefixed with #
  check.repo = ('' + data).match(currentDir)
  // The title starts at the beginning of the document
  check.titleAtStart = (('' + data).match(currentDir) && ('' + data).match(currentDir).index === 0)
  // There is a standard readme link somewhere TODO near the end

  // Badges
  check.standardReadmeBadge = ('' + data).match(escapeRegExp('[![](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)'))

  // TOC
  if (('' + data).match(new RegExp('\n', 'g')) && ('' + data).match(new RegExp('\n', 'g')).length >= 100) {
    check.toc = ('' + data).match('## Table of Contents')
  }
  check.install = ('' + data).match('## Install')
  check.usage = ('' + data).match('## Usage')
  check.maintainers = ('' + data).match('## Maintainers')
  check.contribute = ('' + data).match('## Contribute')
  check.issuesLink = ('' + data).match(new RegExp(escapeRegExp(`https://github.com/${check.project}/${repo}/issues`), 'g'))
  check.license = ('' + data).match('## License')
  check.codeRepo = !('' + data).match('This repository is only for documents.')
  if (!check.codeRepo) {
    check.ccLicense = ('' + data).match('CC-BY')
    delete check.install
    delete check.usage
  } else {
    check.mitLicense = ('' + data).match(new RegExp(escapeRegExp('[MIT](LICENSE)')))
  }
  check.copyright = ('' + data).match('©')
  check.copyrightYear = ('' + data).match('© [0-9\-]+')
  check.copyrightName = ('' + data).match('© [0-9\-a-zA-Z\.,\\[\\] ]+')

  if (opts.config) {
    for (var key in opts.config.override) {
      delete check[opts.config.override[key]]
    }
    for (key in opts.config.includes) {
      string = opts.config.includes[key].string
      string = (opts.config.includes[key].escape) ? escapeRegExp(string) : string
      check[key] = ('' + data).match(new RegExp(`${string}`, `${opts.config.includes[key].flags}`))
    }
    for (key in opts.config.excludes) {
      string = opts.config.excludes[key].string
      string = (opts.config.excludes[key].escape) ? escapeRegExp(string) : string
      check[key] = !('' + data).match(new RegExp(`${string}`, `${opts.config.excludes[key].flags}`))
    }
  }

  return check

  // TODO Figure out async things
  //
  // return ghDescription(`${opts.project}/${title}`).then((desc) => {
  //   opts.description = ('' + data).match(new RegExp('> ' + desc.description, "g"))
  // })
}
