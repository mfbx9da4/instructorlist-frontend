import './style';
import App from './components/app';

if (typeof window !== 'undefined') {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('/service-worker.js');
		});
	}
}

export default App;
