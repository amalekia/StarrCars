import React from "react";
import { Navbar, Nav, Container} from "react-bootstrap";
import { Link } from "react-router-dom";

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
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/carsforsale">Used Cars for Sale</Nav.Link>
          <Nav.Link as={Link} to="/sellcar">Sell Your Car</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;