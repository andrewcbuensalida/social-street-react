const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const symbols = require("./symbols");

const app = express();

app.use(cors());

app.get("/api/v1/markets", (req, res) => {
	let responseCoinGecko = null;
	new Promise(async (resolve, reject) => {
		try {
			responseCoinGecko = await axios.get(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&price_change_percentage=24h&sparkline=true`
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

app.get("/api/v1/analysis/:id/:symbol", async (req, res) => {
	let responseOhlc = null;
	let responseOrderBook = null;
	new Promise(async (resolve, reject) => {
		try {
			// to get ohlc data from coingecko
			responseOhlc = await axios.get(
				`https://api.coingecko.com/api/v3/coins/${req.params.id}/ohlc?vs_currency=usd&days=30`
			);

			// to get order book data from coinapi
			// match coingecko symbol from param with coinapis asset_id_base from file to get coinapis symbol
			const { symbol_id } = symbols.find(
				(symbol) =>
					symbol.asset_id_base === req.params.symbol.toUpperCase()
			);

			console.log(`This is symbol_id`);
			console.log(symbol_id);

			// use coinapis symbol to get orderbook data/ limit_levels is max amount of levels from each side of book. This is data every second.
			responseOrderBook = await axios.get(
				`https://rest.coinapi.io/v1/orderbooks/${symbol_id}/latest?limit=5&limit_levels=2`,
				{
					headers: { 
						'Origin': 'https://google.com', 
    					'Access-Control-Request-Headers': '', 
						"X-CoinAPI-Key": process.env.coinApiKey2,
					},
				}
			);
			console.log(`This is orderBook`);
			console.log(responseOrderBook.data);

			//to get the icon url from coinapi
		} catch (ex) {
			responseOhlc = null;
			responseOrderBook = null;
			// error
			reject(ex);
		}
		if (responseOhlc && responseOrderBook) {
			// success
			const json = {
				ohlc: responseOhlc.data,
				orderBook: responseOrderBook.data,
			};
			resolve(json);
		}
	}).then((json) => res.json(json));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Now listening for requests on port ${PORT}`);
});
