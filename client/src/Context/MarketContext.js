import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MarketContext = createContext();

export function MarketContextProvider({ children }) {
	const [coins, setCoins] = useState([]);
	useEffect(() => {
		async function getCrypto() {
			const response = await axios.get("http://localhost:4000/");

			setCoins(response.data.data);
		}
		getCrypto();
	}, []);
	return (
		<MarketContext.Provider value={{ coins, setCoins }}>
			{children}
		</MarketContext.Provider>
	);
}
