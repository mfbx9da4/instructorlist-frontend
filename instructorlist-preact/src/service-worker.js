console.log('Service worker called with debug')

// Register for precache
workbox.precaching.precacheAndRoute(self.__precacheManifest)

// Fallback unkown route to index.html (ie PWA)
workbox.routing.registerNavigationRoute('/shell/index.html', {
  ignoreSearch: true,
})

// Serve amp libs from cache - get from network for latest version in background
workbox.routing.registerRoute(
  /(.*)cdn\.ampproject\.org(.*)/,
  workbox.strategies.staleWhileRevalidate(),
)
