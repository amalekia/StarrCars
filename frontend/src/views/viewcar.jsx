import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/viewcar.css";

export default function ViewCarPage() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch car details using the ID
        async function fetchCarDetails() {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/cars/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setCar(data[0]);
            } catch (error) {
                console.error("Error fetching car details:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCarDetails();
    }, [id]);

    if (loading) {
        return <p className="loading-message">Loading...</p>;
    }

    if (!car) {
        return <p className="error-message">Car not found</p>;
    }

    return (
        <Container className="view-car-container">
            <Row className="view-car-header">
                <Col>
                    <h1 className="view-car-title">{car.carMake} {car.carModel}</h1>
                </Col>
            </Row>

            {/* {car.images && car.images.length > 0 && (
                <Row className="image-grid">
                    {car.images.map((image, index) => (
                        <Col md={4} key={index}>
                            <Card>
                                <Card.Img variant="top" src={image} alt={`Image ${index + 1}`} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )} */}

            <Row>
                <Col md={8}>
                    <Card className="vehicle-details-card">
                        <Card.Body>
                            <Card.Title className="card-title">Vehicle Details</Card.Title>
                            <Card.Text>
                                <strong>Mileage:</strong> {car.mileage}
                            </Card.Text>
                            <Card.Text>{car.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="contact-card">
                        <Card.Body>
                            <Card.Title className="card-title">Contact Information</Card.Title>
                            <Card.Text>
                                <strong>Email:</strong>{" "}
                                <a href={`mailto:${car.contactEmail}`} className="contact-link">
                                    {car.contactEmail}
                                </a>
                            </Card.Text>
                            <Card.Text>
                                <strong>Phone:</strong>{" "}
                                <a href={`tel:${car.contactCell}`} className="contact-link">
                                    {car.contactCell}
                                </a>
                            </Card.Text>
                            <Button className="contact-button" href={`mailto:${car.contactEmail}`}>
                                Contact Seller
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}