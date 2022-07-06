/**
 * External Dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal Dependencies;
 */
import ReturnCoin from './ReturnCoin';

describe('<ReturnCoin />', () => {
	it('renders return coin button without crashing', () => {
		render(<ReturnCoin />);
	});
});
