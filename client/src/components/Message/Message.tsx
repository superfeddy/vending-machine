/**
 * Internal Dependencies
 */
import useStore from '../../store/store';

const Message = () => {
	const { message, isLoading } = useStore();
	return (
		<div className="alert alert-info text-center" role="alert">
			{isLoading ? 'Loading...' : message}
		</div>
	);
};

export default Message;
