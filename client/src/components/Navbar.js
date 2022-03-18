import React from "react";
import LogoIcon from "../assets/LogoIcon.jpg";
import MenuIcon from "../assets/MenuIcon.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Navbar.css";

function Navbar() {
	return (
		<nav className="Navbar_nav">
			<img className="Navbar_logo_icon" src={LogoIcon} alt="Logo Icon" />
			<h2>Social Street</h2>
			<img className="Navbar_menu_icon" src={MenuIcon} alt="Menu Icon" />
			<AccountCircleIcon className="Navbar_account_icon" />
		</nav>
	);
}

export default Navbar;
