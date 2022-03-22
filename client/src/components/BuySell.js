import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./BuySell.css";

function BuySell() {
	const [entryPrice, setEntryPrice] = useState("");
	const [type, setType] = useState("");
	const [buySellSelector, setBuySellSelector] = useState("buy");

	function handleSubmit(e) {
		e.preventDefault();
		console.log(`submitted`);
	}
	return (
		<form>
			<div className="BuySell_selector_container">
				<Button
					className={`BuySell_selector ${
						buySellSelector === "buy" && "buy"
					}`}
					onClick={() => setBuySellSelector("buy")}
				>
					Buy
				</Button>
				<Button
					variant="text"
					className={`BuySell_selector ${
						buySellSelector === "sell" && "sell"
					}`}
					onClick={() => setBuySellSelector("sell")}
				>
					Sell
				</Button>
			</div>
			<label htmlFor="entryPrice">Entry price</label>
			<input
				type="text"
				id="entryPrice"
				name="entryPrice"
				value={entryPrice}
				onChange={(e) => setEntryPrice(e.target.value)}
			/>
			<label htmlFor="type">Type</label>
			<select
				name="type"
				id="type"
				value={type}
				onChange={(e) => setType(e.target.value)}
			>
				<option value="market">Market</option>
				<option value="limit">Limit</option>
			</select>
			<button type="submit" onClick={handleSubmit}>
				Submit
			</button>
		</form>
	);
}

export default BuySell;
