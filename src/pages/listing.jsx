import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cars } from "../assets/data";
import { parsePrice } from "../services/bookingService";

const CAR_TYPES = ["Coupe", "SUV", "Hatchback", "Sedan", "Convertible", "Van", "Grand Tourer"];
const PRICE_GROUPS = [
  { label: "$0 to $20000", min: 0, max: 20000 },
  { label: "$20000 to $30000", min: 20000, max: 30000 },
  { label: "$30000 to $50000", min: 30000, max: 50000 },
  { label: "$50000 to $90000", min: 50000, max: 90000 },
];

const ListingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sortBy, setSortBy] = useState("relevant");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  const filteredCars = useMemo(() => {
    let result = [...cars];

    if (selectedTypes.length) {
      result = result.filter((car) => selectedTypes.includes(car.category));
    }

    if (selectedPriceRanges.length) {
      result = result.filter((car) => {
        const value = parsePrice(car.purchasePrice);
        return selectedPriceRanges.some((group) => value >= group.min && value <= group.max);
      });
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => parsePrice(a.purchasePrice) - parsePrice(b.purchasePrice));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => parsePrice(b.purchasePrice) - parsePrice(a.purchasePrice));
    }
    return result;
  }, [selectedPriceRanges, selectedTypes, sortBy]);

  const toggleType = (type) => {
    setSelectedTypes((current) => (current.includes(type) ? [] : [type]));
  };

  const togglePriceRange = (range) => {
    setSelectedPriceRanges((current) =>
      current.some((item) => item.label === range.label) ? [] : [range],
    );
  };

  const goToCar = (carId) => navigate(`/listing/${carId}`);

  return (
    <main className="listing-page-shell">
      <aside className="listing-sidebar">
        <div className="sidebar-box">
          <h3>Sort By</h3>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="relevant">Relevant</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>

          </select>
        </div>

        <div className="sidebar-box">
          <h3>Car Type</h3>
          <div className="filter-list">
            {CAR_TYPES.map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="sidebar-box">
          <h3>Price Range</h3>
          <div className="filter-list">
            {PRICE_GROUPS.map((group) => (
              <label key={group.label}>
                <input
                  type="checkbox"
                  checked={selectedPriceRanges.some((item) => item.label === group.label)}
                  onChange={() => togglePriceRange(group)}
                />
                <span>{group.label}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      <section className="listing-grid-page">
        <div className="listing-grid">
          {filteredCars.map((car) => (
            <article key={car.id} className="listing-card" onClick={() => goToCar(car.id)}>
              <div className="listing-card-header">
                <div>
                  <h4>{car.name}</h4>
                  <p>{car.category}</p>
                </div>
                <span>{car.purchasePrice} | {car.rentalPrice}</span>
              </div>

              <div className="listing-image-wrap">
                <img src={car.image} alt={car.name} />

              </div>

              <div className="listing-spec-grid">
                <span>{car.transmission}</span>
                <span>{car.seats} Seats</span>
                <span>{car.fuel}</span>
                <span>{car.mileage}</span>
              </div>

              <p className="listing-card-description">{car.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ListingPage;
