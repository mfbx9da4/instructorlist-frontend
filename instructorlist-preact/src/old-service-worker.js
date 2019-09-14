console.log('Service worker called with debug')

workbox.setConfig({
  debug: true,
})

// Only cache the shell html. ie don't cache AMP pages
let precacheManifest = self.__precacheManifest.filter(
  x =>
    x.url.indexOf('/shell/index.html') === 0 ||
    x.url.indexOf('/index.html') === -1,
)

console.log('precacheManifest', precacheManifest)

// Register for precache
workbox.precaching.precacheAndRoute(precacheManifest)

workbox.routing.registerRoute(
  /(.*)service-worker\.js/,
  new workbox.strategies.NetworkOnly(),
)

// Fallback unkown route to index.html (ie PWA)
workbox.routing.registerNavigationRoute('/shell/index.html', {
  ignoreSearch: true,
})

// Serve amp libs from cache - get from network for latest version in background
workbox.routing.registerRoute(
  /(.*)cdn\.ampproject\.org(.*)/,
  workbox.strategies.staleWhileRevalidate(),
)
