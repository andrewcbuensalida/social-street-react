const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

app.get("/api/v1/markets", (req, res) => {
	let responseCoinGecko = null;
	new Promise(async (resolve, reject) => {
		try {
			responseCoinGecko = await axios.get(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=2&price_change_percentage=24h&sparkline=true`
			);

			//to get the icon url from coinapi
		} catch (ex) {
			responseCoinGecko = null;
			// error
			reject(ex);
		}
		if (responseCoinGecko) {
			// success
			const json = responseCoinGecko.data;
			resolve(json);
		}
	}).then((json) => res.json(json));
});

app.get("/api/v1/analysis/:id", async (req, res) => {

	let response = null;
	new Promise(async (resolve, reject) => {
		try {
			response = await axios.get(
				`https://api.coingecko.com/api/v3/coins/${req.params.id}/ohlc?vs_currency=usd&days=1`,
				{
					headers: {
						"X-CoinAPI-Key": process.env.coinApiKey,
					},
				}
			);

			console.log(`This is response`);
			console.log(response.data);

			//to get the icon url from coinapi
		} catch (ex) {
			response = null;
			// error
			reject(ex);
		}
		if (response) {
			// success
			const json = response.data;
			resolve(json);
		}
	}).then((json) => res.json(json));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Now listening for requests on port ${PORT}`);
});
