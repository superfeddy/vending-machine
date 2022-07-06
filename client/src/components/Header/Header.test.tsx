/**
 * External Dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal Dependencies;
 */
import Header from './Header';

describe('<Header />', () => {
	it('renders header without crashing', () => {
		render(<Header />);
	});
});
