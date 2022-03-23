import React, { useContext } from "react";
import CoinRow from "./CoinRow";
import "./CoinsList.css";
import { MarketContext } from "../Context/MarketContext";

function CoinsList() {
	const { filteredCoins } = useContext(MarketContext);

	return (
		<div>
			<div className="CoinsList_header">
				<div className="CoinsList_icon_header"></div>
				<div>Ticker</div>
				<div className="CoinsList_name_header">Name</div>
				<div className="CoinsList_marketcap_header">Market Cap</div>
				<div>Price</div>
				<div>Daily Change</div>
			</div>
			{filteredCoins.map((coin) => (
				<CoinRow key={coin.id + coin.vsCurrency} coin={coin} />
			))}
		</div>
	);
}

export default CoinsList;
