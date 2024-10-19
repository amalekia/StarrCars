import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
    return (
        <footer className="bg-dark text-white py-4">
            <div className="container text-center">
                <p className="mb-2">
                    &copy; {new Date().getFullYear()} Starr Cars. All rights reserved.
                </p>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <a href="/about" className="text-white">About Us</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/contact" className="text-white">Contact</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/privacy" className="text-white">Privacy Policy</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};