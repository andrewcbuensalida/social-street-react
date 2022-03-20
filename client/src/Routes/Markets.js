import CoinsList from "../components/CoinsList";
import MarketFilter from "../components/MarketFilter";

function Markets() {
	return (
		<main>
			<h2>Markets</h2>
			<MarketFilter />
			<CoinsList />
		</main>
	);
}

export default Markets;
