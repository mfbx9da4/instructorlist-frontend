import criticalCssPlugin from 'preact-cli-plugin-critical-css'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import { GenerateSW } from 'workbox-webpack-plugin'
import asyncPlugin from 'preact-cli-plugin-async'
import path from 'path'

function isSSRBundle() {
  return config.output.filename === 'ssr-bundle.js'
}

export default (config, env, helpers) => {
  console.log('config', config.output)
  asyncPlugin(config)

  // Remove Critical CSS plugin
  criticalCssPlugin(config, env, {})

  // // CaseSensitivePathsPlugin
  config.plugins.unshift(new CaseSensitivePathsPlugin())

  // // Remove SWPrecache
  const swPrecache = helpers.getPluginsByName(config, 'SWPrecacheWebpackPlugin')
  if (swPrecache[0]) {
    console.log('REMOVED_SWPRECACHE')
    config.plugins.splice(swPrecache[0].index, 1)
  }

  // // Workbox
  console.log('ADDED_WORKBOX')
  config.plugins.push(
    new GenerateSW({
      swDest: 'service-worker.js',
      // You can take control of uncontrolled clients by calling clients.claim()
      // within your service worker once it's activated.
      clientsClaim: true,
      // Only cache PWA version. Excludes pre-rendered AMP pages
      exclude: [/^(?!shell).*index\.html$/],
      // PWA routing ie single page app
      navigateFallback: '/shell/index.html',
      navigateFallbackBlacklist: [
        /*\.js.*/
      ],
    }),
  )
}
