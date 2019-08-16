import criticalCssPlugin from 'preact-cli-plugin-critical-css'
const { InjectManifest } = require('workbox-webpack-plugin')
const path = require('path')

export default (config, env) => {
  const options = {
    // Passed directly to the 'critical' module (this is optional)
  }

  criticalCssPlugin(config, env, options)

  // Workbox
  const swName = 'service-worker.js'
  const swPath = path.join('src', swName)
  config.plugins.push(
    new InjectManifest({
      swSrc: swPath,
      swDest: swName,
      globPatterns: ['offline.html', 'shell.html'],
    }),
  )
}
