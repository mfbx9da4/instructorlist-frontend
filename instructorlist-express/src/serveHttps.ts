import { readFileSync } from 'fs'
import https from 'https'
import { Express } from 'express'

function getCredentials(): { key: string; cert: string } {
  const privateKey = readFileSync('sslcert/server.key', 'utf8')
  const certificate = readFileSync('sslcert/server.crt', 'utf8')
  var credentials = { key: privateKey, cert: certificate }
  return credentials
}

export function serveHttps(app: Express) {
  if (process.env.NODE_ENV !== 'production') {
    const httpsServer = https.createServer(getCredentials(), app)
    httpsServer.listen(443, () => console.log(`🐎 https://localhost`))
  }
}
