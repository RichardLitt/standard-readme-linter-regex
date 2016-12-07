const escapeRegExp = require('escape-string-regexp')
const ghDescription = require('gh-description')

module.exports = function validate (data, path, project, declTitle, check) {
    check = check || {}

    const pathArr = path.split('/')
    const title =  pathArr[pathArr.length -2]
    // Is called README
    check.README = (pathArr[pathArr.length - 1].split('.')[0] === 'README')
    // Is a markdown file with .md ending only
    check.markdown = (pathArr[pathArr.length - 1].split('.')[1] === 'md')

    var currentDir = new RegExp('# ' + title, "i")

    // The title matches the folder name and is prefixed with #
    check.title = ('' + data).match(currentDir)
    // The title starts at the beginning of the document
    check.titleAtStart = (('' + data).match(currentDir) && ('' + data).match(currentDir).index === 0)
    // There is a standard readme link somewhere TODO near the end

    // Title will mess the script up if it is wrong. This fixes that.
    if (check.title === false) {
      title = declTitle
    }

    // Badges
    check.standardReadmeLink = ('' + data).match('Small note: If editing the README')
    check.standardReadmeBadge = ('' + data).match(escapeRegExp('[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)'))

    // TOC
    check.toc = ('' + data).match('## Table of Contents')
    check.install = ('' + data).match('## Install')
    check.usage = ('' + data).match('## Usage')
    check.contribute = ('' + data).match('## Contribute')
    check.issuesLink = ('' + data).match(new RegExp(escapeRegExp(`https://github.com/${project}/${title}/issues`), 'g'))
    check.contributorsLink = ('' + data).match(new RegExp(escapeRegExp(`https://github.com/${project}/${project}/blob/master/contributing.md`), 'g'))
    check.coc = ('' + data).match(new RegExp(`Please be aware that all interactions related to ${project}`, 'g'))
    check.cocLink = ('' + data).match(new RegExp(escapeRegExp("[Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md)"), 'g'))
    check.maintainers = ('' + data).match('## Maintainers')
    check.license = ('' + data).match('## License')
    check.noTBD = !('' + data).match('TBD')
    check.noTODO = !('' + data).match('TODO')

    return check

    // TODO Figure out async things
    //
    // return ghDescription(`${project}/${title}`).then((desc) => {
    //   check.description = ('' + data).match(new RegExp('> ' + desc.description, "g"))
    // })
}
