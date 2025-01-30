import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import "../styles/carsforsale.css";
import { Link } from "react-router-dom";
import { Box, Grid2, FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';
import { useAuth } from "../auth/auth-provider";

const CarsForSale = () => {
  const { user } = useAuth();
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

  const handleDelete = (carId) => {
    if (window.confirm("Are you sure you want to delete this car post?")) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_SERVER_URL}/cars/${carId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        })
        .then(() => {
          fetchCars(currentPage);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false); 
        });
    }
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
        <Box className="filter-container" mb={3}>
          <Grid2 container spacing={2} justifyContent="center">
            <Grid2 xs={12} sm={10} md={6}>
              <FormControl>
                <InputLabel>Filter by Location</InputLabel>
                <MuiSelect
                  value={locationFilter}
                  onChange={(event) => setLocationFilter(event.target.value)}
                  displayEmpty
                  style={{ minWidth: "350px" }}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </MuiSelect>
              </FormControl>
            </Grid2>
            <Grid2 xs={12} sm={10} md={6}>
              <Button
                variant="danger"
                onClick={() => setLocationFilter("")}
              >
                Remove Filter
              </Button>
            </Grid2>
          </Grid2>
        </Box>

        {loading ? (
          <div className="loading-message">Loading cars...</div>
        ) : cars.length === 0 ? (
          <div className="loading-message">Oops, seems like nobody wants to sell their car this time around!</div>
        ) : (
          <>
            <div className="cars-grid">
              {cars.map((car) => (
                <div key={car._id} className="car-item">
                  {car.images && car.images.length > 0 && (
                    <Link to={`/viewcar/${car._id}`}>
                      <img src={car.images[0]} alt="Car" />
                    </Link>
                  )}
                  <h4>
                    <Link
                      to={`/viewcar/${car._id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        fontWeight: "bold",
                      }}
                    >
                      {car.year} {car.carMake} {car.carModel}
                    </Link>
                  </h4>
                  <p>
                    <strong>Location:</strong> {car.location}
                  </p>
                  <p>
                    <strong>Price:</strong> ${car.price}
                  </p>
                  {user._id === car.creator && (
                    <Button variant="secondary" onClick={() => handleDelete(car._id)}>
                      Delete Post
                    </Button>
                  )}
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
