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


This gets ohlcv but need their special symbol id. This contains volume too.
		const symbols = await axios.get(
			`https://rest.coinapi.io/v1/symbols/`
		);
		console.log(`This is symbols`);
		console.log(symbols.data);
		try {
			response = await axios.get(
				`https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_${req.params.symbol}_USD/latest?period_id=2MIN&limit=5`,
				{
					headers: {
						"X-CoinAPI-Key": process.env.coinApiKey,
					},
				}
			);


Another method, although inclomplete of volume, is this. This also has a bug, the high and low price is the same if 1MIN is selected as the time period, but 2min works.
response = await axios.get(
				`https://rest.coinapi.io/v1/exchangerate/${req.params.symbol.toUpperCase()}/USD/history?period_id=2MIN&1975-01-01T00:00:00&time_end=${new Date().toISOString()}&limit=20`,
				{
					headers: {
						"X-CoinAPI-Key": process.env.coinApiKey,
					},
				}
			);


Coinapi asset id like btc is different from their symbol id which is <exchange>_<assetid>_etc...


Even when filtering by by asset id, still produces 100,000 results, which takes 5 seconds. Probably have to have another server that fetches asset id and writes it to a file, but then how will I know which symbol to use, because for each ticker like btc or eth, there are many symbols like akfaewr_btc or osdfw_eth. Might have to settle for the 30 minute periods, and no volume of coingecko until we can pay for coin market cap.

responseCoinApi = await axios.get(
				`https://rest.coinapi.io/v1/symbols?filter_asset_id=ETH`,
				{
					headers: {
						"X-CoinAPI-Key": process.env.coinApiKey,
					},
				}
			);



trying to get orderbook from coinapi. first got the symbol from coingecko, searched the matching symbol id in a file I wrote from https://rest.coinapi.io/v1/symbols/, then used that symbol id to get orderbook from 
https://rest.coinapi.io/v1/orderbooks/${symbol_id}/latest?limit=5&limit_levels=2
but it takes like 4 seconds, and for some reason vs code is hanging. It might be because the symbols.js file is 150mb. Might also be the orderbooks endpoint is slow. From postman, it takes 3-7 seconds, also it fails sometimes. Might have to separate api calls.

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
Might have to use this coinapi endpoint to get ohlc, the problem is there's no volume traded.

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