import React from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";
import "../styles/sellcar.css";

const SellCarPage = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {
      make: formData.get("make"),
      model: formData.get("model"),
      year: formData.get("year"),
      price: formData.get("price"),
      mileage: formData.get("mileage"),
      location: formData.get("location"),
      contactCell: formData.get("contactCell"),
      contactEmail: formData.get("contactEmail"),
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/cars/sellcar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="sell-car">
      <h1>Sell Your Car</h1>
      <p>Fill out the form below to sell your car!</p>
      <Form onSubmit={(event) => {
        handleSubmit(event);
        event.target.reset();
      }}>
        <Form.Group controlId="make">
          <Form.Label>Make</Form.Label>
          <Form.Control type="text" name="make" required />
        </Form.Group>
        <Form.Group controlId="model">
          <Form.Label>Model</Form.Label>
          <Form.Control type="text" name="model" required />
        </Form.Group>
        <Form.Group controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Control type="number" name="year" min="1885" required />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" required />
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Select options={options} name="location" required />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Mileage</Form.Label>
          <Form.Control type="number" name="mileage" required />
        </Form.Group>
        <Form.Group controlId="contactEmail">
          <Form.Label>Contact Email</Form.Label>
          <Form.Control type="text" name="contactEmail" required />
        </Form.Group>
        <Form.Group controlId="contactCell">
          <Form.Label>Contact Cell</Form.Label>
          <Form.Control type="text" name="contactCell" required />
        </Form.Group>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default SellCarPage;
