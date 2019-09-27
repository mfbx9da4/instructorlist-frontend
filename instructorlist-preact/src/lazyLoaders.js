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
    addLink('https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.2/mapbox-gl.css')
    loading.mapbox = true
    await loadjs(
      'https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.2/mapbox-gl.js',
      { returnPromise: true },
    )
    loading.mapbox = false
    loaded.mapbox = true
  }
}
