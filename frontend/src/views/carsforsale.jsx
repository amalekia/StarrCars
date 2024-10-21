import React, { useState, useEffect, useCallback } from "react";
import "../styles/carsforsale.css";

const CarsForSale = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");

  const carsPerPage = 20;

  // Fetch all cars or filtered by location
  const fetchCars = useCallback(
    (page = 1) => {
      setLoading(true);
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/cars${
          locationFilter ? `/location/${locationFilter}` : ""
        }`
      )
        .then((response) => {
          const totalCars = response.data.length;
          const pages = Math.ceil(totalCars / carsPerPage);
          setTotalPages(pages);
          const carsSlice = response.data.slice(
            (page - 1) * carsPerPage,
            page * carsPerPage
          );
          setCars(carsSlice);
        })
        .catch((error) => {
          console.error("Error fetching cars:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [locationFilter, carsPerPage]
  );

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchCars(page);
  };

  // Handle location filter change
  const handleLocationChange = (e) => {
    setLocationFilter(e.target.value);
    setCurrentPage(1);
    fetchCars(1); // Fetch from the first page after location changes
  };

  useEffect(() => {
    fetchCars(currentPage);
  }, [currentPage, fetchCars]);

  return (
    <div className="cars-list">
      <h1>Used Cars</h1>

      {/* Filter by Location */}
      <div className="filter-location">
        <label>Filter by Location:</label>
        <input
          type="text"
          value={locationFilter}
          onChange={handleLocationChange}
          placeholder="Enter location"
        />
      </div>

      {/* Loading Spinner */}
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
  );
};

export default CarsForSale;
