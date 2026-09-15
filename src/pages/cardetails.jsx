import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cars } from "../assets/data";
import { useAppContext } from "../context/AppContext";
import { createBookingId, formatCurrency, parsePrice } from "../services/bookingService";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, bookings, setBookings } = useAppContext();
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState({ totalDays: 0, totalAmount: 0 });

  const car = useMemo(() => cars.find((item) => item.id === id) || cars[0], [id]);
  const validateDates = () => {
    if (!pickupDate) {
      setError("Please choose a pick-up date.");
      return false;
    }

    if (!dropoffDate) {
      setError("Please choose a drop-off date.");
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);

    if (pickup < today || dropoff < today) {
      setError("Dates cannot be in the past.");
      return false;
    }

    if (dropoff <= pickup) {
      setError("Drop-off date must be after the pick-up date.");
      return false;
    }

    const totalDays = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));
    const dailyRate = parsePrice(car.rentalPrice);
    const totalAmount = dailyRate * totalDays;

    setSummary({ totalDays, totalAmount });
    setError("");
    return true;
  };

  const handleBookCar = () => {
    const valid = validateDates();
    if (!valid) return;

    if (!user) {
      navigate("/login");
      return;
    }

    const booking = {
      bookingId: createBookingId(),
      carId: car.id,
      carName: car.name,
      carImage: car.image,
      seats: car.seats,
      rentalPrice: car.rentalPrice,
      pickupDate,
      dropoffDate,
      totalDays: summary.totalDays,
      totalAmount: formatCurrency(summary.totalAmount),
      ownerName: car.owner.name,
      ownerEmail: car.owner.email,
      ownerPhone: car.owner.phone,
      paymentStatus: "Unpaid",
      location: car.location,
      userEmail: user.email,
    };

    const nextBookings = [...bookings, booking];
    setBookings(nextBookings);
    navigate("/mybooking");
  };

  return (
    <main className="listing-details-page">
      <div className="details-shell">
        <div className="details-left">
          <div className="detail-location">📍 {car.location}</div>
          <h1>{car.name}</h1>
          <div className="detail-meta-row">
            <span className="detail-category">{car.category}</span>
            <span className="detail-price">{car.purchasePrice} | {car.rentalPrice}</span>
          </div>

          <div className="detail-specs-row">
            <span>{car.transmission}</span>
            <span>{car.seats} Seats</span>
            <span>{car.fuel}</span>
            <span>{car.mileage} mi</span>
          </div>

          <div className="detail-description-block">
            <h3>Car Details</h3>
            <p>{car.description}</p>
          </div>

          <div className="detail-features-block">
            <h3>Features</h3>
            <div className="feature-pills">
              {car.features?.map((feature) => (
                <span key={feature}>{feature}</span>
              ))}
            </div>
          </div>

          <div className="date-picker-panel">
            <div className="date-inputs">
              <label>
                <span>Pick Up</span>
                <input type="date" value={pickupDate} onChange={(event) => setPickupDate(event.target.value)} />
              </label>

              <label>
                <span>Drop Off</span>
                <input type="date" value={dropoffDate} onChange={(event) => setDropoffDate(event.target.value)} />
              </label>
            </div>

            {error ? <p className="auth-error">{error}</p> : null}

            {summary.totalDays > 0 ? (
              <div className="booking-summary-box">
                <strong>{summary.totalDays} day(s)</strong>
                <span>Total: {formatCurrency(summary.totalAmount)}</span>
              </div>
            ) : null}

            <button className="primary-button" type="button" onClick={validateDates}>
              Check Dates
            </button>
          </div>

          <div className="owner-card">
            <h3>For Buying Contact</h3>
            <div className="owner-row">
              <div className="owner-avatar">A</div>
              <div>
                <div className="owner-name">{car.owner.name} <span>{car.owner.badge}</span></div>
                <div className="owner-office">{car.owner.office}</div>
              </div>
            </div>
            <div className="owner-contact-row">
              <span>📞 {car.owner.phone}</span>
            </div>
            <div className="owner-contact-row">
              <span>✉️ {car.owner.email}</span>
            </div>
            <div className="owner-actions">
              <button type="button" className="secondary-button">Send Email</button>
              <button type="button" className="secondary-button">Call Now</button>
            </div>
          </div>
        </div>

        <div className="details-right">
          <div className="car-gallery">
            <div className="gallery-main">
              <img src={car.image} alt={car.name} />
            </div>
          </div>

          <button type="button" className="primary-button book-button" onClick={handleBookCar}>
            Book Car
          </button>
        </div>
      </div>
    </main>
  );
};

export default CarDetails;
