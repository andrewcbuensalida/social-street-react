import React, { useState, useEffect } from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
	Label,
	elderRay,
	ema,
	discontinuousTimeScaleProviderBuilder,
	Chart,
	ChartCanvas,
	CurrentCoordinate,
	BarSeries,
	CandlestickSeries,
	ElderRaySeries,
	LineSeries,
	MovingAverageTooltip,
	OHLCTooltip,
	SingleValueTooltip,
	lastVisibleItemBasedZoomAnchor,
	XAxis,
	YAxis,
	CrossHairCursor,
	EdgeIndicator,
	MouseCoordinateX,
	MouseCoordinateY,
	ZoomButtons,
	withDeviceRatio,
	withSize,
} from "react-financial-charts";
import { initialData } from "./data";
import "./ReactFinancialChart.css";

function ReactFinancialChart({ ohlcv, symbol = "N/A", vsCurrency }) {
	const [formattedOhlcv, setFormattedOhlcv] = useState([{}]);

	useEffect(() => {
		setFormattedOhlcv(
			ohlcv.map((dataPoint) => ({
				date: dataPoint[0],
				open: dataPoint[1],
				high: dataPoint[2],
				low: dataPoint[3],
				close: dataPoint[4],
				// volume: 67639193,
			}))
			// initialData
		);
	}, [ohlcv]);

	const ScaleProvider =
		discontinuousTimeScaleProviderBuilder().inputDateAccessor(
			(d) => new Date(d.date)
		);
	const height = 500;
	const width = 600;
	const margin = { left: 0, right: 60, top: 0, bottom: 24 };

	const ema12 = ema()
		.id(1)
		.options({ windowSize: 12 })
		.merge((d, c) => {
			d.ema12 = c;
		})
		.accessor((d) => d.ema12);

	const ema26 = ema()
		.id(2)
		.options({ windowSize: 26 })
		.merge((d, c) => {
			d.ema26 = c;
		})
		.accessor((d) => d.ema26);

	const elder = elderRay();

	const calculatedData = elder(ema26(ema12(formattedOhlcv)));
	const { data, xScale, xAccessor, displayXAccessor } =
		ScaleProvider(formattedOhlcv);
	const pricesDisplayFormat = format(".2f");
	const max = xAccessor(data[data.length - 1]);
	const min = xAccessor(data[Math.max(0, data.length - 100)]);
	const xExtents = [min, max + 5];

	const gridHeight = height - margin.top - margin.bottom;

	const elderRayHeight = 100;
	const elderRayOrigin = (_, h) => [0, h - elderRayHeight];
	const barChartHeight = gridHeight / 4;
	const barChartOrigin = (_, h) => [0, h - barChartHeight - elderRayHeight];
	const chartHeight = gridHeight - elderRayHeight;
	const yExtents = (data) => {
		return [data.high, data.low];
	};
	const dateTimeFormat = "%d %b %y %H:%M";
	const dateTimeDisplayFormat = timeFormat(dateTimeFormat);

	const myTimeFormat = "%H:%M";
	const timeDisplayFormat = timeFormat(myTimeFormat);

	const barChartExtents = (data) => {
		return data.volume;
	};

	const candleChartExtents = (data) => {
		return [data.high, data.low];
	};

	const yEdgeIndicator = (data) => {
		return data.close;
	};

	const volumeColor = (data) => {
		return data.close > data.open
			? "rgba(38, 166, 154, 0.3)"
			: "rgba(239, 83, 80, 0.3)";
	};

	const volumeSeries = (data) => {
		return data.volume;
	};

	const openCloseColor = (data) => {
		return data.close > data.open ? "#26a69a" : "#fc3734";
	};

	return (
		<ChartCanvas
		className="ReactFinancialChart"
			height={height}
			ratio={3}
			width={width}
			margin={margin}
			data={data}
			displayXAccessor={displayXAccessor}
			seriesName="Data"
			xScale={xScale}
			xAccessor={xAccessor}
			xExtents={xExtents}
			zoomAnchor={lastVisibleItemBasedZoomAnchor}
		>
			<Label
				x={50}
				y={20}
				fontSize="20"
				text={symbol?.toUpperCase() + "/" + vsCurrency?.toUpperCase()}
			/>
			{/* total volume traded */}
			<Chart
				id={2}
				height={barChartHeight}
				origin={barChartOrigin}
				yExtents={barChartExtents}
			>
				<BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
			</Chart>

			{/* main */}
			<Chart
				id={3}
				height={chartHeight - 30}
				yExtents={candleChartExtents}
				origin={[0, 30]}
			>
				<XAxis
					showGridLines={false}
					showTickLabel={false}
					strokeStyle="#777"
				/>
				<YAxis
					showGridLines={false}
					tickFormat={pricesDisplayFormat}
					tickLabelFill="#999"
					strokeStyle="#777"
				/>

				<CandlestickSeries />

				{/* blue line */}
				<LineSeries
					yAccessor={ema26.accessor()}
					strokeStyle={ema26.stroke()}
				/>

				{/* dot on blue line */}
				<CurrentCoordinate
					yAccessor={ema26.accessor()}
					fillStyle={ema26.stroke()}
				/>

				{/* red line */}
				<LineSeries
					yAccessor={ema12.accessor()}
					strokeStyle={ema12.stroke()}
				/>

				{/* dot on red line */}
				<CurrentCoordinate
					yAccessor={ema12.accessor()}
					fillStyle={ema12.stroke()}
				/>

				<MouseCoordinateY
					rectWidth={margin.right}
					displayFormat={pricesDisplayFormat}
				/>

				{/* number box at the end of the chart */}
				<EdgeIndicator
					itemType="last"
					rectWidth={margin.right}
					fill={openCloseColor}
					lineStroke={openCloseColor}
					displayFormat={pricesDisplayFormat}
					yAccessor={yEdgeIndicator}
				/>

				{/* legend for red and blue lines  */}
				{/* <MovingAverageTooltip
					origin={[8, 24]}
					options={[
						{
							yAccessor: ema26.accessor(),
							type: "EMA",
							stroke: ema26.stroke(),
							windowSize: ema26.options().windowSize,
						},
						{
							yAccessor: ema12.accessor(),
							type: "EMA",
							stroke: ema12.stroke(),
							windowSize: ema12.options().windowSize,
						},
					]}
				/> */}

				{/* <ZoomButtons /> */}

				{/* legend for opening high low close of where the cursor is */}
				<OHLCTooltip
					origin={[120, -10]}
					textFill={openCloseColor}
					labelFill="white"
					fontSize={13}
				/>
			</Chart>

			{/* elder ray chart shows bull bear power */}
			<Chart
				id={4}
				height={elderRayHeight}
				yExtents={[0, elder.accessor()]}
				origin={elderRayOrigin}
				padding={{ top: 8, bottom: 8 }}
			>
				<XAxis
					showGridLines={false}
					gridLinesStrokeStyle="#e0e3eb"
					tickLabelFill="#999"
					strokeStyle="#777"
					tickFormat={timeDisplayFormat}
				/>
				<YAxis
					ticks={4}
					tickFormat={pricesDisplayFormat}
					tickLabelFill="#999"
					strokeStyle="#777"
				/>

				{/* time display on bottom where cursor is */}
				<MouseCoordinateX displayFormat={dateTimeDisplayFormat} />

				{/* price display on the right where cursor is */}
				<MouseCoordinateY
					rectWidth={margin.right}
					displayFormat={pricesDisplayFormat}
				/>

				<ElderRaySeries yAccessor={elder.accessor()} />

				{/* Legend that says Elder ray */}
				<SingleValueTooltip
					yAccessor={elder.accessor()}
					yLabel="Elder Ray"
					yDisplayFormat={(d) =>
						`${pricesDisplayFormat(
							d.bullPower
						)}, ${pricesDisplayFormat(d.bearPower)}`
					}
					origin={[8, 16]}
				/>
			</Chart>

			<CrossHairCursor />
		</ChartCanvas>
	);
}

export default ReactFinancialChart;
