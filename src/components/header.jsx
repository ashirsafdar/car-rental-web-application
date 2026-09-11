import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { assets } from "../assets/data";

const SearchIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><
    circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
const UserIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="8" r="3.5" /><path d="M5 21c.7-3.4 3-5 7-5s6.3 1.6 7 5" /></svg>;

const Header = () => {
	const [open, setOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<header className="site-header">
			<div className="header-inner">
				<Link to="/" className="brand" aria-label="Rentroo home">
					<img src={assets.logo} alt="Rentroo"  />
				</Link>
				<Navbar open={open} onClose={() => setOpen(false)} />
				<div className="header-actions">
					<button className="icon-button" aria-label="Search" onClick={() => navigate("/listing")}><SearchIcon /></button>
					<button className="login-button" onClick={() => navigate("/login")}>Login <UserIcon /></button>
					<button className="menu-button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
						{open ? "×" : "☰"}
					</button>
				</div>
			</div>
			{location.pathname !== "/" && <div className="route-spacer" />}
		</header>
	);
};

export default Header;
