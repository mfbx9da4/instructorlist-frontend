import { h } from 'preact'
import style from './style'
import Search from '../../components/search/Search'

const SearchPage = props => (
  <div class={style.search}>
    <Search {...props} />
  </div>
)

export default SearchPage

SearchPage.getInitialProps = () => {
  return new Promise(async resolve => {
    let res = await fetch('http://localhost:8000/api/classes')
    console.log('res', res)
    resolve(res)
  })
}
