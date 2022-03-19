import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactFinancialChart from "../components/ReactFinancialChart";
import axios from "axios";
import "./Analysis.css";

function Analysis() {
	const [coin, setCoin] = useState(null);
	const { id } = useParams();
	console.log(`This is coins`);

	useEffect(() => {
		async function getCoin(id) {
			const coin = await axios.get(`http://localhost:4000/api/v1/analysis/${id}`);
			console.log(`This is coin`);
			console.log(coin);
		}

		getCoin(id);
	}, [id]);

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
