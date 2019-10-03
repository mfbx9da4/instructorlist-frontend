import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'
import classNames from '../../utils/classNames'
import { loadMapBox } from '../../lazyLoaders'

export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      libLoaded: false,
      libLoading: false,
    }
  }

  onDone = event => {}
  onReset = event => {}

  componentDidMount() {}

  async componentDidUpdate() {
    if (!this.props.active) return
    if (!this.state.libLoaded && !this.state.libLoading) {
      this.setState({ libLoading: true })
      await loadMapBox()
      this.setState({ libLoading: false, libLoaded: true })
      await this.onLibLoaded()
    }
  }

  popupHTML = item => {
    const categories = item.categories
      .map(
        (x, i) => `<a class="popup-content--category"
            href=''
        >
          #${x.name.toLowerCase()}
        </a>`,
      )
      .join('')

    return `<div class="popup-content" >
        <a class="popup-content--link" href='/classes/${item.id}?i=1'></a>
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
              src='${item.instructors[0].avatar ||
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
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10?optimize=true',
      center: [-0.120624, 51.513322],
      zoom: 10,
    })
    map.on('load', () => {
      const items = [
        {
          id: 1,
          instructors: [
            {
              name: 'Alexander Smith',
              avatar: 'https://api.adorable.io/avatars/60/alexander@smith.png',
            },
          ],
          title: 'Introduction to Bachata',
          price: 12,
          categories: [{ name: 'bachata' }],
          start_time: '07:30',
          duration: 'Alexander Smith',
          venue: {
            area: 'Covent Garden',
            name: 'Pineapple Dance Studios',
            lat: 51.513322,
            lon: -0.120624,
          },
        },
      ]
      this.props.items.forEach(item => {
        // create a HTML element for each feature
        var el = document.createElement('div')
        el.className = 'marker'
        const lngLat = [item.venue.lon, item.venue.lat]
        console.log('lngLat', lngLat)
        new mapboxgl.Marker(el)
          .setLngLat(lngLat)
          .setPopup(
            new mapboxgl.Popup({ offset: 37, maxWidth: '316px' }).setHTML(
              this.popupHTML(item),
            ),
          )
          .addTo(map)
      })
    })
  }

  render({ active }, {}) {
    return (
      <div
        className={classNames({
          [style.MapWrapper]: 1,
          [style.close]: !active,
        })}
      >
        <div className={style.Map}>
          <div id="map" style={{ width: '100%', height: '100%' }}></div>
          <div className="mapboxgl-ctrl"></div>
        </div>
      </div>
    )
  }
}
