import './style'
import App from './components/app'

if (typeof window !== 'undefined') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      console.log('Request Register service worker')
      navigator.serviceWorker.register('/sw.js')
    })
  }
}

export default App
