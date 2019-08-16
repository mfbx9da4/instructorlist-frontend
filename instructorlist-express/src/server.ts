import serve from 'serve-static'
import express, { Request, Response } from 'express'
import { h } from 'preact'
import { basename } from 'path'
import { readFileSync } from 'fs'
import createCompression from 'compression'
import { render } from 'preact-render-to-string'
// @ts-ignore
import App from '../../instructorlist-preact/build/ssr-build/ssr-bundle'
var http = require('http')
var https = require('https')

function getCredentials(): { key: string; cert: string } {
  const privateKey = readFileSync('sslcert/server.key', 'utf8')
  const certificate = readFileSync('sslcert/server.crt', 'utf8')
  var credentials = { key: privateKey, cert: certificate }
  return credentials
}

const compression = createCompression()
const BUILD_LOCATION = `../instructorlist-preact/build`

const { PORT = 3000 } = process.env

const RGX = /<div id="app"[^>]*>.*?(?=<script id="end-amp-content")/i
const home = readFileSync(`${BUILD_LOCATION}/index.html`, 'utf8')
const profile = readFileSync(`${BUILD_LOCATION}/profile/index.html`, 'utf8')

function setHeaders(res: Response, file: string) {
  let cache =
    basename(file) === 'service-worker.js'
      ? 'private,no-cache'
      : 'public,max-age=31536000,immutable'
  return res.setHeader('Cache-Control', cache) // don't cache service worker file
}

const ssr = (template: string) => (req: Request, res: Response) => {
  let body = render(h(App, { url: req.url }))
  res.setHeader('Content-Type', 'text/html')
  const out = template.replace(RGX, body)
  console.log('ssr', req.url, out.indexOf('src="/bundle.'))
  res.end(out)
}

const app = express()
  .use(compression)
  .get('/shell.html', (req, res) => {
    console.log('shell.html', home.indexOf('src="/bundle.'))
    res.setHeader('Content-Type', 'text/html')
    res.end(home)
  })
  .get('/', ssr(home))
  .get('/profile/', ssr(profile))
  .get('/profile/:user', ssr(profile))
  .use(serve(BUILD_LOCATION, { setHeaders }))
  .get('*', (req, res) => {
    console.log('ERROR: should_not_be_here', req.url)
    res.setHeader('Content-Type', 'text/html')
    res.end(home)
  })

app.set('trust proxy', true)

var httpServer = http.createServer(app)
httpServer.listen(PORT, () => console.log(`🎠 http://localhost:${PORT}`))
if (process.env.NODE_ENV !== 'production') {
  var httpsServer = https.createServer(getCredentials(), app)
  httpsServer.listen(443, () => console.log(`🐎 https://localhost`))
}
