import React from "react";
import ReactApexChart from "react-apexcharts";

export default class ApexChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [
				{
					data: [
						{
							x: new Date(1538778600000),
							y: [6629.81, 6650.5, 6623.04, 6633.33],
						},
						{
							x: new Date(1538780400000),
							y: [6632.01, 6643.59, 6620, 6630.11],
						},
						{
							x: new Date(1538782200000),
							y: [6630.71, 6648.95, 6623.34, 6635.65],
						},
						{
							x: new Date(1538784000000),
							y: [6635.65, 6640, 6629.67, 6638.24],
						},
						{
							x: new Date(1538785800000),
							y: [6638.24, 6640, 6620, 6624.47],
						},
					],
				},
			],
			options: {

				title: {
					text: "CandleStick Chart",
					align: "left",
				},
				chart: {
					type: "candlestick",
					height: 290,
					id: "candles",
					toolbar: {
						autoSelected: "pan",
						show: true,
					},
					zoom: {
						enabled: false,
					},
				},
				plotOptions: {
					candlestick: {
						colors: {
							upward: "#3C90EB",
							downward: "#DF7D46",
						},
					},
				},
				xaxis: {
					type: "datetime",
				},
				yaxis: {
					tooltip: {
						enabled: true,
					},
				},
			},

			seriesBar: [
				{
					name: "volume",
					data: [
						{
							x: new Date(1538778600000),
							y: 6478,
						},
						{
							x: new Date(1538780400000),
							y: 6833,
						},
						{
							x: new Date(1538782200000),
							y: 6944,
						},
						{
							x: new Date(1538784000000),
							y: 6423,
						},
						{
							x: new Date(1538785800000),
							y: 73,
						},
					],
				},
			],
			optionsBar: {
				chart: {
					height: 160,
					type: "bar",
					// brush: {
					// 	enabled: true,
					// 	target: "candles",
					// },
					selection: {
						enabled: true,
						xaxis: {
							min: new Date("20 Jan 2017").getTime(),
							max: new Date("10 Dec 2017").getTime(),
						},
						fill: {
							color: "#ccc",
							opacity: 0.4,
						},
						stroke: {
							color: "#0D47A1",
						},
					},
				},
				dataLabels: {
					enabled: false,
				},
				plotOptions: {
					bar: {
						columnWidth: "80%",
						colors: {
							ranges: [
								{
									from: -1000,
									to: 0,
									color: "#F15B46",
								},
								{
									from: 1,
									to: 10000,
									color: "#FEB019",
								},
							],
						},
					},
				},
				stroke: {
					width: 0,
				},
				xaxis: {
					type: "datetime",
					axisBorder: {
						offsetX: 13,
					},
				},
				yaxis: {
					labels: {
						show: false,
					},
				},
			},
		};
	}

	render() {
		return (
			<div className="chart-box">
				<div id="chart-candlestick">
					<ReactApexChart
						options={this.state.options}
						series={this.state.series}
						type="candlestick"
						height={290}
					/>
				</div>
				<div id="chart-bar">
					<ReactApexChart
						options={this.state.optionsBar}
						series={this.state.seriesBar}
						type="bar"
						height={160}
					/>
				</div>
			</div>
		);
	}
}
