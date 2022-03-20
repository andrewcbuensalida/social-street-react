import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactFinancialChart from "../components/ReactFinancialChart";
import axios from "axios";
import "./Analysis.css";

function Analysis() {
	const [ohlcv, setOhlcv] = useState([{}]);
	const [orderBook, setOrderBook] = useState([{}]);
	const { id, symbol } = useParams();

	useEffect(() => {
		async function getOhlcv(id) {
			const response = await axios.get(
				`http://localhost:4000/api/v1/analysis/ohlc/${id}`
			);
			setOhlcv(response.data);
		}

		async function getOrderBook(symbol) {
			const response = await axios.get(
				`http://localhost:4000/api/v1/analysis/orderbook/${symbol}`
			);
			setOrderBook(response.data);
		}
		getOhlcv(id);
		getOrderBook(symbol);
	}, [id, symbol]);
	console.log(`This is orderBook`);
	console.log(orderBook);

	return (
		<div>
			{id.toUpperCase()}
			<div className="Analysis_chart_container">
				<ReactFinancialChart ohlcv={ohlcv} />
			</div>
		</div>
	);
}

export default Analysis;
