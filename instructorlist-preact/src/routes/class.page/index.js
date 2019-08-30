import { h } from 'preact'
import style from './style'
import ClassDetail from '../../components/classdetail/ClassDetail'

ClassDetail.getInitialProps = ({ id }) => {
  return new Promise(resolve => {
    fetch(`https://instructorlist-django.herokuapp.com/api/classes/${id}`).then(
      res => {
        res.json().then(json => resolve(json))
      },
    )
  })
}

export default ClassDetail
