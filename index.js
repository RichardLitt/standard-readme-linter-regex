const fs = require('graceful-fs')
const colors = require('colors')
const validate = require('./validate')

function printObject (obj) {
  for (var key in obj) {
    var keyColor = (obj[key]) ? `${!!(obj[key])}`.green : `${!!(obj[key])}`.red
    console.log(`${key}:`.blue + keyColor)
  }
}

function checkFileContents (input, project, actualTitle) {
  var stream = fs.createReadStream(input)
  stream.on('data', function (data) {
    printObject(validate(data, stream.path, project, actualTitle))
  })
  stream.on('error', function (err) {
    if (err) {
      console.log(err)
    }
  })
  stream.on('close', function (err) {
    if (err) {
      console.log(err)
    }
  })
}

module.exports = {
  checkFileContents: checkFileContents
}
