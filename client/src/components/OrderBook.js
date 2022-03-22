import React, { useState, useEffect } from "react";
import "./OrderBook.css";

const OrderBook = ({ symbol, vsCurrency }) => {
	const [orders, setOrders] = useState({ bids: [], asks: [] });
	const currencyPair = `${symbol}${vsCurrency}`;

    console.log(`This is currencyPair`)
    console.log(currencyPair)
    
	const currencyArray = currencyPair.toUpperCase().match(/.{1,3}/g);

	useEffect(() => {
		const subscribe = {
			event: "bts:subscribe",
			data: {
				channel: `order_book_${currencyPair}`,
			},
		};
		const ws = new WebSocket("wss://ws.bitstamp.net");

		ws.onopen = () => {
			ws.send(JSON.stringify(subscribe));
		};
		ws.onmessage = (event) => {
			const response = JSON.parse(event.data);
			console.log(`connected to websocket`);

			if (response.data.bids && response.data.asks) {
				setOrders(response.data);
			}
		};
		ws.onclose = () => {
			ws.close();
		};

		return () => {
			ws.close();
		};
	}, [currencyPair]);

	const { bids, asks } = orders;

	const minOfBidsAndAsks = Math.min(bids.length, asks.length, 25);

	function addTotal(bidsOrAsks) {
		let total = 0;
		return bidsOrAsks.map((bidsOrAsks, index) => {
			total += parseFloat(bidsOrAsks[1]);

			return {
				total: total,
				price: parseFloat(bidsOrAsks[0]),
				size: parseFloat(bidsOrAsks[1]),
				id: bidsOrAsks[0] + bidsOrAsks[1] + "",
			};
		});
	}

	// adding total of bids and asks
	const bidsWithTotal = addTotal(bids);
	const asksWithTotal = addTotal(asks);

	// this is the total of both sides together
	const bidsAndAsksTotal =
		(bidsWithTotal[minOfBidsAndAsks]?.total || 0) +
		(asksWithTotal[minOfBidsAndAsks]?.total || 0);

	// adding percent. Not sure if it should be over bidsAndAsksTotal, or the total just for one side
	for (let i = 0; i < minOfBidsAndAsks; i++) {
		bidsWithTotal[i].percent = bidsWithTotal[i].total / bidsAndAsksTotal;
		asksWithTotal[i].percent = asksWithTotal[i].total / bidsAndAsksTotal;
	}

	const orderRows = (arr, type) =>
		arr &&
		arr.map((item, index) => {
			// have to limit asks and bids to min because sometimes it's not even and the cells arent aligned
			return (
				index < minOfBidsAndAsks && (
					<tr
						className={`OrderBook_row OrderBook_row_${type}`}
						key={item.id}
						style={{
							background: `linear-gradient(90deg, rgba(255,0,0,${
								type === "bids" ? 0 : 0.3
							}) ${
								(type === "bids"
									? 1 - item.percent
									: item.percent) * 100
							}%, rgba(0,255,0,${type === "bids" ? 0.2 : 0})  ${
								(type === "bids"
									? 1 - item.percent
									: item.percent) * 100
							}%)`,
						}}
					>
						<td> {item.size} </td>
						<td> {item.price} </td>
					</tr>
				)
			);
		});
	const orderHead = (title) => (
		<thead>
			<tr>
				<th colSpan="2">{title}</th>
			</tr>
			<tr>
				<th>Size ({currencyArray[0]})</th>
				<th>Price ({currencyArray[1]})</th>
			</tr>
		</thead>
	);
	return (
		<div className="OrderBook_container">
			<div className="OrderBook_title">Order book</div>
			<table>
				{orderHead("Bids")}
				<tbody>{orderRows(bidsWithTotal, "bids")}</tbody>
			</table>

			<table>
				{orderHead("Asks")}
				<tbody>{orderRows(asksWithTotal, "asks")}</tbody>
			</table>
		</div>
	);
};

export default OrderBook;
