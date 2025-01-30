import React, { useState } from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";
import FullScreenSpinner from "../components/fullscreen-spinner";
import "../styles/sellcar.css";
import ErrorPage from "./errorpage";
import {useAuth} from "../auth/auth-provider";

const SellCarPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  const options = [
    { value: "bakersfield", label: "Bakersfield" },
    { value: "chico", label: "Chico" },
    { value: "fresno", label: "Fresno" },
    { value: "los-angeles", label: "Los Angeles" },
    { value: "merced", label: "Merced" },
    { value: "modesto", label: "Modesto" },
    { value: "monterey", label: "Monterey" },
    { value: "redding", label: "Redding" },
    { value: "riverside", label: "Riverside" },
    { value: "sacramento", label: "Sacramento" },
    { value: "san-diego", label: "San Diego" },
    { value: "san-francisco", label: "San Francisco" },
    { value: "san-luis-obispo", label: "San Luis Obispo" },
    { value: "santa-barbara", label: "Santa Barbara" },
    { value: "santa-cruz", label: "Santa Cruz" },
    { value: "stockton", label: "Stockton" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setIsLoading(true);
  
    const formData = new FormData(event.target);
    formData.append("location", selectedLocation?.value || "");
    formData.append("creator", user._id);
  
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cars/sellcar`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload car details.");
      }
  
      const data = await response.json();
      console.log("Car uploaded successfully:", data);
      window.location.href = "/carsforsale";
    } catch (error) {
      console.error("Error uploading car:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="sell-car-page">
      {isLoading ? (
        <FullScreenSpinner />
      ) : (
        <>
          <header className="sell-car-header">
            <h1 className="sell-car-title">Sell Your Car</h1>
            <p className="sell-car-subtitle">
              Easily list your car and reach buyers in no time!
            </p>
          </header>
          <section className="sell-car-form-section">
            <Form
              onSubmit={(event) => {
                handleSubmit(event);
                event.target.reset();
              }}
              className="sell-car-form"
            >
              <Form.Group controlId="carMake">
                <Form.Label>Make</Form.Label>
                <Form.Control type="text" name="carMake" required />
              </Form.Group>
              <Form.Group controlId="carModel">
                <Form.Label>Model</Form.Label>
                <Form.Control type="text" name="carModel" required />
              </Form.Group>
              <Form.Group controlId="year">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  name="year"
                  min="1885"
                  max={new Date().getFullYear()}
                  required
                />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="price"
                    min="0"
                    required
                  />
                </div>
              </Form.Group>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Select
                  options={options}
                  onChange={(selectedOption) => setSelectedLocation(selectedOption)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="mileage">
                <Form.Label>Mileage</Form.Label>
                <Form.Control type="number" name="mileage" min="0" required />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" />
              </Form.Group>
              <Form.Group controlId="contactEmail">
                <Form.Label>Contact Email</Form.Label>
                <Form.Control type="email" name="contactEmail" required />
              </Form.Group>
              <Form.Group controlId="contactCell">
                <Form.Label>Contact Cell</Form.Label>
                <Form.Control
                  type="tel"
                  name="contactCell"
                  pattern="[0-9]{10}"
                  title="Enter a 10-digit phone number"
                  required
                />
              </Form.Group>
              <Form.Group controlId="carImages">
                <Form.Label>Upload Images</Form.Label>
                <Form.Control
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                />
              </Form.Group>
              <button type="submit" className="btn btn-submit">
                Submit
              </button>
            </Form>
          </section>
        </>
      )}
    </div>
  );
};

export default SellCarPage;
