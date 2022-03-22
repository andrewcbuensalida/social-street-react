import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MarketContext = createContext();

// this could actually just be in the Markets component
export function MarketContextProvider({ children }) {
	const [coins, setCoins] = useState([]);
	const [pollCount, setPollCount] = useState(0);
	const [filteredCoins, setFilteredCoins] = useState(coins);
	const [selectedVsCurrencies, setSelectedVsCurrencies] = useState([
		"usd",
		"eur",
	]);
	const [selectedOrderBy, setSelectedOrderBy] = ["market_cap"];

	useEffect(() => {
		let newFilteredCoins = [];
		for (let i = 0; i < selectedVsCurrencies.length; i++) {
			newFilteredCoins = [
				...newFilteredCoins,
				...coins.filter(
					(coin) => coin.vsCurrency === selectedVsCurrencies[i]
				),
			];
		}
		newFilteredCoins.sort((a, b) => b.market_cap - a.market_cap);
		setFilteredCoins(newFilteredCoins);
	}, [coins, selectedVsCurrencies]);

	useEffect(() => {
		async function getCrypto() {
			const response = await axios.get(
				"http://localhost:4000/api/v1/markets"
			);
			setCoins(response.data);
		}
		getCrypto();
		//polling instead of web sockets. Turn on during production
		// setTimeout(
		// 	() => setPollCount((prevPollCount) => prevPollCount + 1),
		// 	60000
		// );
		// remove pollCount during development to prevent polling
	}, []);

	return (
		<MarketContext.Provider value={{ filteredCoins }}>
			{children}
		</MarketContext.Provider>
	);
}
