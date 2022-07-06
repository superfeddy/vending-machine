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

interface IProductItem {
	productId: number;
}

const ProductItem = ({ productId }: IProductItem) => {
	const {
		currentProd,
		isLoading,
		setCurrentProd,
		setLoading,
		setMessage,
	} = useStore();

	const ref = useRef() as React.MutableRefObject<HTMLButtonElement>;

	// observe the loading, reject the subscribing if loading is ture
	const loadingObserver$ = useObservable(
		($input) => $input.pipe(filter(([x]) => x === false)),
		[isLoading]
	);

	useSubscription(loadingObserver$);

	// handle the user action
	const selectProduct = () => {
		const subscription = loadingObserver$.subscribe(async () => {
			try {
				setLoading(true);
				const res = await promise(
					`http://localhost:8000/api/vd/select?id=${productId}`,
					1
				);

				setCurrentProd(res.productId);
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
		event$.pipe(tap(() => selectProduct()))
	);

	return (
		<div className="col-md-4 mt-2">
			<button
				id={productId === currentProd ? 'currentProduct' : ''}
				className="btn btn-outline-secondary"
				ref={ref}
			>
				Product {productId}
			</button>
		</div>
	);
};

export default ProductItem;
