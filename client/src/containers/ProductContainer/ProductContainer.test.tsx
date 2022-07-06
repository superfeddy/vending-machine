/**
 * External Dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal Dependencies;
 */
import ProductContainer from './ProductContainer';

describe('<ProductContainer />', () => {
	it('renders product container without crashing', () => {
		render(<ProductContainer />);
	});
});
