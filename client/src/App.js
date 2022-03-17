import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import CoinsList from "./components/CoinsList";
import Footer from "./components/Footer";

function App() {
	useEffect(() => {
		async function getCrypto() {
			const response = await axios.get("http://localhost:4000/");

			console.log(`This is response`);
			console.log(response);
		}
		getCrypto();
	}, []);

	return (
		<div className="App">
			<Navbar />
			<h1>Markets</h1>
			<CoinsList />
			<Footer />
		</div>
	);
}

export default App;
