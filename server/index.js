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
            const testUrl = 'sandbox-api.coinmarketcap.com'
            //for real data
            // const realUrl = 'pro-api.coinmarketcap.com'
			response = await axios.get(
				`https://${testUrl}/v1/cryptocurrency/listings/latest`,
				{
					headers: {
						"X-CMC_PRO_API_KEY":
							process.env.testApiKey,
					},
				}
			);
		} catch (ex) {
			response = null;
			// error
			console.log(ex);
			reject(ex);
		}
		if (response) {
			// success
			const json = response.data;
			console.log(json);
			resolve(json);
		}
	}).then((json) => res.json(json));
    

});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Hello. Now listening for requests on port ${PORT}`);
});
