import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MarketContext = createContext();

export function MarketContextProvider({ children }) {
	const [coins, setCoins] = useState([]);
	useEffect(() => {
		console.log(`in markets fetch`)
		
		async function getCrypto() {
			const response = await axios.get("http://localhost:4000/api/v1/markets");

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
