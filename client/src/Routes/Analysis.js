import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactFinancialChart from "../components/ReactFinancialChart";
import axios from "axios";
import "./Analysis.css";
import OrderBook from "../components/OrderBook";
import BuySell from "../components/BuySell";
import SideInfo from "../components/SideInfo";

function Analysis() {
	const [ohlcv, setOhlcv] = useState([{}]);
	const { id, symbol } = useParams(); //id=bitcoin  symbol=btc

	useEffect(() => {
		async function getOhlcv(id) {
			const response = await axios.get(
				`http://localhost:4000/api/v1/analysis/ohlc/${id}/usd`
			);
			setOhlcv(response.data);
		}
		getOhlcv(id);
	}, [id, symbol]);

	return (
		<div className="Analysis_container">
			<div className="Analysis_chart_container">
				<ReactFinancialChart ohlcv={ohlcv} symbol={symbol} />
			</div>
			<div className="Analysis_sideinfo_container">
				<SideInfo />
			</div>
			<div className="Analysis_buysell_container">
				<BuySell />
			</div>
			<div className="Analysis_orderbook_container">
				<OrderBook symbol={symbol} />
			</div>
		</div>
	);
}

export default Analysis;
