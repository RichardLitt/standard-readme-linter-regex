#!/usr/bin/env node

const checkFileContents = require('./index').checkFileContents
const meow = require('meow')

const cli = meow([`
  Usage
    $ standard-readme-linter-regex <input>

  Options
    --project, -p The overarching project
    --repo, -r The name of the repository
    --config, -c The full path to a config js file to require
    --projectName The name of the project
    --projectLink The link to the project's main page

  Examples
    $ standard-readme-linter-regex README.MD -p=RichardLitt --repo=my-project
`], {
  alias: {
    p: 'project',
    r: 'repo',
    c: 'config',
    n: 'projectName',
    l: 'projectLink'
  }
})

function getFlagsFromDir (cli, cb) {
  var dir = process.cwd().split('/')
  if (cli.input[0]) {
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
    return cb(cli)
  }
}

if (cli.flags.config) {
  cli.flags.config = require(cli.flags.config)
}

getFlagsFromDir(cli, (cli) => {
  checkFileContents(cli.input[0], cli.flags)
})
