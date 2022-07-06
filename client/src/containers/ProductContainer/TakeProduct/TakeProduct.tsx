/**
 * External Dependencies
 */
import { useRef } from 'react';
import { useObservable, useSubscription } from 'observable-hooks';
import { filter, tap } from 'rxjs';

/**
 * Internal Dependencies
 */
import useStore from '../../../store/store';
import { useFromEvent } from '../../../hooks';
import promise from '../../../service/promise';

const TakeProduct = () => {
	const { isLoading, setCurrentProd, setLoading, setMessage } = useStore();

	const ref = useRef() as React.MutableRefObject<HTMLButtonElement>;

	// observe the loading, reject the subscribing if loading is ture
	const loadingObserver$ = useObservable(
		($input) => $input.pipe(filter(([x]) => x === false)),
		[isLoading]
	);

	useSubscription(loadingObserver$);

	// handle the user action
	const takeProduct = () => {
		const subscription = loadingObserver$.subscribe(async () => {
			try {
				setLoading(true);
				const res = await promise('http://localhost:8000/api/vd/take');

				setMessage(res.msg);
				setLoading(false);
				setCurrentProd(res.productId);
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
		event$.pipe(tap(() => takeProduct()))
	);

	return (
		<div className="col-md-12">
			<button className="btn btn-outline-dark" ref={ref}>
				Take Product
			</button>
		</div>
	);
};

export default TakeProduct;
