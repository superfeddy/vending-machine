/**
 * External Dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal Dependencies;
 */
import CoinItem from './CoinItem';

describe('<CoinItem />', () => {
	it('renders coin buttons without crashing', () => {
		render(<CoinItem coin={10} />);
	});
});
