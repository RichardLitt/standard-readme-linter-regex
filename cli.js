#!/usr/bin/env node

const checkFileContents = require('./index').checkFileContents
const meow = require('meow')
// const aliases = require('aliases')

const cli = meow([`
  Usage
    $ standard-readme-linter-regex <input>

  Options
    --project, -p The overarching project
    --repo, -r The name of the repository

  Examples
    $ standard-readme-linter-regex README.MD -p=RichardLitt --repo=my-project
`], {
  alias: {
    p: 'project',
    r: 'repo'
  }
})

var dir = process.cwd().split('/')

if (process.argv[2]) {
  // TODO Figure out how to get the directory from the argument
  // Only use when in a directory with the README
  if (cli.input[0].split('/').length === 1) {
    if (!cli.flags.project) {
      cli.flags.project = dir[dir.length - 2]
    }
    if (!cli.flags.repo) {
      cli.flags.repo = dir[dir.length - 1]
    }
  }
  checkFileContents(process.argv[2], cli.flags)
}
