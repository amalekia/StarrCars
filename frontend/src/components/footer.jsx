import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-light py-4">
            <div className="container text-center">
                <p className="mb-2">
                    &copy; {new Date().getFullYear()} StarrCars. All rights reserved.
                </p>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <Link to="/about" style={{color: "black"}}>About Us</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="/contact" style={{color: "black"}}>Contact</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};