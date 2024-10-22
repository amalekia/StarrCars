import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

export default function AboutPage() {
    return (
        <div classname="aboutpage">
            <h1>About Us</h1>
            <p>
                At StarrCars, we are dedicated to helping our clients confidently buy and sell their vehicles. 
                Our team of experts is here to assist you with any questions you may have, making the process 
                of buying and selling cars as easy as possible. Our tools are designed to help you make the 
                best decisions for your vehicle transactions. Feel free to reach out to us with any questions 
                you may have below!
            </p>
            <Link to="/contact">Click here to contact us</Link>
            <h4>Thank you for choosing StarrCars!</h4>
        </div>
    )
}

