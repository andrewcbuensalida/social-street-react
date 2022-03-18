import React from "react";
import './MarketFilter.css'

function MarketFilter() {
	return (
		<div className="MarketFilter_filter">
			<div className="MarketFilter_spot">SPOT</div>
			<div className="MarketFilter_fiat">FIAT</div>
			<div className="MarketFilter_recent">RECENT</div>
		</div>
	);
}

export default MarketFilter;
