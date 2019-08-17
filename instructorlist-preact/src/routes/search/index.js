import { h } from 'preact'
import style from './style'
import Search from '../../components/search/Search'

const SearchPage = () => (
  <div class={style.search}>
    <Search />
  </div>
)

export default SearchPage
