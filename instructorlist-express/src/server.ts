import { timer } from './utils/timer'
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
import { getCriticalCssStyledComponents } from './getCriticalCssStyledComponents'
import 'isomorphic-fetch' // PolyFill Fetch for SSR
// @ts-ignore
import App from '../frontend-build-copy/ssr-build/ssr-bundle'
import { keepAlive } from './keepAlive'

const Version = 7
const criticalCssStyledComponents = getCriticalCssStyledComponents()
const compression = createCompression()
const BUILD_LOCATION = path.resolve('./frontend-build-copy')
const { PORT = 8686 } = process.env
const rgxAmpScripts = /<script id="start-amp-scripts"[^>]*>.*?(?=<script id="end-amp-scripts")/i
const rgxHeaderStyle = /<style amp-custom><\/style>/i
const rgxContent = /<div class="main-app"[^>]*>.*?(?=<script id="end-amp-content")/i
const home = readFileSync(`${BUILD_LOCATION}/index.html`, 'utf8')
const search = readFileSync(`${BUILD_LOCATION}/search/index.html`, 'utf8')
const shell = readFileSync(`${BUILD_LOCATION}/shell/index.html`, 'utf8')

console.log('InstructorListExpressVersion', Version)

function setHeaders(res: Response, file: string) {
  let cache =
    basename(file) === 'sw.js' || basename(file) === 'sw-esm.js'
      ? 'private,no-cache,no-store,must-revalidate'
      : 'public,max-age=31536000,immutable'
  console.log('Serve build file', basename(file))
  return res.setHeader('Cache-Control', cache) // don't cache service worker file
}

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
  let total = await timer(async () => {
    let ssrData = {}
    const url = req.url
    let matched = matchPage(url, App.pages)

    // Inject Data
    let injectDataTook = await timer(async () => {
      if (matched && matched.page.component.getInitialProps) {
        ssrData = await matched.page.component.getInitialProps(matched.match)
      }
    })
    console.log('injectDataTook', injectDataTook.took)

    let body = await render(h(App, { url, ssrData }))
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Cache-Control', 'public,max-age=86400')
    let out = template.replace(rgxContent, body)
    if (!isAmp) {
      out = out.replace(rgxAmpScripts, '')
    }
    out = out.replace(
      rgxHeaderStyle,
      `<style amp-custom ${criticalCssStyledComponents.substring(6)}`,
    )
    console.log('is AMP', url, out.indexOf('src="/bundle.') === -1)
    res.end(out)
  })
  console.log('total', total.took)
}

const app = express()
  .disable('x-powered-by')
  .use(compression)
  .use((req, res, next) => {
    next()
  })
  .get('/', ssr(home))
  .get('/search/', ssr(search))
  .get('/search/*', ssr(search))
  .get('/classes/', ssr(search))
  .get('/classes/:id', ssr(search))
  .get('/shell/index.html', ssr(shell, false))
  .use(serve(BUILD_LOCATION, { setHeaders }))
  .get('/:slug', ssr(search))
  .get('*', async (req, res) => {
    console.log('ERROR: should_not_be_here', req.url)
    res.setHeader('Content-Type', 'text/html')
    res.end(await ssr(home, false)(req, res))
  })

app.set('trust proxy', true)

const httpServer = http.createServer(app)
httpServer.listen(PORT, () => console.log(`🎠 http://localhost:${PORT}`))
keepAlive()
