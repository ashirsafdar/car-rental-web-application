import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Listing from "./pages/listing";
import CarDetails from "./pages/cardetails";
import Blog from "./pages/blog";
import Contact from "./pages/contact";
import MyBooking from "./pages/mybooking";
import LoginPage from "./pages/login";
import PaymentPage from "./pages/payment";
import { AppContextProvider } from "./context/AppContext";

const App = () => (
  <BrowserRouter>
    <AppContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/listing/:id" element={<CarDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mybooking" element={<MyBooking />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/payment/:bookingId" element={<PaymentPage />} />
      </Routes>
    </AppContextProvider>
  </BrowserRouter>
);

export default App;
