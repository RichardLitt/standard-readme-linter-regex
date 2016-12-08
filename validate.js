const escapeRegExp = require('escape-string-regexp')
const ghDescription = require('gh-description')

function validateFile (data, path, project, declTitle, opts) {
  opts = opts || {}
  // TODO Refactor the validators that check file name and place here.

}

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

  var currentDir = new RegExp('# ' + repo, 'i')

  // The title matches the folder name and is prefixed with #
  check.repo = ('' + data).match(currentDir)
  // The title starts at the beginning of the document
  check.titleAtStart = (('' + data).match(currentDir) && ('' + data).match(currentDir).index === 0)
  // There is a standard readme link somewhere TODO near the end

  // Badges
  check.standardReadmeLink = ('' + data).match('Small note: If editing the README')
  // check.standardReadmeBadge = ('' + data).match(escapeRegExp('[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)'))

  // TOC
  check.toc = ('' + data).match('## Table of Contents')
  check.install = ('' + data).match('## Install')
  check.usage = ('' + data).match('## Usage')
  check.maintainers = ('' + data).match('## Maintainers')
  check.contribute = ('' + data).match('## Contribute')
  check.issuesLink = ('' + data).match(new RegExp(escapeRegExp(`https://github.com/${check.project}/${repo}/issues`), 'g'))
  check.contributorsLink = ('' + data).match(new RegExp(escapeRegExp(`https://github.com/${check.project}/${check.project}/blob/master/contributing.md`), 'g'))
  check.coc = ('' + data).match(new RegExp(`Please be aware that all interactions related to ${check.project}`, 'gi'))
  check.cocLink = ('' + data).match(new RegExp(escapeRegExp('[Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md)'), 'g'))
  check.license = ('' + data).match('## License')
  check.documentRepo = ('' + data).match('This repository is only for documents.')
  if (check.documentRepo) {
    check.ccLicense = ('' + data).match('CC-BY')
  } else {
    check.mitLicense = ('' + data).match(newRegexp(escapeRegExp('[MIT](LICENSE)')))
  }
  check.copyright = ('' + data).match('©')
  check.copyrightYearAndName = ('' + data).match('© [0-9]+ [a-zA-Z\., ]+')
  check.noTBD = !('' + data).match('TBD')
  check.noTODO = !('' + data).match('TODO')

  return check

  // TODO Figure out async things
  //
  // return ghDescription(`${opts.project}/${title}`).then((desc) => {
  //   opts.description = ('' + data).match(new RegExp('> ' + desc.description, "g"))
  // })
}
