import React, { useState, useEffect, useCallback } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import "../styles/carsforsale.css";

const CarsForSale = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");

  const options = [
    { value: "anaheim", label: "Anaheim" },
    { value: "bakersfield", label: "Bakersfield" },
    { value: "berkeley", label: "Berkeley" },
    { value: "chico", label: "Chico" },
    { value: "chula-vista", label: "Chula Vista" },
    { value: "fresno", label: "Fresno" },
    { value: "irvine", label: "Irvine" },
    { value: "long-beach", label: "Long Beach" },
    { value: "los-angeles", label: "Los Angeles" },
    { value: "merced", label: "Merced" },
    { value: "modesto", label: "Modesto" },
    { value: "monterey", label: "Monterey" },
    { value: "oakland", label: "Oakland" },
    { value: "oceanside", label: "Oceanside" },
    { value: "pasadena", label: "Pasadena" },
    { value: "redding", label: "Redding" },
    { value: "riverside", label: "Riverside" },
    { value: "sacramento", label: "Sacramento" },
    { value: "san-diego", label: "San Diego" },
    { value: "san-francisco", label: "San Francisco" },
    { value: "san-jose", label: "San Jose" },
    { value: "san-luis-obispo", label: "San Luis Obispo" },
    { value: "santa-ana", label: "Santa Ana" },
    { value: "santa-barbara", label: "Santa Barbara" },
    { value: "santa-cruz", label: "Santa Cruz" },
    { value: "santa-rosa", label: "Santa Rosa" },
    { value: "stockton", label: "Stockton" },
    { value: "sunnyvale", label: "Sunnyvale" },
    { value: "vallejo", label: "Vallejo" },
    { value: "ventura", label: "Ventura" },
    { value: "victorville", label: "Victorville" },
    { value: "visalia", label: "Visalia" }
  ];

  const carsPerPage = 20;

  const fetchCars = useCallback(
    (page = 1) => {
      setLoading(true);
      const locationQuery = locationFilter ? `?location=${locationFilter}` : "";
      fetch(`${process.env.REACT_APP_SERVER_URL}/cars${locationQuery}`)
        .then((response) => response.json())
        .then((data) => {
          const totalCars = data.length;
          const pages = Math.ceil(totalCars / carsPerPage);
          setTotalPages(pages);
          setCars(data.slice((page - 1) * carsPerPage, page * carsPerPage));
        })
        .catch((error) => console.error("Error fetching cars:", error))
        .finally(() => setLoading(false));
    },
    [carsPerPage, locationFilter]
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchCars(page);
  };

  const handleLocationChange = (selectedOption) => {
    setLocationFilter(selectedOption?.value || "");
    setCurrentPage(1);
    fetchCars(1);
  };

  useEffect(() => {
    fetchCars(currentPage);
  }, [currentPage, fetchCars]);

  return (
    <div className="cars-for-sale-container">
      <header className="cars-header">
        <h1 className="cars-title">Explore Our Used Cars</h1>
        <p className="cars-subtitle">Find your dream car today!</p>
      </header>
      <section className="cars-section">
        <div className="filter-container">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              fetchCars(1);
            }}
          >
            <Form.Group>
              <Form.Label className="filter-label">Filter by Location:</Form.Label>
              <Select options={options} onChange={handleLocationChange} />
            </Form.Group>
          </Form>
        </div>

        {loading ? (
          <div className="loading-message">Loading cars...</div>
        ) : (
          <>
            <div className="cars-grid">
              {cars.map((car) => (
                <div key={car.id} className="car-item">
                  <h4>
                    {car.year} {car.carMake} {car.carModel}
                  </h4>
                  <p>Location: {car.location}</p>
                  <p>Price: ${car.price}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`pagination-button ${
                    index + 1 === currentPage ? "active" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default CarsForSale;
