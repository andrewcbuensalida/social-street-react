import React from "react";
import { Link } from "react-router-dom";
import LogoIcon from "../assets/LogoIcon.jpg";
import MenuIcon from "../assets/MenuIcon.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Navbar.css";

function Navbar() {
	return (
		<nav className="Navbar_nav">
			<Link to="/">
				<img
					className="Navbar_logo_icon"
					src={LogoIcon}
					alt="Logo Icon"
				/>{" "}
			</Link>

			<h2>
				<Link to="/" className="Navbar_company_name">
					Social Street
				</Link>
			</h2>

			<img className="Navbar_menu_icon" src={MenuIcon} alt="Menu Icon" />
			<AccountCircleIcon className="Navbar_account_icon" />
		</nav>
	);
}

export default Navbar;
