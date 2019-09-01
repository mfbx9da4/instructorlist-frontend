import { h } from 'preact'
import style from './style'
import Search from '../../components/search/Search'

const SearchPage = props => (
  <div class={style.search}>
    <Search {...props} />
  </div>
)

export default SearchPage

SearchPage.getInitialProps = async () => {
  let res = await fetch(
    'https://instructorlist-django.herokuapp.com/api/classes',
  )
  let result = await res.json()
  console.log('result', result)
  return {
    classes: result,
  }
}
