import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactFinancialChart from "../components/ReactFinancialChart";
import axios from "axios";
import "./Analysis.css";

function Analysis() {
	const [ohlcvd, setOhlcvd] = useState([{}]);
	const { symbol } = useParams();

	useEffect(() => {
		async function getOhlcvd(symbol) {
			const coin = await axios.get(`http://localhost:4000/api/v1/analysis/${symbol}`);
      
      setOhlcvd(coin.data)
		}

		getOhlcvd(symbol);
	}, [symbol]);
  
	return (
		<div>
			Analysis
			<div className="Analysis_chart_container">
				<ReactFinancialChart ohlcvd={ohlcvd}/>
			</div>
		</div>
	);
}

export default Analysis;
