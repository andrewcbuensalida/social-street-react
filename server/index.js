const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

app.get("/api/v1/markets", (req, res) => {
	let response = null;
	new Promise(async (resolve, reject) => {
		try {
			//for test data
			// const url = 'sandbox-api.coinmarketcap.com'
			//for real data
			const url = "pro-api.coinmarketcap.com";
			// query string doesn't work for test api
			response = await axios.get(
				`https://${url}/v1/cryptocurrency/listings/latest?start=30&limit=10&sort=volume_24h`,
				{
					headers: {
						"X-CMC_PRO_API_KEY": process.env.apiKey,
					},
				}
			);

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

app.get("/api/v1/analysis/:symbol", async (req, res) => {
	console.log(`This is req.params.id`);
	console.log(req.params.symbol);

	let response = null;
	new Promise(async (resolve, reject) => {
		console.log(`helllo`)
		
		const symbols = await axios.get(
			`https://rest.coinapi.io/v1/symbols/`
		);
		console.log(`This is symbols`);
		console.log(symbols.data);
		try {
			response = await axios.get(
				`https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_${req.params.symbol}_USD/latest?period_id=1MIN&limit=5`,
				{
					headers: {
						"X-CoinAPI-Key": process.env.coinApiKey,
					},
				}
			);

			//to get the icon url from coinapi
		} catch (ex) {
			response = null;
			// error
			reject(ex);
		}
		if (response) {
			// console.log(`This is response`);
			// console.log(response.data);

			// success
			const json = response.data;
			resolve(json);
		}
	}).then((json) => res.json(json));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Hello. Now listening for requests on port ${PORT}`);
});
