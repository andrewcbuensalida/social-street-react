import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactFinancialChart from "../components/ReactFinancialChart";
import axios from "axios";
import "./Analysis.css";

function Analysis() {
	const [ohlcvd, setOhlcvd] = useState([]);
	const { symbol } = useParams();
	console.log(`This is coins`);

	useEffect(() => {
		async function getCoin(symbol) {
			const coin = await axios.get(`http://localhost:4000/api/v1/analysis/${symbol}`);
			console.log(`This is coin`);
			console.log(coin);
		}

		getCoin(symbol);
	}, [symbol]);

	return (
		<div>
			Analysis
			<div className="Analysis_chart_container">
				<ReactFinancialChart />
			</div>
		</div>
	);
}

export default Analysis;
