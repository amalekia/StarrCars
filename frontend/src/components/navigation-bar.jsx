import React from "react";
import { Navbar, Nav, Button, Container, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar 
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
      className="justify-content-between p-2"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">StarrCars</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/forsale">Used Cars for Sale</Nav.Link>
            <Nav.Link as={Link} to="/sell">Sell Your Car</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;