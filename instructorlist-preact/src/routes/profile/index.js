import { h } from 'preact'
import Profile from '../../components/Profile/profile'
import { BASE_URL } from '../../DataService'

Profile.getInitialProps = async ({ slug }) => {
  const res = await fetch(`${BASE_URL}/api/profiles/?slug=${slug}`)
  let [json] = await res.json()
  return {
    profiles: {
      [slug]: json,
    },
  }
}

export default Profile
