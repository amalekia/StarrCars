import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row } from "react-bootstrap";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h2 className="home-title">Welcome to StarrCars</h2>
        <div className="home-subtitle">Your most trusted source to buy cars!</div>
      </header>
      <div>
          <Row className="card-row">
            <Card
              className="card-custom"
              style={{ backgroundImage: `url("road.png")` }}
            >
              <Card.Body>
                <Card.Title className="card-title">
                  Let's get you rollin' on some new wheels!
                </Card.Title>
                <Link to="/carsforsale">
                  <Button className="btn-custom">Search for Used Cars</Button>
                </Link>
              </Card.Body>
            </Card>
            <Card
              className="card-custom"
              style={{ backgroundImage: `url("raceflag.png")` }}
            >
              <Card.Body>
                <Card.Title className="card-title">
                  Let us help sell your car with our expertise!
                </Card.Title>
                <Link to="/sellcar">
                  <Button className="btn-custom">Sell Your Car</Button>
                </Link>
              </Card.Body>
            </Card>
          </Row>
        </div>
    </div>
  );
}
