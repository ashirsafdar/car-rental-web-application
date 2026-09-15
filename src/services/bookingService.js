export const STORAGE_KEYS = {
  user: "rentroo-user",
  bookings: "rentroo-bookings",
  email: "rentroo-last-email",
};

export const createBookingId = () =>
  `bk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const formatCurrency = (value) => {
  const parsedValue = Number(value ?? 0);
  if (Number.isNaN(parsedValue)) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(parsedValue);
};

export const parsePrice = (value) => {
  if (typeof value === "number") return value;
  const numeric = Number(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
};

export const calculateRentalSummary = (pickupDate, dropoffDate, dailyRate) => {
  if (!pickupDate || !dropoffDate) {
    return { totalDays: 0, totalAmount: 0 };
  }

  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);

  if (Number.isNaN(pickup.getTime()) || Number.isNaN(dropoff.getTime())) {
    return { totalDays: 0, totalAmount: 0 };
  }

  const differenceInMs = dropoff.getTime() - pickup.getTime();
  const totalDays = Math.max(1, Math.ceil(differenceInMs / (1000 * 60 * 60 * 24)));
  const totalAmount = Number(dailyRate) * totalDays;

  return { totalDays, totalAmount };
};

export const formatDateDisplay = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

export const prepareBookingEmail = (booking, user) => {
  const emailTo = user?.email || booking?.ownerEmail || "user@example.com";
  const body = [
    "Your Booking Details",
    "",
    `Booking ID: ${booking.bookingId}`,
    `Car: ${booking.carName}`,
    `Agency: ${booking.ownerName}`,
    `Location: ${booking.location || "N/A"}`,
    `Pick-Up: ${formatDateDisplay(booking.pickupDate)}`,
    `Drop-Off: ${formatDateDisplay(booking.dropoffDate)}`,
    `Number of Days: ${booking.totalDays}`,
    `Booking Amount: ${booking.totalAmount}`,
    `Payment Status: ${booking.paymentStatus}`,
    "",
    "Thank you for choosing Rentroo. We look forward to helping you with your trip.",
    "For support, contact hello@rentroo.com or call +1 (800) 555-RENT.",
  ].join("\n");

  return {
    to: emailTo,
    subject: "Car Booking Confirmation - Rentroo",
    body,
  };
};
