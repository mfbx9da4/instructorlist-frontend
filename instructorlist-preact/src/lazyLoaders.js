import loadjs from 'loadjs'

const addLink = function(url) {
  const link = document.createElement('link')
  link.src = url
  link.rel = 'stylesheet'
  link.type = 'text/css' // no need for HTML5
  document.getElementsByTagName('head')[0].appendChild(link) // for IE6
}

const loading = {
  mapbox: false,
}

const loaded = {
  mapbox: false,
}

export async function loadMapBox() {
  if (!loading.mapbox && !loaded.mapbox) {
    // addLink('/assets/mapbox-gl-js/v1.3.2/mapbox-gl.css')
    addLink(
      'https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/1.4.1/mapbox-gl.css',
    )
    loading.mapbox = true
    await loadjs(
      // '/assets/mapbox-gl-js/v1.3.2/mapbox-gl.js',
      'https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/1.4.1/mapbox-gl.js',
      {
        returnPromise: true,
      },
    )
    loading.mapbox = false
    loaded.mapbox = true
  }
}
