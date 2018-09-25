/* eslint-disable no-control-regex */
const escapeRegExp = require('escape-string-regexp')
const linguist = require('js-linguist')

module.exports = function validate (data, path, opts) {
  opts = opts || {}
  const check = {}
  const pathArr = path.split('/')
  const repo = pathArr[pathArr.length - 2] || opts.repo
  const project = opts.project || pathArr[pathArr.length - 3]
  const defaultBadges = [
    '[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)',
    '[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)',
    '[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)'
  ]


  return linguist({}, (langs) => {
    if (langs.Go && parseInt(langs.Go) >= 50) {
      console.log('Golang')

      `

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![GoDoc](https://godoc.org/github.com/ipfs/go-ipfs?status.svg)](https://godoc.org/github.com/ipfs/go-ipfs)
[![Build Status](https://travis-ci.org/ipfs/go-ipfs.svg?branch=master)](https://travis-ci.org/ipfs/go-ipfs)
`

    } else if (langs.JavaScript && parseInt(langs.JavaScript) >= 50) {
      console.log('Jarvascripts')
    }

    // Badges
    check.standardReadmeBadge = ('' + data).match(escapeRegExp('[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)'))

    return check
  })


  // TODO Figure out async things
  //
  // return ghDescription(`${opts.project}/${title}`).then((desc) => {
  //   opts.description = ('' + data).match(new RegExp('> ' + desc.description, "g"))
  // })
}
