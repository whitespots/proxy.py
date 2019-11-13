/*
    proxy.py
    ~~~~~~~~
    ⚡⚡⚡ Fast, Lightweight, Programmable, TLS interception capable
    proxy server for Application debugging, testing and development.

    :copyright: (c) 2013-present by Abhinav Singh and contributors.
    :license: BSD, see LICENSE for more details.
*/
import path = require('path')
import fs = require('fs')
const ncp = require('ncp').ncp

ncp.limit = 16

function setUpDevTools () {
  const destinationFolderPath = path.join(path.dirname(path.dirname(__dirname)), 'public', 'dashboard')

  const destinationFolderExists = fs.existsSync(destinationFolderPath)
  if (!destinationFolderExists) {
    console.error(destinationFolderPath + ' folder doesn\'t exist, make sure you are in the right directory.')
    process.exit(1)
  }

  const chromeDevTools = path.dirname(require.resolve('chrome-devtools-frontend/front_end/inspector.html'))

  console.log(chromeDevTools + ' ---> ' + destinationFolderPath)
  ncp(chromeDevTools, destinationFolderPath, (err: any) => {
    if (err) {
      return console.error(err)
    }
    console.log('Copy successful!!!')
  })
}

setUpDevTools()