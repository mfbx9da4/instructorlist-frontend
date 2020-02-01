import { h, Component, createRef } from 'preact'
import { route } from 'preact-router'
import style from './style'
import classNames from '../../utils/classNames'
import { loadMapBox } from '../../lazyLoaders'

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
        }/?i=1'></a>
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
                `https://api.adorable.io/avatars/60/${item.instructors[0].email}.png`}'
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
        this.setState({ mapLoaded: true })
        this.updatePins(map)
      })
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
      const lngLat = [item.venue.lon, item.venue.lat]
      this.markers.push(
        new mapboxgl.Marker(el)
          .setLngLat(lngLatCalculator.calc(lngLat))
          .setPopup(
            new mapboxgl.Popup({
              offset: 37,
              maxWidth: '316px',
            }).setHTML(this.popupHTML(item)),
          )
          .addTo(map),
      )
    })
  }

  render({ active }, {}) {
    return (
      <div
        key="MapOuter"
        className={classNames({
          [style.MapWrapper]: 1,
          [style.close]: !active,
        })}
      >
        <div key="MapInner" className={style.Map}>
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
