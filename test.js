/* global describe, it */
const assert = require('assert')
const validate = require('./validate.js')

describe('validate file', () => {
  const input = `# standard-linter
  `

  it('reads some file', function () {
    const data = validate(input, './standard-linter/README.md')
    assert(data !== null, 'File should exist.')
  })

  it('wants it to be called README', function() {
    const data = validate(input, './standard-linter/README.md')
    assert.equal(data.README, true)
  })

  it('wants it to not be called REAMDE', function() {
    const data = validate(input, './standard-linter/REAMDE.md')
    assert.equal(data.README, false)
  })

  it('needs a markdown format', function() {
    const data = validate(input, './standard-linter/README.md')
    assert.equal(data.markdown, true)
  })

  it('only accepts .md', function() {
    const data = validate(input, './standard-linter/README.markdown')
    assert.equal(data.markdown, false)
  })

  it('accepts no other file types', function() {
    const data = validate(input, './standard-linter/README.txt')
    assert.equal(data.markdown, false)
  })
})

describe('validate license', () => {
  it('Checks for an MIT license', function () {
    const license = `# standard-linter

    [MIT](LICENSE) © 2017 Joe
    `
    const data = validate(license,  './standard-linter/README.md')
    assert(data.mitLicense[0] === '[MIT](LICENSE)', 'License exists.')
  })

  it('Allows valid file types for license', function () {
    const license = `# standard-linter

    [MIT](LICENSE.md) © 2017 Joe
    `
    const data = validate(license,  './standard-linter/README.md')
    assert(data.mitLicense !== null, 'License has a valid filetype.')
  })

  it('Disallows illegal file types for license', function () {
    const license = `# standard-linter

    [MIT](LICENSE.s) © 2017 Joe
    `
    const data = validate(license,  './standard-linter/README.md')
    assert(data.mitLicense === null, 'License is invalid filetype.')
  })

  it('Ignores case for license', function () {
    const license = `# standard-linter

    [MIT](license) © 2017 Joe
    `
    const data = validate(license,  './standard-linter/README.md')
    assert(data.mitLicense !== null, 'License is lowercase.')
  })
})