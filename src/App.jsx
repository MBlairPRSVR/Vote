import React, { useState } from "react";
import "./App.css";
import backgroundImage from "./images/96VibezImg.png";







function App() {
  const [formVisible, setFormVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    await fetch("https://formspree.io/f/mwpornop", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    setSubmitted(true);
    setTimeout(() => {
      window.location.href = "https://www.globalcitizen.org/en/";
    }, 3000);
  };

  return (
    <div
      className="landing-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay">
        <div className="email-card">
          {!formVisible && !submitted && (
            <>
              <h2 className="email-title">Support the 96 Vibez Campaign</h2>
              <p className="email-text">Join us in making a difference. Your vote matters!</p>
              <button className="email-button" onClick={() => setFormVisible(true)}>
                Subscribe
              </button>
            </>
          )}

          {formVisible && !submitted && (
            <form onSubmit={handleSubmit} className="email-form">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="email-input"
              />
              <button type="submit" className="email-submit">Submit</button>
            </form>
          )}

          {submitted && (
            <p className="thank-you">
              Thank you for supporting the cause to end extreme poverty and social injustice...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
