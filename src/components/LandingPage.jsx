import React from "react";
import "./LandingPage.css"; // External styles

const LandingPage = ({ backgroundImage, title, text, buttonText, buttonLink }) => {
  return (
    <div
      className="landing-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay">
        <div className="email-card">
          <h2 className="email-title">{title}</h2>
          <p className="email-text">{text}</p>
          <a href={buttonLink} className="email-button">
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
