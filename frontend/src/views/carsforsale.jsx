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
    { value: 'bakersfield', label: 'Bakersfield' },
    { value: 'chico', label: 'Chico' },
    { value: 'fresno', label: 'Fresno' },
    { value: 'los-angeles', label: 'Los Angeles' },
    { value: 'merced', label: 'Merced' },
    { value: 'modesto', label: 'Modesto' },
    { value: 'monterey', label: 'Monterey' },
    { value: 'redding', label: 'Redding' },
    { value: 'riverside', label: 'Riverside' },
    { value: 'sacramento', label: 'Sacramento' },
    { value: 'san-diego', label: 'San Diego' },
    { value: 'san-francisco', label: 'San Francisco' },
    { value: 'san-luis-obispo', label: 'San Luis Obispo' },
    { value: 'santa-barbara', label: 'Santa Barbara' },
    { value: 'santa-cruz', label: 'Santa Cruz' },
    { value: 'stockton', label: 'Stockton' },
  ];

  const carsPerPage = 20;

  // Fetch all cars or filtered by location
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
          if (totalCars === 0) {
            setCars([]);
          } else {
            const carsSlice = data.slice(
              (page - 1) * carsPerPage,
              page * carsPerPage
            );
            setCars(carsSlice);
          }
        })
        .catch((error) => {
          console.error("Error fetching cars:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [carsPerPage, locationFilter]
  );

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchCars(page);
  };

  // Handle location filter change
  const handleLocationChange = (selectedOption) => {
    setLocationFilter(selectedOption.value);
    setCurrentPage(1);
    fetchCars(1); // Fetch from the first page after location changes
  };

  useEffect(() => {
    fetchCars(currentPage);
  }, [currentPage, fetchCars]);

  return (
    <div style={{ 
      color: "darkblue", 
      background: "linear-gradient(to bottom, silver, blue)", 
      minHeight: "100vh",
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <div className="cars-list">
        <h1>Used Cars</h1>

        {/* Filter by Location */}
        <div className="filter-location">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              fetchCars(1);
            }}
          >
            <Form.Group>
              <Form.Label>Filter by Location:</Form.Label>
              <Select
                options={options}
                onChange={handleLocationChange}
              />
            </Form.Group>
          </Form>
        </div>
        {loading ? (
          <div>Loading cars...</div>
        ) : (
          <>
            {/* Cars List */}
            <div className="cars-grid">
              {cars.map((car) => (
                <div key={car.id} className="car-item">
                  <h2>
                    {car.make} {car.model}
                  </h2>
                  <p>Year: {car.year}</p>
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
                  className={index + 1 === currentPage ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CarsForSale;
