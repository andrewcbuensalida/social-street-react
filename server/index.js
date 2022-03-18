const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Hello. Now listening for requests on port ${PORT}`);
});
