import React from "react";
import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaLinkedinIn,
} from "react-icons/fa";
import { assets } from "../assets/data";



const Footer = () => (
	<footer className="site-footer">
		<div className="footer-main page-wrap">
			<div className="footer-brand">
				<img src={assets.logo} alt="Rentroo" />
				<p>Find reliable car with transparent pricing, verified inspections, flexible pickup and delivery options, and 24/7 customer support.</p>
				<div className="footer-socials">
					<a href="https://www.facebook.com/" aria-label="Facebook"><FaFacebookF /></a>
					<a href="https://twitter.com/" aria-label="Twitter"><FaTwitter /></a>
					<a href="https://www.instagram.com/" aria-label="Instagram"><FaInstagram /></a>
					<a href="https://www.linkedin.com/" aria-label="LinkedIn"><FaLinkedinIn /></a>
				</div>
			</div>

			<div className="footer-links">
				<h3>Company</h3>
				<a href="#">About</a>
				<a href="#">Careers</a>
				<a href="#">Press</a>
				<a href="#">Blog</a>
				<a href="#">Partners</a>
			</div>

			<div className="footer-links">
				<h3>Support</h3>
				<a href="#">Help Center</a>
				<a href="#">Safety Information</a>
				<a href="#">Cancellation Options</a>
				<a href="#">Contact Us</a>
				<a href="#">Accessibility</a>
			</div>

			<div className="footer-newsletter">
				<h3>Stay Updated</h3>
				<p>Subscribe to our newsletter for inspiration and special offers.</p>
				<form className="subscribe-form">
					<input type="email" placeholder="Your email" aria-label="Email address" />
					<button type="submit">Subscribe</button>
				</form>
			</div>
		</div>

		<div className="footer-bottom page-wrap">
			<p>© 2025 Rentroo. All rights reserved.</p>
			<nav aria-label="Legal links">
				<a href="#">Privacy</a>
				<a href="#">Terms</a>
				<a href="#">Sitemap</a>
			</nav>
		</div>
	</footer>
);

export default Footer;
