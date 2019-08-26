import { h } from 'preact'
import style from './style'
import ClassDetail from '../../components/classdetail/ClassDetail'

ClassDetail.getInitialProps = ({ id }) => {
  return new Promise(async resolve => {
    const res = await fetch(`http://localhost:8000/api/classes/${id}`)
    const json = await res.json()
    return resolve(json)
  })
}

export default ClassDetail
