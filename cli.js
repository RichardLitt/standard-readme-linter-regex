const checkFileContents = require('./').checkFileContents

// TODO Use yargs or pony or something

if (process.argv[2]) {
  checkFileContents(process.argv[2], process.argv[3])
}
