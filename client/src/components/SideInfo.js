import React from "react";
import CurrencyFormat from "react-currency-format";

import "./SideInfo.css";

function SideInfo({ coin }) {
	console.log(`This is coin`);
	console.log(coin);

	return coin ? (
		<div>
			<div className="SideInfo_row">
				<div>Base currency:</div>
				<div className="SideInfo_content">
					{coin.name}({coin.symbol?.toUpperCase()})
				</div>
			</div>
			<div className="SideInfo_row">
				<div>Quote currency:</div>
				<div className="SideInfo_content">
					{coin.vsCurrency?.toUpperCase()}
				</div>
			</div>{" "}
			<div className="SideInfo_row">
				<div>Change today:</div>
				<div
					className={`SideInfo_content ${
						coin.price_change_percentage_24h < 0 ? "red" : "green"
					}`}
				>
					<CurrencyFormat
						renderText={(value) => value}
						decimalScale={2}
						value={coin.price_change_percentage_24h}
						displayType={"text"}
						thousandSeparator={true}
						prefix={""}
					/>
					%
				</div>
			</div>{" "}
			<div className={`SideInfo_row `}>
				<div>Market cap change % 24h:</div>
				<div
					className={`SideInfo_content ${
						coin.price_change_percentage_24h < 0 ? "red" : "green"
					}`}
				>
					<CurrencyFormat
						renderText={(value) => value}
						decimalScale={2}
						value={coin.market_cap_change_percentage_24h}
						displayType={"text"}
						thousandSeparator={true}
						prefix={""}
					/>
					%
				</div>
			</div>
			<div className="SideInfo_row">
				<div>Minimum order size:</div>
				<div className="SideInfo_content">
					0.001 {coin.symbol?.toUpperCase()}
				</div>
			</div>{" "}
			<div className="SideInfo_row">
				<div>Minimum size increment:</div>
				<div className="SideInfo_content">
					0.001 {coin.symbol?.toUpperCase()}
				</div>
			</div>{" "}
			<div className="SideInfo_row">
				<div>Minimum price increment:</div>
				<div className="SideInfo_content">
					1 {coin.vsCurrency?.toUpperCase()}
				</div>
			</div>
		</div>
	) : (
		<div>Loading...</div>
	);
}

export default SideInfo;
