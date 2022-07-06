/**
 * External Dependencies
 */
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Internal Dependencies
 */
import './App.css';
import { Header, Message } from './components/';
import { CoinContainer, ProductContainer } from './containers';

function App() {
	return (
		<div className="App">
			<Header />
			<div className="container">
				<Message />
				<CoinContainer />
				<ProductContainer />
			</div>
		</div>
	);
}

export default App;
