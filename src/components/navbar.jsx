import React from "react";
import { NavLink } from "react-router-dom";

const links = [
	["Home", "/"],
	["Listing", "/listing"],
	["Blog", "/blog"],
	["Contact", "/contact"],
];

const Navbar = ({ open, onClose }) => (
	<nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
		{links.map(([label, to]) => (
			<NavLink key={to} to={to} onClick={onClose}>
				{label}
			</NavLink>
		))}
	</nav>
);

export default Navbar;
