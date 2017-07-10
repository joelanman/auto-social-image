const fs = require('fs')
const index = require('./index')

const outputPath = './output'
var path = process.argv[2]

if (!path) {
  path = 'register-to-vote'
}

var event = {
  path: '/' + path
}

var callback = function (error, response) {
  if (error) {
    console.error('error testing')
  }

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath)
  }

  const filename = path.replace(/\//g, '--')
  var base64Data = response.body
  fs.writeFileSync(`${outputPath}/${filename}.png`, base64Data, 'base64')
  console.log('done testing')
}

index.handler(event, null, callback)
