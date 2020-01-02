import { h, Component } from 'preact'
import style from './style'

export default class Profile extends Component {
  async componentDidMount() {
    let res = await this.props.data.getProfile(this.props.matches.slug)
    console.log('res', res)
    this.setState({
      profile: res,
    })
  }

  render({}, { profile }) {
    return (
      <div className={style.ProfileWrapper}>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    )
  }
}
