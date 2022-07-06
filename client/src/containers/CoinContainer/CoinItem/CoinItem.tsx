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

interface ICoinItem {
	coin: number;
}

const CoinItem = ({ coin }: ICoinItem) => {
	const { isLoading, setLoading, setMessage } = useStore();
	const ref = useRef() as React.MutableRefObject<HTMLButtonElement>;

	// observe the loading, reject the subscribing if loading is true
	const loadingObserver$ = useObservable(
		($input) => $input.pipe(filter(([x]) => x === false)),
		[isLoading]
	);

	useSubscription(loadingObserver$);

	// handle the user action
	const putCoins = () => {
		const subscription = loadingObserver$.subscribe(async () => {
			try {
				setLoading(true);
				const res = await promise(
					`http://localhost:8000/api/vd/insert?amount=${coin}`,
					1
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
	useFromEvent(ref, 'click', (event$) => event$.pipe(tap(() => putCoins())));

	return (
		<div className="col-md-3 mt-2">
			<button className="btn btn-outline-primary" ref={ref}>
				Insert {coin}
			</button>
		</div>
	);
};

export default CoinItem;
