import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Image } from 'react-bootstrap';
import "../component-style/car-card.css";

const CarCard = ({ imageUrl, price, model, location}) => {
    return (
        <Card className="car-card">
            <Row noGutters>
                <Col md={4}>
                    <Image src={imageUrl} alt="No Images Provided" className="car-card-image" fluid />
                </Col>
                <Col md={8}>
                    <Card.Header className="car-card-header">
                        <Card.Text className="car-card-description">
                            {model}
                        </Card.Text>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className="car-card-price">
                            {price}
                        </Card.Text>
                        <Card.Text className="car-card-location">
                            {location}
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

CarCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default CarCard;