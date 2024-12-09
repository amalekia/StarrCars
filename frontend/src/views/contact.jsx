import React from "react";
import "../styles/contact.css";

export default function ContactPage() {
    return (
        <div className="contactpage">
            <img 
                src="adrick.jpeg" 
                alt="Adrick Malekian" 
                className="contact-image" 
            />
            <h1>Contact Us</h1>
            <p>For any questions or concerns, please reach out to us at <strong>adrickmalekian218@gmail.com</strong></p>
        </div>
    );
}
