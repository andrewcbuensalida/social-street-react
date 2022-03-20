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
				`http://localhost:4000/api/v1/analysis/${id}/${symbol}`
			);
			setOrderBook(response.data.orderBook);
			setOhlcv(response.data.ohlc);
		}

		getOhlcv(id);
	}, [id]);
console.log(`This is orderBook`)
console.log(orderBook)

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
