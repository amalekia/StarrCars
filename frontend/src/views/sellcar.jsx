import React from "react";
import Select from 'react-select'
import { Form } from "react-bootstrap";

const SellCarPage = () => {

    const options = [
        {value: 'bakersfield', label: 'Bakersfield'},
        {value: 'chico', label: 'Chico'},
        {value: 'fresno', label: 'Fresno'},
        {value: 'los-angeles', label: 'Los Angeles'},
        {value: 'merced', label: 'Merced'},
        {value: 'modesto', label: 'Modesto'},
        {value: 'monterey', label: 'Monterey'},
        {value: 'redding', label: 'Redding'},
        {value: 'riverside', label: 'Riverside'},
        {value: 'sacramento', label: 'Sacramento'},
        {value: 'san-diego', label: 'San Diego'},
        {value: 'san-francisco', label: 'San Francisco'},
        {value: 'san-luis-obispo', label: 'San Luis Obispo'},
        {value: 'santa-barbara', label: 'Santa Barbara'},
        {value: 'santa-cruz', label: 'Santa Cruz'},
        {value: 'stockton', label: 'Stockton'},
    ]
    
    return (
        <div className="sell-car">
            <h1>Sell Your Car</h1>
            <p>Fill out the form below to sell your car!</p>
            <Form>
                <Form.Group controlId="make">
                    <Form.Label>Make</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="model">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="number" />
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" />
                </Form.Group>
                <Form.Group controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Select options={options} />
                </Form.Group>
                <Form.Group controlId="contact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </Form>
        </div>
    );
    };

export default SellCarPage;