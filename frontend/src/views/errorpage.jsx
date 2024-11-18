import React from "react";
import { Link } from "react-router-dom";
import "../styles/errorpage.css";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-title">Oops!</h1>
      <p className="error-message">
        The page you're looking for doesn't exist or an unexpected error has occurred.
      </p>
      <p className="error-cta">
        Let's get you back on track! 
      </p>
      <Link to="/" className="error-link">
        Go to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
