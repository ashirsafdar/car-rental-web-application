import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { formatCurrency, formatDateDisplay, prepareBookingEmail } from "../services/bookingService";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { bookings, setBookings, user } = useAppContext();

  const booking = useMemo(
    () => bookings.find((item) => item.bookingId === bookingId) || null,
    [bookings, bookingId],
  );

  const [form, setForm] = useState({
    cardholder: user?.name || "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [error, setError] = useState("");

  if (!booking) {
    return (
      <main className="simple-page">
        <h2>Booking not found</h2>
        <p>We could not locate that booking.</p>
      </main>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.cardholder || !form.cardNumber || !form.expiry || !form.cvv) {
      setError("Please complete all payment form fields.");
      return;
    }

    if (form.cardNumber.replace(/\s+/g, "").length < 12) {
      setError("Please enter a valid card number.");
      return;
    }

    if (form.cvv.length < 3) {
      setError("CVV should be at least 3 digits.");
      return;
    }

    const updatedBookings = bookings.map((item) =>
      item.bookingId === bookingId
        ? { ...item, paymentStatus: "Paid" }
        : item,
    );

    setBookings(updatedBookings);
    localStorage.setItem("rentroo-last-email", JSON.stringify(prepareBookingEmail({ ...booking, paymentStatus: "Paid" }, user)));

    navigate("/mybooking");
  };

  return (
    <main className="payment-page">
      <div className="payment-panel">
        <div className="payment-summary">
          <h1>Payment</h1>
          <div className="summary-item">
            <span>Car</span>
            <strong>{booking.carName}</strong>
          </div>
          <div className="summary-item">
            <span>Rental dates</span>
            <strong>
              {formatDateDisplay(booking.pickupDate)} - {formatDateDisplay(booking.dropoffDate)}
            </strong>
          </div>
          <div className="summary-item">
            <span>Number of days</span>
            <strong>{booking.totalDays}</strong>
          </div>
          <div className="summary-item">
            <span>Total amount</span>
            <strong>{formatCurrency(booking.totalAmount)}</strong>
          </div>
        </div>

        <form className="payment-form" onSubmit={handleSubmit}>
          <h2>Secure Checkout</h2>

          <label>
            <span>Card holder name</span>
            <input
              type="text"
              name="cardholder"
              value={form.cardholder}
              onChange={handleChange}
              placeholder="Jane Doe"
            />
          </label>

          <label>
            <span>Card number</span>
            <input
              type="text"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
            />
          </label>

          <div className="payment-split">
            <label>
              <span>Expiry date</span>
              <input
                type="text"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
              />
            </label>

            <label>
              <span>CVV</span>
              <input
                type="password"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                placeholder="123"
              />
            </label>
          </div>

          {error ? <p className="auth-error">{error}</p> : null}

          <button type="submit" className="primary-button">
            Pay {formatCurrency(booking.totalAmount)}
          </button>
        </form>
      </div>
    </main>
  );
};

export default PaymentPage;
