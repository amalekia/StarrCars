import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row } from "react-bootstrap";

export default function Home() {
  return (
    <div style={{ color: "darkblue", background: "linear-gradient(to bottom, silver, blue)"}}>
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
          <Row style={{ justifyContent: "center", gap: "2rem", borderSpacing: "10px"}}>
            <Card
              style={{
                width: "36rem",
                height: "15rem",
                padding: "0.7rem",
                textAlign: "center",
                backgroundImage: `url("road.png")`,
                backgroundSize: "36rem",
                marginTop: "1.5rem",
                border: "none",
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: "lightgrey" }}>
                  Lets get you rollin on some new wheels!
                </Card.Title>
                <Link to="/carsforsale">
                  <Button
                    style={{ backgroundColor: "darkblue", color: "lightgrey" }}
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
                backgroundSize: "36rem",
                marginTop: "1.5rem",
                border: "none",
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: "lightgrey" }}>
                  Let us help sell your car with our expertise!
                </Card.Title>
                <Link to="/sellcar">
                  <Button
                    style={{ backgroundColor: "darkblue", color: "lightgrey" }}
                  >
                    Sell Your Car
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Row>
        </div>
      </header>
    </div>
  );
}
