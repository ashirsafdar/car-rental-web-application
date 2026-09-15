import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/data";
import Footer from "../components/footer";
import Car360Video from "../components/car360video";


const Icon = ({ children }) => <span className="field-icon">{children}</span>;
const Pin = () => <svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
const Calendar = () => <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 9h18" /></svg>;
const Search = () => <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
const Sliders = () => <svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16M8 4v4M15 10v4M10 16v4" /></svg>;

const features = [
  ["Quick Service", "Book in seconds with instant confirmations and flexible pickup options, so you get on the road fast without waiting or hassles."],
  ["Wide Vehicle Selection", "Choose from economy to luxury models, regularly maintained and verified, giving you reliable performance and the perfect car for every trip."],
  ["Transparent Pricing", "Upfront rates with no hidden fees, clear breakdowns for insurance and extras, so pricing stays predictable and easy to understand before booking."],
  ["24/7 Support", "Around the clock customer support via chat and phone, resolving issues quickly and helping with changes, extensions, or roadside assistance anytime you need."],
];

const cars = [
  ["Hyundai Sonata N Line", "Sedan", "11,500,000", "14000 / day", "Automatic", "6", "Hybrid", "18500", assets.sonata, "Compact Sedan built for efficient city driving,  powerful 290-horsepower ...", "Silver"],
  ["Toyota corolla E140", "Sedan", "3,500,000", "7000 / day", "Manual", "6", "Petrol", "295000", assets.corolla, "Four-door executive sedan focused on comfort and Reliability. Smooth ride,...", "White"],
  ["Kia Sportage L", "Crossover SUV", "6,200,000", "9500 / day", "Automatic", "6", "Petrol", "12000", assets.kia, "All Good performance Crossover offering instant torque, precise handling, and...", "Dark-Grey"],
  ["Toyota Revo GR", "Pickup truck", "9,000,000", "15000 / day", "Automatic", "6", "Diesel", "90000", assets.pickup, "Monster with a refined chassis and retractable top for open-air driving...", "White"],
  ["Jaecoo J5", "Crossover SUV", "7,800,000", "11000 / day", "Automatic", "5", "Petrol", "18000", assets.jaecoo, "Modern crossover SUV with a refined cabin, confident styling, and smooth everyday performance.", "Dark-Grey"],
  ["Jetour T2", "Adventure SUV", "8,900,000", "12500 / day", "Automatic", "5", "Petrol", "22000", assets.jetour, "Rugged adventure SUV with generous space, strong road presence, and capable all-terrain comfort.", "Gray"],
  ["Changan X7", "Family SUV", "6,900,000", "9800 / day", "Automatic", "7", "Petrol", "16000", assets.changan, "Spacious family SUV offering practical seating, modern technology, and a comfortable ride.", "Blue"],
  ["MG HS", "Compact SUV", "6,500,000", "9200 / day", "Automatic", "5", "Petrol", "14500", assets.mgSuv, "Comfortable compact SUV with responsive handling, contemporary design, and useful everyday features.", "Silver"],
  ["BYD Atto 3", "Electric SUV", "7,400,000", "10500 / day", "Automatic", "5", "Electric", "9000", assets.electricSuv, "Quiet electric SUV with instant torque, a modern interior, and efficient city performance.", "White"],
  ["Honda Civic RS", "Sedan", "5,900,000", "8500 / day", "Automatic", "5", "Petrol", "12500", assets.civic, "Sporty sedan with precise handling, efficient performance, and a comfortable premium cabin.", "White"],
  ["Toyota Prado", "Luxury SUV", "12,500,000", "18000 / day", "Automatic", "7", "Diesel", "30000", assets.prado, "Premium SUV built for long-distance comfort, dependable capability, and confident touring.", "Silver"],
  ["Toyota Corolla Altis", "Sedan", "4,200,000", "7600 / day", "Automatic", "5", "Petrol", "21000", assets.toyotaSedan, "Reliable sedan with efficient performance, easy handling, and a comfortable daily-driving setup.", "Silver"],
];

const partnerLogos = [
  [assets.toyota, "Rentroo"],
  [assets.kn, "Land Cruiser"],
  [assets.deepal, "Haval"],
  [assets.honda, "Kia"],
  [assets.tesla, "Toyota"],
  [assets.roll, "Premium fleet"],
   [assets.mercedes, "Premium fleet"],
    [assets.lexus, "Premium fleet"],
     [assets.bmw, "Premium fleet"],
];

const BookingForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ destination: "", pickup: "", dropoff: "" });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    sessionStorage.setItem("rentroo-search", JSON.stringify(form));
    navigate("/listing");

  };
  return (
    <form className="booking-form" onSubmit={submit}>
      <label><span><Icon><Pin /></Icon>Destination</span><input name="destination" value={form.destination} onChange={update} placeholder="Type Here..." /></label>
      <label><span><Icon><Calendar /></Icon>Pick Up</span><input name="pickup" value={form.pickup} onChange={update} type="date" /></label>
      <label><span><Icon><Calendar /></Icon>Drop Off</span><input name="dropoff" value={form.dropoff} onChange={update} type="date" /></label>
      <button className="search-submit" type="submit"><Search />Search</button>

    </form>
  );
};

const VehicleCard = ({ car }) => (
  <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm shadow-black/10 transition duration-300 hover:-translate-y-1 hover:shadow-md">
    <img src={car[8]} alt={car[0]} className="h-44 w-full rounded-md object-cover" />

    <div className="mt-4 flex flex-1 flex-col px-1">
      <h3 className="text-xl font-semibold text-gray-900">{car[0]}</h3>
      <p className="mt-2 text-sm text-gray-500">{car[1]}</p>

      <p className="mt-3 text-base font-semibold text-sky-500">
        {car[2]} <span className="text-gray-400">|</span> {car[3]}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-sm text-zinc-500">
        <span className="rounded-full bg-gray-100 px-2 py-1">{car[4]}</span>
        <span className="rounded-full bg-gray-100 px-2 py-1">{car[5]} Seats</span>
        <span className="rounded-full bg-gray-100 px-2 py-1">{car[6]}</span>
      </div>

      <div className="mt-4 border-t border-gray-200 pt-3 text-sm text-zinc-500">
        <div className="flex items-center justify-between gap-3">
          <span>{car[7]} km</span>
          <span>{car[1]}</span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-500">{car[9]}</p>
    </div>
  </article>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="home-page">
    <section className="hero-section">
      <div className="page-wrap hero-content">
        <p className="eyebrow">THE ROAD IS YOURS</p>
        <h1>Explore <mark>Premium Vehicles</mark> Available In Exciting Destinations</h1>
        <BookingForm />
        <Car360Video
          image={assets.heroCar}
          video="/lc300-video.mp4"
          alt="White Toyota Land Cruiser LC300"
        />
      </div>
    </section>

    <section className="trust-section page-wrap">
      <div className="trust-copy">
        <p className="eyebrow">Your Trusted Car Showroom Partner</p>
        <h2>Helping You Every Step Of The Way</h2>
        <p className="lead">Find reliable car with transparent pricing, verified inspections, flexible pickup and delivery options, and 24/7 customer support for a smooth rental or buying experience.</p>
        <div className="feature-grid">
          {features.map(([title, text]) =>
            <article className="feature-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p></article>)}</div>
      </div>
      <div className="supporting-images">
        <img className="tall-image" src={assets.haval} alt="Black Haval SUV" />
        <img className="short-image" src={assets.jetour} alt="Gray Kia SUV" />
      </div>
    </section>
    <section className="marquee-section page-wrap" aria-label="Rentroo fleet partners">
      <div className="marquee-window">
        <div className="marquee-inner">
          {[...partnerLogos, ...partnerLogos].map(([image, name], index) => (
            <img key={`${name}-${index}`} src={image} alt={name} draggable="false" />
          ))}
        </div>
      </div>
    </section>

    <section className="listing page-wrap">
      <div className="listing-intro">
        <div>
          <p className="eyebrow">Your Next Car Awaits</p>
          <h2>Start Driving With Ease</h2>
        </div>
        <p className="lead">Find reliable car with transparent pricing, verified inspections, flexible pickup and delivery options, and 24/7 customer support for a smooth rental or buying experience.</p>
      </div>
      <div className="listing-toolbar">
        <strong>Displaying 1–12 from 3k listings</strong>
        <button className="filter-button" aria-label="Filter listings">
          <Sliders />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cars.map((car) => (
          <VehicleCard car={car} key={car[0]} />
        ))}
      </div>
    </section>

    <section className="cta-section page-wrap">
      <div className="cta-image">
        <img
          src={assets.RR}
          alt="Premium vehicle"
        />
      </div>

      <div className="cta-content">
        <h2>
          Buy With Confidence,
          <br />
          Rent Without Worry
        </h2>

        <p>
          Find your next ride or earn from your vehicle in minutes.
          We handle insurance, driver verification and secure payments.
        </p>

        <button
          className="cta-button"
          onClick={() => navigate("/listing")}
        >
          Explore Cars
        </button>
      </div>
    </section>
    <Footer />
    </main>
  );
};
export default Home;
