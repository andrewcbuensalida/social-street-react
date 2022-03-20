import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MarketContext = createContext();

// this could actually just be in the Markets component
export function MarketContextProvider({ children }) {
	const [coins, setCoins] = useState([]);
	const [pollCount, setPollCount] = useState(0);

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
		<MarketContext.Provider value={{ coins, setCoins }}>
			{children}
		</MarketContext.Provider>
	);
}
