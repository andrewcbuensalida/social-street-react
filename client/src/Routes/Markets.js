import { useEffect, useState } from "react";
import axios from "axios";
import CoinsList from "../components/CoinsList";
import MarketFilter from "../components/MarketFilter";

function Markets() {
	const [coins, setCoins] = useState([]);
	useEffect(() => {
		async function getCrypto() {
			const response = await axios.get("http://localhost:4000/");
           
			setCoins(response.data.data);
		}
		getCrypto();
	}, []);
	return (
		<main>
			<h2>Markets</h2>
			<MarketFilter />
			<CoinsList coins={coins}/>
		</main>
	);
}

export default Markets;
