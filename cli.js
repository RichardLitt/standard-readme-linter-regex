#!/usr/bin/env node

const checkFileContents = require('./index').checkFileContents
const meow = require('meow')
const fs = require('graceful-fs')
// const aliases = require('aliases')

const cli = meow([`
  Usage
    $ standard-readme-linter-regex <input>

  Options
    --project, -p The overarching project
    --repo, -r The name of the repository
    --config, -c The name a config file

  Examples
    $ standard-readme-linter-regex README.MD -p=RichardLitt --repo=my-project
`], {
  alias: {
    p: 'project',
    r: 'repo',
    c: 'config'
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
  fs.readFile(cli.flags.config, 'utf8', (err, data) => {
    if (err) {
      console.log('Could not read file')
    }

    cli.flags.config = JSON.parse(data)

    getFlagsFromDir(cli, (cli) => {
      checkFileContents(cli.input[0], cli.flags)
    })
  })
} else {
  getFlagsFromDir(cli, (cli) => {
    checkFileContents(cli.input[0], cli.flags)
  })
}
