import { h } from 'preact'
import style from './style'
import ClassDetail from '../../components/classdetail/ClassDetail'

ClassDetail.getInitialProps = async ({ id }) => {
  const res = await fetch(
    `https://instructorlist-django.herokuapp.com/api/classes/${id}`,
  )
  let response = await res.json()
  return {
    classes: {
      [id]: response,
    },
  }
}

export default ClassDetail
