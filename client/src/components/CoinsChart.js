import { useContext } from "react";
import CanvasJSReact from "../assets/canvasjs-3.4.13/canvasjs.react";
import { MarketContext } from "../Context/MarketContext";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function CoinsChart() {
	const { coins } = useContext(MarketContext);

	const options = {
		axisX: {
			labelFontColor: "white",
		},
		axisY: {
			labelFontColor: "white",
			labelFormatter: function (e) {
				return (
					"$" +
					CanvasJS.formatNumber(e.value / 1000000000, "#,#00" + " B")
				);
			},
			includeZero: false,
		},
		title: {
			text: "Market Capitalization",
			fontColor: "white",
			fontFamily: "verdana",
			fontSize: 20,
		},
		data: [
			{
				type: "column",
				dataPoints: coins.map((coin) => ({
					label: coin.name,
					y: coin.market_cap,
				})),
			},
		],
		backgroundColor: null,
	};

	return (
		<div >
			<CanvasJSChart
				options={options}
				// onRef={(ref) => (this.chart = ref)}
			/>
		</div>
	);
}

export default CoinsChart;
