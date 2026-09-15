import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { formatDateDisplay } from "../services/bookingService";

const MyBooking = () => {
  const navigate = useNavigate();
  const { user, bookings } = useAppContext();

  const myBookings = useMemo(() => {
    if (!user) return [];
    return bookings.filter((booking) => booking.userEmail === user.email);
  }, [bookings, user]);

  const confirmation = (() => {
    try {
      return JSON.parse(localStorage.getItem("rentroo-last-email") || "null");
    } catch {
      return null;
    }
  })();

  const handlePayNow = (bookingId) => {
    navigate(`/payment/${bookingId}`);
  };

  if (!user) {
    return (
      <main className="simple-page">
        <h1>My Bookings</h1>
        <p>Please log in to see your bookings.</p>
        <Link to="/login" className="primary-button inline-button">Login</Link>
      </main>
    );
  }

  return (
    <main className="booking-page-shell">
      {confirmation ? (
        <div className="confirmation-banner">
          <strong>Confirmation email prepared:</strong> {confirmation.to} — subject: {confirmation.subject}
        </div>
      ) : null}

      <div className="booking-list">
        {myBookings.length === 0 ? (
          <div className="empty-bookings">
            <h2>No bookings yet</h2>
            <p>Your upcoming bookings will appear here once you reserve a car.</p>
            <Link to="/listing" className="primary-button inline-button">Browse Cars</Link>
          </div>
        ) : (
          myBookings.map((booking) => (
            <article key={booking.bookingId} className="booking-card">
              <div className="booking-main-row">
                <img src={booking.carImage} alt={booking.carName} />
                <div className="booking-headline">
                  <h3>{booking.carName}</h3>
                  <p>Seats {booking.seats} | Total: {booking.totalAmount}</p>
                  <span>{booking.location}</span>
                </div>
                <div className="booking-side">
                  <div className={booking.paymentStatus === "Paid" ? "payment-pill payment-pill--paid" : "payment-pill payment-pill--pending"}>
                    Payment: {booking.paymentStatus === "Paid" ? "Paid" : "Unpaid"}
                  </div>
                  {booking.paymentStatus === "Paid" ? (
                    <button type="button" className="secondary-button disabled-button" disabled>
                      Paid
                    </button>
                  ) : (
                    <button type="button" className="primary-button small-button" onClick={() => handlePayNow(booking.bookingId)}>
                      Pay Now
                    </button>
                  )}
                </div>
              </div>

              <div className="booking-meta-row">
                <span>Booking ID: {booking.bookingId}</span>
                <span>Pick-Up: {formatDateDisplay(booking.pickupDate)}</span>
                <span>Drop-Off: {formatDateDisplay(booking.dropoffDate)}</span>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  );
};

export default MyBooking;
