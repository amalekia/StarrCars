import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container text-center">
                <p className="mb-2">
                    &copy; {new Date().getFullYear()} Starr Cars. All rights reserved.
                </p>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <Link to="/about" style={{color: "lightgrey"}}>About Us</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="/contact" style={{color: "lightgrey"}}>Contact</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};