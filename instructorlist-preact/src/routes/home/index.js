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

Home.getInitialProps = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('get some props')
      resolve({ rgeat: 1 })
    }, 300)
  })
}

export default Home
