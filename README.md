Trying to clone https://ftx.us/markets

======================================
coinapi endpoint

this does not work. error. Trying to get a list of all the symbols aka tickers they use because they are different from coin market cap.
https://rest.coinapi.io/v1/symbols/
coin market cap (cmc) costs $95 for 1 month to get open high low close (ohlc) data.
in coinapi it's free but their symbols are different than cmc.
cmc is good for getting a list of coins, except their image api is broken. an unhandledpromiserejection error.
/v2/cryptocurrency/info
The reason why I don't like coinapi is because they dont have daily percentage change, that's why I opted for CoinMarketCap
https://docs.coinapi.io/?javascript#list-all-assets-get
Although I could probably manually compute daily percentage change by getting the price from the day before with 
/v1/quotes/{symbol_id}/history?time_start={time_start}&time_end={time_end}&limit={limit}

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


======================================
https://react-financial.github.io/react-financial-charts/?path=/docs/features-axis--y-axis
to style chart


=========================================
coingecko
To get a list of coin id symbol and name
https://api.coingecko.com/api/v3/coins/list
Their endpoint to get a list of coins is good but they dont have 24h volume, only total volume and market_cap. It also has price change in 24h and sparkline which is a 7d day historical price list. Their images are complete too.
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&price_change_percentage=24h&sparkline=true
The problem with coingecko is the ohlc is every 30 minutes, as opposed to coinapi which is every minute. And with coingecko, you have to make a separate call to different time ranges.
https://api.coingecko.com/api/v3/coins/cardano/ohlc?vs_currency=usd&days=1

Probably have to use coinapi for the ohlc, but then they use symbol_id which is a combinatin of symbol and other stuff like exchange id, symbol type, etc.
Might have to use this coinapi endpoint to get ohlc

	response = await axios.get(
				`https://rest.coinapi.io/v1/exchangerate/${req.params.symbol.toUpperCase()}/USD/history?period_id=1MIN&1975-01-01T00:00:00&time_end=${new Date().toISOString()}&limit=10`,
				{
					headers: {
						"X-CoinAPI-Key": process.env.coinApiKey,
					},
				}
			);



===============================================
coin market cap endpoints
description: read above in coinapi

to get list of coins and prices, 24 volume, etc
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