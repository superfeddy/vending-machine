/**
 * Internal Dependencies
 */
import TakeProduct from './TakeProduct/TakeProduct';
import ProductItem from './ProductItem/ProductItem';
import { useFetchPruducts } from '../../hooks';

const ProductContainer = () => {
	const { products, loadingProducts } = useFetchPruducts();

	return (
		<>
			<div className="row mt-4">
				<TakeProduct />
			</div>
			<div className="row mt-4">
				{loadingProducts ? (
					<p className="text-center">Loading...</p>
				) : products.length > 0 ? (
					products.map((product: any) => (
						<ProductItem key={product.id} productId={product.id} />
					))
				) : (
					<></>
				)}
			</div>
		</>
	);
};

export default ProductContainer;
