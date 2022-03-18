import React, { useContext } from "react";
import CoinRow from "./CoinRow";
import "./CoinsList.css";
import {MarketContext} from '../Context/MarketContext'

function CoinsList() {
	const {coins} = useContext(MarketContext)

	return (
		<div>
			<div className="CoinsList_header">
        <div></div>
				<div>Ticker</div>
				<div>Name</div>
				<div>24h Volume</div>
				<div>Price</div>
				<div>Daily Change</div>
			</div>
			{coins.map((coin) => (
				<CoinRow key={coin.id} coin={coin} />
			))}
		</div>
	);
}

export default CoinsList;
