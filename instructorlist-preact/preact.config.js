import webpack from 'webpack'
import criticalCssPlugin from 'preact-cli-plugin-critical-css'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import { GenerateSW } from 'workbox-webpack-plugin'
import asyncPlugin from 'preact-cli-plugin-async'
import path from 'path'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

function isSSRBundle() {
  return config.output.filename === 'ssr-bundle.js'
}

export default (config, env, helpers) => {
  let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0]
  let babelConfig = rule.options

  console.log('babelConfig.plugins', babelConfig.plugins)
  babelConfig.plugins.push(
    [
      '@quickbaseoss/babel-plugin-styled-components-css-namespace',
      { cssNamespace: '.landing-page' },
    ],
    'styled-components',
  )

  config.plugins.push(new BundleAnalyzerPlugin())

  // asyncPlugin(config)
  // // Remove Critical CSS plugin
  // criticalCssPlugin(config, env, {})
  // CaseSensitivePathsPlugin
  // config.plugins.unshift(new CaseSensitivePathsPlugin())
  // // // Remove SWPrecache
  // const swPrecache = helpers.getPluginsByName(config, 'SWPrecacheWebpackPlugin')
  // if (swPrecache[0]) {
  //   config.plugins.splice(swPrecache[0].index, 1)
  // }
  // new webpack.DefinePlugin({
  //   ADD_SW: JSON.stringify(false),
  // })
  // // // Workbox
  // config.plugins.push(
  //   new GenerateSW({
  //     swDest: 'sw.js',
  //     // You can take control of uncontrolled clients by calling clients.claim()
  //     // within your service worker once it's activated.
  //     clientsClaim: true,
  //     // Only cache PWA version. Excludes pre-rendered AMP pages
  //     exclude: [/^(?!shell).*index\.html$/],
  //     // PWA routing ie single page app
  //     navigateFallback: '/shell/index.html',
  //     navigateFallbackBlacklist: [
  //       /*\.js.*/
  //     ],
  //   }),
  // )
}
