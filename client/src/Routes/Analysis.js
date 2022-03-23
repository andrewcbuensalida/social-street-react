import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactFinancialChart from "../components/ReactFinancialChart";
import axios from "axios";
import "./Analysis.css";
import OrderBook from "../components/OrderBook";
import BuySell from "../components/BuySell";
import SideInfo from "../components/SideInfo";
import { MarketContext } from "../Context/MarketContext";
import BASE_URL from "../endPoints";

function Analysis() {
	const [ohlcv, setOhlcv] = useState([{}]);
	const { id, vsCurrency } = useParams(); //id=bitcoin  vsCurrency=usd
	const [coin, setCoin] = useState({});
	const { filteredCoins } = useContext(MarketContext);

	useEffect(() => {
		async function getOhlcv(id) {
			console.log(`getting ohlc from frontend`)
			
			const response = await axios.get(
				`${BASE_URL}/analysis/ohlc/${id}/${vsCurrency}`
			);
			setOhlcv(response.data);
		}
		const newCoin = filteredCoins.find(
			(coin) => coin.id === id && coin.vsCurrency === vsCurrency
		);
		setCoin(newCoin);
		getOhlcv(id);
	}, [id, vsCurrency, filteredCoins]);

	return (
		<div className="Analysis_container">
			<div className="Analysis_chart_container">
				<ReactFinancialChart
					ohlcv={ohlcv}
					symbol={coin?.symbol}
					vsCurrency={coin?.vsCurrency}
				/>
			</div>
			<div className="Analysis_sideinfo_container">
				<SideInfo coin={coin} />
			</div>
			<div className="Analysis_buysell_container">
				<BuySell />
			</div>
			<div className="Analysis_orderbook_container">
				<OrderBook
					symbol={coin?.symbol}
					vsCurrency={coin?.vsCurrency}
				/>
			</div>
		</div>
	);
}

export default Analysis;
