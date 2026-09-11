import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Listing from "./pages/listing";
import Blog from "./pages/blog";
import Contact from "./pages/contact";
import MyBooking from "./pages/mybooking";
import { AppContextProvider } from "./context/AppContext";

const Login = () => (
	<main className="simple-page">
		<p className="eyebrow">WELCOME BACK</p>
		<h1>Sign in to Rentroo</h1>
		<p>Authentication can be connected here when your provider is configured.</p>
	</main>
);

const App = () => (
	<BrowserRouter>
		<AppContextProvider>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/listing" element={<Listing />} />
				<Route path="/listing/:id" element={<Listing />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/mybooking" element={<MyBooking />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</AppContextProvider>
	</BrowserRouter>
);

export default App;
