import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./views/home";
import UsedCars from "./views/UsedCars";
import SellCar from "./views/SellCar";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/cars");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data.cars);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">StarrCars</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/forsale">Used Cars for Sale</Nav.Link>
            <Nav.Link as={Link} to="/sell">Sell Your Car</Nav.Link>
          </Nav>
        </Navbar>
      </div>
      <div className="App container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/forsale"
            element={<UsedCars data={data} loading={loading} error={error} />}
          />
          <Route path="/sell" element={<SellCar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
