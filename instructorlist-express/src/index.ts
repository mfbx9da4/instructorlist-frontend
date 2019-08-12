import serve from 'serve-static'
import express from 'express'
import { h } from 'preact'
import { basename } from 'path'
import { readFileSync } from 'fs'
import createCompression from 'compression'
import { render } from 'preact-render-to-string'
// @ts-ignore
import App from '../../instructorlist-preact/build/ssr-build/ssr-bundle'
import { Response } from 'express-serve-static-core'

const compression = createCompression()

const { PORT = 3000 } = process.env

const RGX = /<div id="app"[^>]*>.*?(?=<script)/i
const template = readFileSync(
  '../instructorlist-preact/build/index.html',
  'utf8',
)

function setHeaders(res: Response, file: string) {
  let cache =
    basename(file) === 'sw.js'
      ? 'private,no-cache'
      : 'public,max-age=31536000,immutable'
  return res.setHeader('Cache-Control', cache) // don't cache service worker file
}

express()
  .use(compression)
  .use(serve('../instructorlist-preact/build', { setHeaders }))
  .get('*', (req, res) => {
    console.log('here', req.url)
    let body = render(h(App, { url: req.url }))
    console.log('body', req.url, body)
    res.setHeader('Content-Type', 'text/html')
    res.end(template.replace(RGX, body))
  })
  .listen(PORT, () => {
    console.log(`🐎 Running on http://localhost:${PORT}`)
  })
