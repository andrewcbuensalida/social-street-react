import CoinsList from "../components/CoinsList";
import MarketFilter from "../components/MarketFilter";
import CoinsChart from '../components/CoinsChart'

function Markets() {
	return (
		<main>
			<h2>Markets</h2>
			<MarketFilter />
			<CoinsList />
			<CoinsChart/>
		</main>
	);
}

export default Markets;
