import React, { useState, useEffect } from "react";
import "./OrderBook.css";

const OrderBook = ({ symbol }) => {
	const [orders, setOrders] = useState([]);
	const currencyPair = `${symbol}usd`;

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
			setOrders(response.data);
		};
		ws.onclose = () => {
			ws.close();
		};

		return () => {
			ws.close();
		};
	}, [currencyPair]);

	const { bids, asks } = orders;
	const minOfBidsAndAsks = Math.min(bids?.length, asks?.length, 25);

	function addTotal(bidsOrAsks) {
		let total = 0;
		return bidsOrAsks?.map((bidsOrAsks, index) => {
			total += parseFloat(bidsOrAsks[1]);

			return {
				total: total,
				price: parseFloat(bidsOrAsks[0]),
				size: parseFloat(bidsOrAsks[1]),
				id: bidsOrAsks[0] + bidsOrAsks[1] + "",
			};
		});
	}

	const bidsWithTotal = addTotal(bids);
	const asksWithTotal = addTotal(asks);

	function addPercent(tot1, tot2) {
		return parseFloat(tot1) / (parseFloat(tot1) + parseFloat(tot2));
	}

	for (let i = 0; i < minOfBidsAndAsks; i++) {
		bidsWithTotal[i].percent = addPercent(
			bidsWithTotal[i].total,
			asksWithTotal[i].total
		);
		asksWithTotal[i].percent = addPercent(
			asksWithTotal[i].total,
			bidsWithTotal[i].total
		);
	}

	const orderRows = (arr, type) =>
		arr &&
		arr.map(
			(item, index) =>
				// have to limit asks and bids to min because sometimes it's not even and the cells arent aligned
				index < minOfBidsAndAsks && (
					<tr
						className={`OrderBook_row OrderBook_row_${type}`}
						key={item.id}
						style={{
							background: `rgb(255,255,255)`,
							background: `linear-gradient(90deg, rgba(255,255,255,0) ${
								item.percent * 100
							}%, #0064024f  ${item.percent * 100}%)`,
						}}
					>
						<td> {item.size} </td>
						<td> {item.price} </td>
					</tr>
				)
		);
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
