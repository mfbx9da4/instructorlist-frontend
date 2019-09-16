import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'

export default class Directions extends Component {
  render({ venue }) {
    return (
      <a
        href={
          venue.google_maps_url
            ? venue.google_maps_url
            : `https://www.google.co.uk/maps/dir//${venue.address_line_1} ${venue.postcode}`
        }
        target="_blank"
        className={style.well}
        style={{ borderTop: '1px solid var(--off-white)' }}
      >
        <div className={style.wellIcon}>
          <div className="directions"></div>
        </div>
        <div className={style.wellMain}>
          <div className={style.wellName}>{venue.name}</div>
          <div className={style.wellDescription}>
            {venue.address_line_1}, {venue.postcode}
          </div>
        </div>
        <div className={style.wellAction}>
          <div className="rightArrow"></div>
        </div>
      </a>
    )
  }
}
