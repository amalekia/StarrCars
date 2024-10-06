import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error

  useEffect(() => {
    fetch("http://localhost:8000/api")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.message);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">StarrCars</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#forsale">Used Cars for Sale</Nav.Link>
            <Nav.Link href="#sell">Sell Your Car</Nav.Link>
          </Nav>
        </Navbar>
      </div>
      <div className="App container mt-4">
        <h1 className="text-center">Welcome to StarrCars</h1>

        {loading ? (
          //Bootstrap spinner
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          //Bootstrap alert for Error
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          //Display successfully fetched data
          <div className="alert alert-success" role="alert">
            {data}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
