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

if (process.argv[2]) {
  checkFileContents(process.argv[2], cli.flags)
}
