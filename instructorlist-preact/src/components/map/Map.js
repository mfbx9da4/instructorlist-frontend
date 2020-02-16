import { h, Component, createRef } from 'preact'
import { route } from 'preact-router'
import style from './style'
import classNames from '../../utils/classNames'
import { loadMapBox } from '../../lazyLoaders'
import isSSR from '../../utils/is-ssr'
import DancingGif from '../dancing-gif/DancingGif'

if (!isSSR())
  window.Route = (e, x) => {
    e.preventDefault()
    route(x)
    return false
  }

class LngLatCalculator {
  constructor() {
    this.count = {}
    this.lngConstant = 0.0001
    this.latConstant = 0.0001
  }

  calc(lngLat) {
    // TODO: this is a hack, Add proper clusters for lat lng
    // https://github.com/mapbox/mapbox-gl-js/issues/4491#issuecomment-501442036
    const str = lngLat.join(',')
    let count = -1
    if (str in this.count) {
      count = this.count[str]
    }
    this.count[str] = count + 1
    const newCoord = [
      parseFloat(lngLat[0]) + this.lngConstant * this.count[str],
      parseFloat(lngLat[1]) + this.latConstant * this.count[str],
    ]
    return newCoord
  }
}

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.mapContainer = createRef()
    this.markers = []
    this.state = {
      libLoaded: false,
      libLoading: false,
    }
  }

  onDone = event => {}
  onReset = event => {}

  async componentDidMount() {
    if (this.props.active) await this.loadMapBox()
  }

  async loadMapBox() {
    if (!this.state.libLoaded && !this.state.libLoading) {
      this.setState({ libLoading: true })
      await loadMapBox()
      await new Promise(async r => {
        this.setState({ libLoading: false, libLoaded: true }, async () => {
          await this.onLibLoaded()
          r()
        })
      })
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (!prevProps.active && this.props.active) await this.loadMapBox()
    const ids1 = this.props.items.map(x => x.id)
    const ids2 = prevProps.items.map(x => x.id)
    const idsEqual = ids1.reduce((prev, cur, i) => prev && cur == ids2[i], true)
    if (ids1.length !== ids2.length || !idsEqual) {
      this.updatePins()
    }
  }

  popupHTML = item => {
    const categories = item.categories
      .map(
        (x, i) => `<a class="popup-content--category"
            href='#'
        >
          #${x.name.toLowerCase()}
        </a>`,
      )
      .join('')

    return `<div class="popup-content" >
        <a class="popup-content--link" target='_blank' href='/classes/${
          item.id
        }/?i=1' onclick="Route(event, '/classes/${item.id}/?i=1')"></a>
        <div class="popup-content--aside">
          <div class="popup-content--startTime">${item.start_time}</div>
          <div class="popup-content--price">£${item.price}</div>
        </div>
        <div class="popup-content--main">
          <div class="popup-content--categories">${categories}</div>
          <div class="popup-content--title">${item.title}</div>
          <div class="popup-content--venue">
            <div>${item.venue.name}</div>
            <div>${item.venue.area}</div>
          </div>
          <div class="popup-content--instructor">
            <img
              class="popup-content--instructor-avatar"
              alt='${item.instructors[0].name}'
              src='${item.instructors[0].profile.profile_image_url ||
                `https://api.adorable.io/avatars/60/${item.instructors[0].id}.png`}'
            />
            <div class="popup-content--instructorName">
              ${item.instructors[0].name}
            </div>
          </div>
        </div>
        <div class="popup-content--action">
          <a class="popup-content--itemActionLink" href='/classes/${item.id}'>
            <span class="rightArrow" />
          </a>
        </div>
      </div>`
  }

  onLibLoaded = async () => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibWZieDlkIiwiYSI6ImNrMG8xd2NocTAzcDUzZ242bmJxemRhcmoifQ.-MmxtOUW0-Dz9rgGZTLTDw'
    if (!this.state.map) {
      const map = new mapboxgl.Map({
        container: this.mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v10?optimize=true',
        center: [-0.120624, 51.513322],
        zoom: 10,
      })
      this.setState({ map })
      map.on('load', () => {
        console.log('loaded')
        this.setState({ mapLoaded: true })
        this.updatePins(map)
      })
      // map.addSource('points', {
      //   type: 'geojson',
      //   data: {
      //     type: 'FeatureCollection',
      //     features: [
      //       {
      //         // feature for Mapbox DC
      //         type: 'Feature',
      //         geometry: {
      //           type: 'Point',
      //           coordinates: [-0.120624, 51.513322],
      //         },
      //         properties: {
      //           title: 'Mapbox DC',
      //           icon: 'monument',
      //         },
      //       },
      //       {
      //         // feature for Mapbox SF
      //         type: 'Feature',
      //         geometry: {
      //           type: 'Point',
      //           coordinates: [-0.120634, 51.513322],
      //         },
      //         properties: {
      //           title: 'Mapbox SF',
      //           icon: 'harbor',
      //         },
      //       },
      //     ],
      //   },
      // })
      // map.addLayer({
      //   id: 'points',
      //   type: 'symbol',
      //   source: 'points',
      //   layout: {
      //     // get the icon name from the source's "icon" property
      //     // concatenate the name to get an icon from the style's sprite sheet
      //     'icon-image': ['concat', ['get', 'icon'], '-15'],
      //     // get the title name from the source's "title" property
      //     'text-field': ['get', 'title'],
      //     'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      //     'text-offset': [0, 0.6],
      //     'text-anchor': 'top',
      //   },
      // })
    }
  }

  async updatePins(map = this.state.map) {
    await this.loadMapBox()
    this.markers.map(x => x.remove())

    const lngLatCalculator = new LngLatCalculator()
    this.props.items.forEach(item => {
      // create a HTML element for each feature
      var el = document.createElement('i')
      el.className = 'marker'
      const lngLat = lngLatCalculator.calc([item.venue.lon, item.venue.lat])
      el.addEventListener('click', () => map.panTo(lngLat))
      this.markers.push(
        new mapboxgl.Marker(el)
          .setLngLat(lngLat)
          .setPopup(
            new mapboxgl.Popup({
              offset: 37,
              maxWidth: '316px',
            }).setHTML(this.popupHTML(item)),
          )
          .addTo(map),
      )
    })
    // TODO:
    // var clusterGroup = new mapboxgl.MarkerClusterGroup()
    // map.eachLayer(function(layer) {
    //   clusterGroup.addLayer(layer)
    // })
    // mapCluster.addLayer(clusterGroup)
  }

  render({ active }, { mapLoaded }) {
    return (
      <div
        key="MapOuter"
        className={classNames({
          [style.MapWrapper]: 1,
          [style.close]: !active,
        })}
      >
        {!mapLoaded && (
          <div style={{ position: 'absolute', top: '25%' }}>
            <DancingGif text={'Loading Map'}></DancingGif>
          </div>
        )}
        <div
          key="MapInner"
          className={style.Map}
          style={{ opacity: mapLoaded ? 1 : 0 }}
        >
          <div
            id="map"
            ref={this.mapContainer}
            style={{ width: '100%', height: '100%' }}
          ></div>{' '}
          <div className="mapboxgl-ctrl"></div>
        </div>
      </div>
    )
  }
}
