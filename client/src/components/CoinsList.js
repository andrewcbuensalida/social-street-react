import React, { useContext } from "react";
import CoinRow from "./CoinRow";
import "./CoinsList.css";
import { MarketContext } from "../Context/MarketContext";

function CoinsList() {
	const { filteredCoins } = useContext(MarketContext);

	return (
		<div>
			<div className="CoinsList_header">
				<div></div>
				<div>Ticker</div>
				<div>Name</div>
				<div>Market Cap</div>
				<div>Price</div>
				<div>Daily Change</div>
			</div>
			{filteredCoins.map((coin) => (
				<CoinRow key={coin.id+coin.vsCurrency} coin={coin} />
			))}
		</div>
	);
}

export default CoinsList;
