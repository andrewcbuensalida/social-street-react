import React from "react";
import "./SideInfo.css";

function SideInfo() {
	return (
		<div>
			<div className="SideInfo_row">
				<div>Base currency:</div>
				<div className="SideInfo_content">asdf</div>
			</div>
			<div className="SideInfo_row">
				<div>Quote currency:</div>
				<div className="SideInfo_content">asdf</div>
			</div>{" "}
			<div className="SideInfo_row">
				<div>Change today:</div>
				<div className="SideInfo_content">asdf</div>
			</div>{" "}
			<div className="SideInfo_row">
				<div>24h volume:</div>
				<div className="SideInfo_content">asdf</div>
			</div>
			<div className="SideInfo_row">
				<div>Minimum order size:</div>
				<div className="SideInfo_content">asdf</div>
			</div>{" "}
			<div className="SideInfo_row">
				<div>Minimum size increment:</div>
				<div className="SideInfo_content">asdf</div>
			</div>{" "}
			<div className="SideInfo_row">
				<div>Minimum price increment:</div>
				<div className="SideInfo_content">asdf</div>
			</div>
		</div>
	);
}

export default SideInfo;
