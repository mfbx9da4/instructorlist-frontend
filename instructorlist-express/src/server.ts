import serve from 'serve-static'
import express, { Request, Response } from 'express'
import path from 'path'
import { h } from 'preact'
import { basename } from 'path'
import { readFileSync } from 'fs'
import createCompression from 'compression'
import { render } from 'preact-render-to-string'
import { exec } from './preact-router-clone'
import http from 'http'
import https from 'https'
// @ts-ignore
import App from '../frontend-build-copy/ssr-build/ssr-bundle'

// Polyfill Fetch for SSR
require('isomorphic-fetch')

const compression = createCompression()
const BUILD_LOCATION = path.resolve('./frontend-build-copy')

const { PORT = 80 } = process.env

const rgxAmpScripts = /<script id="start-amp-scripts"[^>]*>.*?(?=<script id="end-amp-scripts")/i
const rgxContent = /<div id="app"[^>]*>.*?(?=<script id="end-amp-content")/i
const home = readFileSync(`${BUILD_LOCATION}/index.html`, 'utf8')
const profile = readFileSync(`${BUILD_LOCATION}/profile/index.html`, 'utf8')
const search = readFileSync(`${BUILD_LOCATION}/search/index.html`, 'utf8')
const shell = readFileSync(`${BUILD_LOCATION}/shell/index.html`, 'utf8')

function getCredentials(): { key: string; cert: string } {
  const privateKey = readFileSync('sslcert/server.key', 'utf8')
  const certificate = readFileSync('sslcert/server.crt', 'utf8')
  var credentials = { key: privateKey, cert: certificate }
  return credentials
}

function setHeaders(res: Response, file: string) {
  let cache =
    basename(file) === 'service-worker.js'
      ? 'private,no-cache,no-store,must-revalidate,proxy-revalidate'
      : 'public,max-age=31536000,immutable'
  return res.setHeader('Cache-Control', cache) // don't cache service worker file
}

type PageType = {
  path: string
  component: {
    getInitialProps: ((arg0: unknown) => Promise<{}>) | undefined
  }
}

type PageMatch = { match: any; page: PageType }

function matchPage(url: string, pages: Array<PageType>): PageMatch | undefined {
  for (let page of pages) {
    const { path, component, ...rest } = page
    const match = exec(url, page.path, rest)
    if (match) {
      return { match, page }
    }
  }
}

const ssr = (template: string, isAmp: boolean = true) => async (
  req: Request,
  res: Response,
) => {
  console.log('template, isAmp', isAmp, template)
  let ssrData = {}
  const url = req.url
  let matched = matchPage(url, App.pages)
  if (matched) {
    let { match, page } = matched
    if (page.component.getInitialProps) {
      ssrData = await page.component.getInitialProps(match)
      console.log('ssrData', ssrData)
    }
  }
  let body = await render(h(App, { url, ssrData }))
  res.setHeader('Content-Type', 'text/html')
  console.log('template.indexOf', template.indexOf('src="/bundle.'))
  let out = template.replace(rgxContent, body)
  console.log('template.indexOf', out.indexOf('src="/bundle.'))
  if (!isAmp) {
    out.replace(rgxAmpScripts, '')
  }
  console.log('is AMP', url, out.indexOf('src="/bundle.'))
  res.end(out)
}

const app = express()
  .use(compression)
  .use((req, res, next) => {
    console.log('req.url', req.url)
    next()
  })
  .get('/', ssr(home))
  .get('/search/', ssr(search))
  .get('/shell/index.html', ssr(shell, false))
  .get('/profile/', ssr(profile))
  .get('/profile/:user', ssr(profile))
  .use(serve(BUILD_LOCATION, { setHeaders }))
  .get('*', (req, res) => {
    console.log('ERROR: should_not_be_here', req.url)
    res.setHeader('Content-Type', 'text/html')
    res.end(ssr(home, false)(req, res))
  })

app.set('trust proxy', true)

const httpServer = http.createServer(app)
httpServer.listen(PORT, () => console.log(`🎠 http://localhost:${PORT}`))
if (process.env.NODE_ENV !== 'production') {
  const httpsServer = https.createServer(getCredentials(), app)
  httpsServer.listen(443, () => console.log(`🐎 https://localhost`))
}

const oneMinute = 1000 * 60
setInterval(() => {
  fetch('https://instructorlist-django.herokuapp.com/api/')
  fetch(`https://instructorlist-frontend.herokuapp.com/`)
}, oneMinute * 4)
