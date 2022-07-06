/**
 * External Dependencies
 */
import { render } from '@testing-library/react';

/**
 * Internal Dependencies;
 */
import Message from './Message';

describe('<Message />', () => {
	it('renders message without crashing', () => {
		render(<Message />);
	});
});
