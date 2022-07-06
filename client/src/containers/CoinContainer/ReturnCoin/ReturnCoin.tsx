/**
 * External Dependencies
 */
import { useObservable, useSubscription } from 'observable-hooks';
import { useRef } from 'react';
import { filter, tap } from 'rxjs';

/**
 * Internal Dependencies
 */
import useStore from '../../../store';
import { useFromEvent } from '../../../hooks';
import promise from '../../../service/promise';

const ReturnCoin = () => {
	const { isLoading, setLoading, setMessage } = useStore();
	const ref = useRef() as React.MutableRefObject<HTMLButtonElement>;

	// observe the loading, reject the subscribing if loading is ture
	const loadingObserver$ = useObservable(
		($input) => $input.pipe(filter(([x]) => x === false)),
		[isLoading]
	);

	useSubscription(loadingObserver$);

	// handle the user action
	const returnCoins = () => {
		const subscription = loadingObserver$.subscribe(async () => {
			try {
				setLoading(true);
				const res = await promise(
					'http://localhost:8000/api/vd/return'
				);

				setMessage(res.msg);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		});

		if (subscription) {
			subscription.unsubscribe();
		}
	};

	// handle the button click
	useFromEvent(ref, 'click', (event$) =>
		event$.pipe(tap(() => returnCoins()))
	);

	return (
		<div className="col-md-3 mt-2">
			<button className="btn btn-outline-warning" ref={ref}>
				Return Coins
			</button>
		</div>
	);
};

export default ReturnCoin;
