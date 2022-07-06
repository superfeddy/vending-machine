/**
 * External Dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal Dependencies;
 */
import TakeProduct from './TakeProduct';

describe('<TakeProduct />', () => {
	it('renders take product button without crashing', () => {
		render(<TakeProduct />);
	});
});
