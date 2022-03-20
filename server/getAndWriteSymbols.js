const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

async function getSymbols() {
	try {
		console.log(`getting symbols`);

		const symbols = await axios.get(`https://rest.coinapi.io/v1/symbols/`, {
			headers: {
				"X-CoinAPI-Key": process.env.coinApiKey,
			},
		});

		console.log(`This is symbols in getsymbols`);
		console.log(symbols.data);

		return symbols.data;
	} catch (e) {
		console.log(e);
	}
}

function writeSymbols(symbols) {
	// console.log(`This is symbols in write`);
	// console.log(symbols)

	const content = `const symbols = ${JSON.stringify(symbols)}
    module.exports = symbols
    `;

	try {
		fs.writeFileSync("./symbols.js", content);
		//file written successfully
	} catch (err) {
		console.error(err);
	}
}

async function getAndWriteSymbols() {
	const symbols = await getSymbols();
	writeSymbols(symbols);

	const timeInterval = 1000 * 60 * 60 * 24 * 7;
	setInterval(async () => {
		const symbols = await getSymbols();
		writeSymbols(symbols);
	}, timeInterval);
}

getAndWriteSymbols();
