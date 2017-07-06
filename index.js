process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT']
const child = require('child_process')
const fs = require('fs')
const https = require('https')

exports.handler = (event, context, callback) => {
  console.log(event)
  const basepath = event.path

  const url = 'https://www.gov.uk/api/content' + basepath
  console.log(url)

  const req = https.get(url, (res) => {
    console.log(`STATUS: ${res.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
    let rawData = ''
    res.setEncoding('utf8')
    res.on('data', (chunk) => { rawData += chunk })
    res.on('end', () => {
      console.log('No more data in response.')

      var title = "GOV.UK"
      try {
        const contentItem = JSON.parse(rawData)
        title = contentItem.title
      }
      catch (e) {
        console.log('Error parsing JSON')
      }

      render(title, callback)
    })
  })

  req.end()
}

function render (title, callback) {
  var length = title.length
  var pointsize = 88

  if (length > 42 && length <= 76) {
    pointsize = 65
  } else if (length > 76 && length <= 130) {
    pointsize = 46
  } else if (length > 130) {
    // TODO render default image - this title is too long
  }

  var convertChild = child.spawn('convert', ['-fill', 'white',
    '-background', 'transparent',
    '-font', 'GDSTransportBold.ttf',
    '-pointsize', pointsize,
    '-size', '1040x310',
    '-interline-spacing', '-10',
    'caption:' + title,
    '-gravity', 'North',
    'base.png',
    '+swap',
    '-geometry', '+0+80',
    '-composite',
    '/tmp/output.png'])

  convertChild.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString())
  })

  convertChild.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString())
  })

  convertChild.on('exit', function (code) {
    var error = (code !== 0)
    if (error) {
      console.error('child process exited with code ' + code.toString())
    } else {
      var filepath = '/tmp/output.png'
      fs.readFile(filepath, function (err, data) {
        if (err) {
          console.error('error reading tmp file')
          return
        }
        console.log('done')
        var base64data = Buffer.from(data).toString('base64')

        callback(null, {
          'statusCode': 200,
          'headers': { "Content-Type": "image/png" },
          'body': base64data,
          'isBase64Encoded': true
        })
      })
    }
  })
}
