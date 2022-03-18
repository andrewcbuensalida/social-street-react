import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useLocation } from "react-router-dom";

import "./CoinRow.css";

function CoinRow({ coin }) {
	const [icon, setIcon] = useState(null);
	useEffect(() => {
		async function loadIcon() {
			const icon = await import(
				`../assets/coinIcons/${coin.symbol.toLowerCase()}.png`
			);
			setIcon(icon);
		}
		loadIcon();
	}, []);
	return (
		<Link to={`/analysis/${coin.id}`} key={coin.id} className="CoinRow_row">
			<div className="CoinRow_icon">
				<img className="CoinRow_icon_img" src={icon?.default} />
			</div>
			<div className="CoinRow_symbol">{coin.symbol}</div>

			<div>{coin.name}</div>
			<div>
				<CurrencyFormat
					renderText={(value) => value}
					decimalScale={2}
					value={coin.quote.USD.volume_24h}
					displayType={"text"}
					thousandSeparator={true}
					prefix={"$"}
				/>
			</div>
			<div>
				<CurrencyFormat
					renderText={(value) => value}
					decimalScale={coin.quote.USD.price < 0.01 ? 7 : 2}
					value={coin.quote.USD.price}
					displayType={"text"}
					thousandSeparator={true}
					prefix={"$"}
				/>
			</div>
			<div
				className={`CoinRow_${
					coin.quote.USD.percent_change_24h < 0
						? "negative"
						: "positive"
				}`}
			>
				<CurrencyFormat
					renderText={(value) => value}
					decimalScale={2}
					value={coin.quote.USD.percent_change_24h}
					displayType={"text"}
					thousandSeparator={true}
				/>
				%
			</div>
		</Link>
	);
}

export default CoinRow;
