'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')
const https = require('https')

const app = express()
const httpsServer = https.createServer({
  key: fs.readFileSync('ssl/dev/server.key', 'utf8'),
  cert: fs.readFileSync('ssl/dev/server.crt', 'utf8')
}, app)

app.use(
  '/bower_components',
  express.static(path.resolve(__dirname, '../bower_components'))
)
app.use('/', express.static(path.resolve(__dirname, '../')))
app.get('/', async (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../ui/index.html'))
})

app.set('port', (process.env.PORT || 5015))

httpsServer.listen(app.get('port'), () => {
  console.log('Success! HTTPS listening on:', app.get('port'))
})
