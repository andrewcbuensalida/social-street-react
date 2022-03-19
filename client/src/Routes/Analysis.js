import React, { useContext ,useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import ReactFinancialChart from "../components/ReactFinancialChart";
import { MarketContext } from "../Context/MarketContext";
import "./Analysis.css";

function Analysis() {
	const { coins } = useContext(MarketContext);
	const { id } = useParams();
	console.log(`This is coins`);
	console.log(coins);
  useEffect(() => {
    // const coin = coins.find((coin)=>)
  
    return () => {
      
    }
  }, [])
  

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
