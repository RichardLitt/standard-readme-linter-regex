/* global describe, it */
const assert = require('assert')
const validate = require('./validate.js')

const input = `# standard-linter
`

// TODO Add Unit tests
//
// Current options:
// {
//   README: true,
//   markdown: true,
//   title: null,
//   titleAtStart: null,
//   standardReadmeLink: null,
//   standardReadmeBadge: null,
//   toc: null,
//   install: null,
//   usage: null,
//   contribute: null,
//   issuesLink: null,
//   contributorsLink: null,
//   coc: null,
//   cocLink: null,
//   maintainers: null,
//   license: null,
//   noTBD: true,
//   noTODO: true
// }

describe('validate file', () => {
  it('reads some file', function() {
    const data = validate(input, './standard-linter/README.md', 'none')
    assert(data !== null, "File should exist.")
  })

  it('wants it to be called README', function() {
    const data = validate(input, './standard-linter/README.md', 'none')
    assert.equal(data.README, true)
  })

  it('wants it to not be called REAMDE', function() {
    const data = validate(input, './standard-linter/REAMDE.md', 'none')
    assert.equal(data.README, false)
  })

  it('needs a markdown format', function() {
    const data = validate(input, './standard-linter/REAMDE.md', 'none')
    assert.equal(data.markdown, true)
  })

  it('only accepts .md', function() {
    const data = validate(input, './standard-linter/REAMDE.markdown', 'none')
    assert.equal(data.markdown, false)
  })

  it('accepts no other file types', function() {
    const data = validate(input, './standard-linter/REAMDE.txt', 'none')
    assert.equal(data.markdown, false)
  })

  it('checks the code of conduct link', () => {
    input = '[Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md)'
    const data = validate(input, 'README.md')
    assert.equal(data.cocLink, true)
  })
})
