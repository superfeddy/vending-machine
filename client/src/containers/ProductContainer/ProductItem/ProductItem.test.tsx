/**
 * External Dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal Dependencies;
 */
import ProductItem from './ProductItem';

describe('<ProductItem />', () => {
	it('renders product buttons without crashing', () => {
		render(<ProductItem productId={1} />);
	});
});
