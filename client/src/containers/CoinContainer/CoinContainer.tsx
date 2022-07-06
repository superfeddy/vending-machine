/**
 * Internal Dependencies
 */
import CoinItem from './CoinItem/CoinItem';
import ReturnCoin from './ReturnCoin/ReturnCoin';
import { coinAmounts } from '../../constants';

const CoinContainer = () => {
	return (
		<div>
			<div className="row mt-4">
				{coinAmounts.map((coin) => (
					<CoinItem key={coin} coin={coin} />
				))}
				<ReturnCoin />
			</div>
		</div>
	);
};

export default CoinContainer;
