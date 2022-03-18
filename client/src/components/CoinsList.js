import React, { useState, useEffect } from "react";
import CoinRow from "./CoinRow";
import "./CoinsList.css";

function CoinsList({ coins }) {
	console.log(`This is coins`);
	console.log(coins);

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
				<CoinRow coin={coin} />
			))}
		</div>
	);
}

export default CoinsList;
