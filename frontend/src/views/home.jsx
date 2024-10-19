import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Card, Row } from "react-bootstrap";

export default function Home() {
  return (
    <Container style={{ color: "darkorange" }}>
      <header>
        <h2
          style={{
            font: "Times",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "3.5em",
            paddingTop: "3rem",
          }}
        >
          Welcome to StarrCars!
        </h2>
        <div
          style={{
            font: "Times",
            textAlign: "center",
            fontSize: "1.5em",
            padding: "1rem",
          }}
        >
          Your most trusted source to buy cars!
        </div>
        <div>
          <Row style={{ justifyContent: "center" }}>
            <Card
              style={{
                width: "36rem",
                height: "15rem",
                background: "black",
                padding: "0.7rem",
                textAlign: "center",
                backgroundImage: `url("racetrack.png")`,
                backgroundSize: "27rem",
                marginTop: "1.5rem",
                marginRight: "2rem",
                border: "none",
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: "black" }}>
                  Lets get you rollin on some new wheels!
                </Card.Title>
                <Link to="/carsforsale">
                  <Button
                    style={{ backgroundColor: "darkorange", color: "black" }}
                  >
                    Search for Used Cars
                  </Button>
                </Link>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "36rem",
                height: "15rem",
                padding: "0.7rem",
                textAlign: "center",
                backgroundImage: `url("raceflag.png")`,
                backgroundSize: "37rem",
                marginTop: "1.5rem",
                border: "none",
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: "black" }}>
                  Let us help sell your car with our expertise!
                </Card.Title>
                <Link to="/sellcar">
                  <Button
                    style={{ backgroundColor: "darkorange", color: "black" }}
                  >
                    Sell Your Car
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Row>
        </div>
      </header>
    </Container>
  );
}
