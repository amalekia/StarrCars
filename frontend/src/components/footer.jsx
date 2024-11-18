import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} StarrCars. All rights reserved.
        </p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <Link to="/about">About Us</Link>
          </li>
          <li className="list-inline-item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
