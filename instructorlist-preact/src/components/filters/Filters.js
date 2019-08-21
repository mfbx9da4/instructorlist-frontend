import { h, Component } from 'preact'
import { route } from 'preact-router'
import style from './style'

export default class Filters extends Component {
  state = {
    activities: [
      {
        name: 'Capoeira',
        on: false,
      },
      {
        name: 'Ballet',
        on: false,
      },
      {
        name: 'Hip Hop',
        on: false,
      },
      {
        name: 'Break Dance',
        on: false,
      },
      {
        name: 'Salsa',
        on: true,
      },
      {
        name: 'Tap',
        on: false,
      },
    ],
  }

  componentDidMount() {}

  onApply = () => {
    // TODO: apply params
    route('/search')
  }

  render() {
    return (
      <div
        className={`${style.filtersWrapper} ${
          this.props.active ? '' : style.close
        }`}
      >
        <div className={style.filters}>
          <div className={style.header}>
            <a href={'/search'} className={style.button}>
              Reset
            </a>
            <div className={style.title}>FILTERS</div>
            <button onClick={this.onApply} className={style.button}>
              Done
            </button>
          </div>
          <div className={style.section}>
            <div className={style.sectionHeader}>
              <div className={style.sectionTitle}>ACTIVITIES</div>
            </div>
            <div className={style.checkBoxesContainer}>
              {this.state.activities.map(x => {
                return (
                  <div
                    className={`${style.checkBox} ${x.on ? style.active : ''}`}
                  >
                    <div className={style.label}>{x.name}</div>
                    <div className={`${style.tick}`} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
