import { h } from 'preact'
import style from './style'
import ClassDetail from '../../components/classdetail/ClassDetail'
import { BASE_URL } from '../../DataService'

ClassDetail.getInitialProps = async ({ id }) => {
  const res = await fetch(`${BASE_URL}/api/classes/${id}`)
  let response = await res.json()
  return {
    classes: {
      [id]: response,
    },
  }
}

export default ClassDetail
