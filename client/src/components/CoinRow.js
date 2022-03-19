import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";

import "./CoinRow.css";

function CoinRow({ coin }) {
	return (
		<Link to={`/analysis/${coin.id}`} key={coin.id} className="CoinRow_row">
			<div className="CoinRow_icon">
				<img className="CoinRow_icon_img" src={coin.image} />
			</div>
			<div className="CoinRow_symbol">{coin.symbol.toUpperCase()}</div>

			<div>{coin.name}</div>
			<div>
				<CurrencyFormat
					renderText={(value) => value}
					decimalScale={2}
					value={coin.market_cap}
					displayType={"text"}
					thousandSeparator={true}
					prefix={"$"}
				/>
			</div>
			<div>
				<CurrencyFormat
					renderText={(value) => value}
					decimalScale={coin.current_price < 0.01 ? 7 : 2}
					value={coin.current_price}
					displayType={"text"}
					thousandSeparator={true}
					prefix={"$"}
				/>
			</div>
			<div
				className={`CoinRow_${
					coin.price_change_percentage_24h < 0
						? "negative"
						: "positive"
				}`}
			>
				<CurrencyFormat
					renderText={(value) => value}
					decimalScale={2}
					value={coin.price_change_percentage_24h}
					displayType={"text"}
					thousandSeparator={true}
				/>
				%
			</div>
		</Link>
	);
}

export default CoinRow;
