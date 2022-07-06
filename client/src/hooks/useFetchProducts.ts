/**
 * External Dependencies
 */
import { useState, useEffect } from 'react';

/**
 * Internal Dependencies
 */
import useStore from '../store/store';
import promise from '../service/promise';

const useFetchProducts = () => {
	const { setLoading, setMessage } = useStore();

	const [loadingProducts, setLoadingPrdoucts] = useState<boolean>();
	const [products, setProducts] = useState<[]>([]);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				setLoadingPrdoucts(true);
				const res = await promise('http://localhost:8000/api/vd/products');

				setProducts(res.products);
				setMessage(res.msg);

				setLoading(false);
				setLoadingPrdoucts(false);
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);

	return { loadingProducts, products };
};

export default useFetchProducts;
