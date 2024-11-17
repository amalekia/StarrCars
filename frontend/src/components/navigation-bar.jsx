import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      sticky="top"
      className="justify-content-between p-2"
      style={{
        fontFamily: "Georgia, sans-serif",
        fontSize: "20px",
      }}
    >
      <Container fluid>
        <Nav className="mr-auto">
          <Navbar.Brand href="/">
            <img
              alt=""
              src="logo.svg"
              width="60"
              height="60"
              className="d-inline-block align-center"
            />{" "}
            StarrCars
          </Navbar.Brand>
        </Nav>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/carsforsale" style={{ color: "black" }}>
            Used Cars for Sale
          </Nav.Link>
          <Nav.Link as={Link} to="/sellcar" style={{ color: "black" }}>
            Sell Your Car
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
