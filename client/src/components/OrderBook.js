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
    const minOfBidsAndAsks = Math.min(bids?.length,asks?.length)
    console.log(`This is bids`)
    console.log(bids)
    
    
	const orderRows = (arr) =>
		arr &&
		arr.map(
			(item, index) =>
				// have to limit asks and bids to min because sometimes it's not even and the cells arent aligned
				index < minOfBidsAndAsks && (
					<tr className="OrderBook_row" key={item[1]+item[0]+index}>
						<td> {item[1]} </td>
						<td> {item[0]} </td>
					</tr>
				)
		);
	const orderHead = (title) => (
		<thead>
			<tr>
				<th colSpan="2">{title}</th>
			</tr>
			<tr>
				<th>Amount ({currencyArray[0]})</th>
				<th>Price ({currencyArray[1]})</th>
			</tr>
		</thead>
	);
	return (
		<div className="OrderBook_container">
            <div className="OrderBook_title">Order book</div>
			<table>
				{orderHead("Bids")}
				<tbody>{orderRows(bids)}</tbody>
			</table>

			<table>
				{orderHead("Asks")}
				<tbody>{orderRows(asks)}</tbody>
			</table>
		</div>
	);
};

export default OrderBook;
