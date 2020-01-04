import { h, Component } from 'preact'
import style from './style'

const linkify = text => {
  if (!text || !text.length) return text
  console.log('text', text)
  const linkPrefixPairs = [
    ['http://', 'http://'],
    ['https://', 'https://'],
    ['www.', 'https://www.'],
  ]
  let _text = text
  for (const pair of linkPrefixPairs) {
    const links = _text.split(pair[0])
    for (let i = 1; i < links.length; i++) {
      const link = links[i]
      let index = link.match(/\s/)
      index = index === null ? link.length - 1 : index.index
      links[i] = `<a href='${pair[1]}${link.substr(
        0,
        index,
      )}' rel='nofollow' target='_blank'> ${link.substr(
        0,
        index,
      )}</a>${link.substr(index)}`
    }
    _text = links.join('')
  }
  return _text
}

export default class Profile extends Component {
  async componentDidMount() {
    let res = await this.props.data.getProfile(this.props.matches.slug)
    console.log('res', res)
    this.setState({
      profile: res,
    })
  }

  render({}, { profile }) {
    if (!profile) return null
    const {
      user,
      facebook_url,
      website_url,
      youtube_url,
      instagram_url,
    } = profile

    return (
      <div className={style.ProfileWrapper}>
        <div className={style.ProfileImage}>
          <img src={profile.profile_image_url} alt={user.full_name} />
        </div>
        <div className={style.ProfileName}>{user.full_name}</div>
        <div
          className={style.ProfileBio}
          dangerouslySetInnerHTML={{ __html: linkify(profile.bio) }}
        ></div>
        <div className={style.ProfileLinks}>
          {facebook_url && (
            <a
              target="_blank"
              rel="nofollow"
              href={facebook_url}
              className={style.ProfileLink}
            >
              <i className="fa-facebook"></i> facebook
            </a>
          )}
          {instagram_url && (
            <a
              target="_blank"
              rel="nofollow"
              href={instagram_url}
              className={style.ProfileLink}
            >
              <i className="fa-instagram"></i>
              <div>instagram</div>
            </a>
          )}
          {youtube_url && (
            <a
              target="_blank"
              rel="nofollow"
              href={youtube_url}
              className={style.ProfileLink}
            >
              <i className="fa-youtube"></i> youtube
            </a>
          )}
          {website_url && (
            <a
              target="_blank"
              rel="nofollow"
              href={website_url}
              className={style.ProfileLink}
            >
              <i className="fa-external-link"></i> website
            </a>
          )}
        </div>
        {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}
      </div>
    )
  }
}
