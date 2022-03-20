import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactFinancialChart from "../components/ReactFinancialChart";
import axios from "axios";
import "./Analysis.css";

function Analysis() {
	const [ohlcv, setOhlcv] = useState([{}]);
	const { id } = useParams();

	useEffect(() => {
		async function getOhlcv(id) {     
			const coin = await axios.get(`http://localhost:4000/api/v1/analysis/${id}`);
      
      setOhlcv(coin.data)
		}

		getOhlcv(id);
	}, [id]);
  
	return (
		<div>
			Analysis
			<div className="Analysis_chart_container">
				<ReactFinancialChart ohlcv={ohlcv}/>
			</div>
		</div>
	);
}

export default Analysis;
