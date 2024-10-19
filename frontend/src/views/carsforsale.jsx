import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const CarsForSale = () => {
    const [usedCars, setUsedCars] = useState([]);

    useEffect(() => {
        const fetchUsedCars = async () => {
            try {
                const response = await fetch("/api/used-cars"); // Need to make this endpoint
                const data = await response.json();
                setUsedCars(data);
            } catch (error) {
                console.error("Error fetching used cars:", error);
            }
        };

        fetchUsedCars();
    }, []);

    return (
        <Container>
        <h1 className="my-4">Used Cars for Sale</h1>
        <Row>
            {usedCars.map((car) => (
            <Col key={car.id} sm={12} md={6} lg={4} className="mb-4">
                <Card>
                <Card.Body>
                    <Card.Title>
                    {car.make} {car.model}
                    </Card.Title>
                    <Card.Text>
                    Year: {car.year}
                    <br />
                    Price: {car.price}
                    </Card.Text>
                    <Button variant="primary">View Details</Button>
                </Card.Body>
                </Card>
            </Col>
            ))}
        </Row>
        </Container>
    );
};

export default CarsForSale;
