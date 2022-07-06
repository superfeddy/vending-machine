/**
 * External Dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal Dependencies;
 */
import CoinContainer from './CoinContainer';

describe('<CoinContainer />', () => {
	it('renders coin container without crashing', () => {
		render(<CoinContainer />);
	});
});
