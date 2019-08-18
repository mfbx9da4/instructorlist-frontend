import { h } from 'preact'
import style from './style'

const Home = () => (
  <div class={style.home}>
    <h1>Home</h1>
    <p>
      Go to <a href="/search/">search</a>.
    </p>
  </div>
)

export default Home
