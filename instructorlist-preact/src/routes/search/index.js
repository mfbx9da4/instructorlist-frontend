import { h } from 'preact'
import style from './style'
import Search from '../../components/search/Search'
import { BASE_URL } from '../../DataService'

const SearchPage = props => (
  <div class={style.search}>
    <Search {...props} />
  </div>
)

export default SearchPage

SearchPage.getInitialProps = async () => {
  let res = await fetch(`${BASE_URL}/api/search`)
  let result = await res.json()
  return {
    classes: result.classes,
  }
}
