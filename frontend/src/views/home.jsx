import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Welcome to StarrCars</h1>
        <p className="home-subtitle">Your most trusted source to buy and sell cars!</p>
      </header>
      <section className="home-section">
        <div className="home-content">
          <p className="home-description">
            At StarrCars, we pride ourselves on offering a seamless and enjoyable car-buying experience. 
            Browse through our extensive inventory of high-quality used cars, each inspected to meet our
            stringent standards. Whether you're a first-time buyer or a seasoned car enthusiast, 
            StarrCars is here to help you find the perfect ride.
          </p>
          <div className="home-actions">
            <Link to="/carsforsale">
              <div className="btn-custom">Search for Used Cars</div>
            </Link>
          </div>
        </div>
        <div className="home-content">
          <p className="home-description">
            Looking to sell your car? StarrCars offers a hassle-free process that gets your vehicle
            listed and sold faster. Our team of professionals will guide you every step of the way, 
            ensuring you get the best deal possible.
          </p>
          <div className="home-actions">
            <Link to="/sellcar">
              <div className="btn-custom">Sell Your Car</div>
            </Link>
          </div>
        </div>
      </section>
      <footer className="home-footer">
        <p>Drive your dreams with StarrCars – Daytona blue, light grey, and everything in between.</p>
      </footer>
    </div>
  );
}
