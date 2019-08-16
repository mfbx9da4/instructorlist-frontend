console.log('Service worker called with debug')

workbox.setConfig({
  debug: true,
})

// Fallback unkown route to index.html (ie PWA)
workbox.routing.registerNavigationRoute('/shell.html')

// Serve amp libs from cache - get from network for latest version in background
workbox.routing.registerRoute(
  /(.*)cdn\.ampproject\.org(.*)/,
  workbox.strategies.staleWhileRevalidate(),
)
