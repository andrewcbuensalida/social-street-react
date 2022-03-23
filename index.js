const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

app.get("/api/v1/markets", (req, res) => {
	console.log(`markets hit`)
	
	//should eventually fetch this from https://api.coingecko.com/api/v3/simple/supported_vs_currencies
	let supportedVsCurrencies = ["usd", "eur"];
	let coinsVsCurrencies = [];
	new Promise(async (resolve, reject) => {
		try {
			//loop through supported vs currencies
			for (let i = 0; i < supportedVsCurrencies.length; i++) {
				let coinsVsCurrency = (
					await axios.get(
						`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${supportedVsCurrencies[i]}&order=market_cap_desc&per_page=10&price_change_percentage=24h&sparkline=true`
					)
				).data;

				// adding vs currency to each coin
				for (let j = 0; j < coinsVsCurrency.length; j++) {
					coinsVsCurrency[j].vsCurrency = supportedVsCurrencies[i];
				}
				coinsVsCurrencies = [...coinsVsCurrencies, ...coinsVsCurrency];
			}

			//to get the icon url from coinapi
		} catch (ex) {
			// error
			reject(ex);
		}
		if (coinsVsCurrencies) {
			// success
			const json = coinsVsCurrencies;
			resolve(json);
		}
	}).then((json) => res.json(json));
});

app.get("/api/v1/analysis/ohlc/:id/:vsCurrency", async (req, res) => {
	console.log(`ohlc hit`)
	
	let responseOhlc = null;
	new Promise(async (resolve, reject) => {
		try {
			// to get ohlc data from coingecko
			responseOhlc = await axios.get(
				`https://api.coingecko.com/api/v3/coins/${req.params.id}/ohlc?vs_currency=${req.params.vsCurrency}&days=30`
			);
			
			//to get the icon url from coinapi
		} catch (ex) {
			responseOhlc = null;
			// error
			reject(ex);
		}
		if (responseOhlc) {
			// success
			const json = responseOhlc.data;
			resolve(json);
		}
	}).then((json) => res.json(json));
});


//if the user goes to an unknown route. this is actually really import to go to other routes. without this, and it shows cannot get /<path>
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client/build/index.html"));
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Now listening for requests on port ${PORT}`);
});
