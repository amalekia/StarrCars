import React from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

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
    const data = {
      make: form.make.value,
      model: form.model.value,
      year: form.year.value,
      price: form.price.value,
      location: form.location.value,
      contact: form.contact.value,
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/sellcar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
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
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="make">
          <Form.Label>Make</Form.Label>
          <Form.Control type="text" name="make" />
        </Form.Group>
        <Form.Group controlId="model">
          <Form.Label>Model</Form.Label>
          <Form.Control type="text" name="model" />
        </Form.Group>
        <Form.Group controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Control type="number" name="year" />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" />
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Select options={options} name="location" />
        </Form.Group>
        <Form.Group controlId="contact">
          <Form.Label>Contact</Form.Label>
          <Form.Control type="text" name="contact" />
        </Form.Group>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default SellCarPage;
