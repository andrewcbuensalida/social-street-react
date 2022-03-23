import React, { useState } from "react";
import "./BuySell.css";
import { Typography, Button, Container, Input, TextField } from "@mui/material";
import { styled, createTheme } from "@mui/material/styles";

const MyTextField = styled(TextField)({
    width:'50%',
    marginBottom:20,
	"& label.Mui-focused": {
		color: "primary",
	},
	"& label": {
		color: "lightgrey",
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "transparent",
	},
	"& .MuiInput-root": {
		borderBottom: "2px solid grey",
		"&:hover ": {
			borderBottom: "2px solid lightgrey",
		},
	},
});

function BuySell() {
	const [entryPrice, setEntryPrice] = useState("");
	const [type, setType] = useState("");
	const [entryPriceError, setEntryPriceError] = useState(false);
	const [buySellSelector, setBuySellSelector] = useState("buy");

	function handleSubmit(e) {
		e.preventDefault();
		console.log(`submitted`);
		if (entryPrice === "") {
			setEntryPriceError(true);
		} else {
			setEntryPriceError(false);
		}
	}
	return (
		<Container>
			<form noValidate autoComplete="off">
				<div className="BuySell_selector_container">
					<Button
						// variant means what it will look like, component means what html tag will be
						variant="text"
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

				<MyTextField
					required
					variant="standard"
					label="Entry price"
					type="number"
					id="entryPrice"
					name="entryPrice"
					value={entryPrice}
					onChange={(e) => setEntryPrice(e.target.value)}
					error={entryPriceError}
					className="BuySell_entryPrice"
					InputLabelProps={{
						shrink: true,
					}}
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
				<Button
					fullWidth
					color="info"
					variant="outlined"
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</form>
		</Container>
	);
}

export default BuySell;
