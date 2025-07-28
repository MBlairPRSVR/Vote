import React, { useState, useEffect } from "react";
import "./App.css";
import backgroundImage from "./images/96VibezSMG2.png";

function App() {
  const [formVisible, setFormVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
  let timeout;
  if (submitted) {
    timeout = setTimeout(() => {
      window.location.href = "https://www.facebook.com/groups/96vibez";
    }, 3000);
  }
  return () => clearTimeout(timeout);
}, [submitted]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);

    try {
      await fetch("https://formspree.io/f/mwpornop", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      setSubmitted(true);
    } catch (error) {
      alert("Oops! Something went wrong. Please try again.");
      setLoading(false);
    }
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
              <h2 className="email-title">Subscribe To 96Vibez</h2>
              <p className="email-text">
                Where everyone's voice matters!
              </p>
              <button
                aria-label="Subscribe to campaign newsletter"
                className="email-button"
                onClick={() => setFormVisible(true)}
              >
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", maxWidth: 320, padding: "12px 20px", fontSize: "1rem", borderRadius: 6 }}
              />
              <button
                type="submit"
                className="email-submit"
                disabled={loading}
                style={{ width: "100%", maxWidth: 320, padding: "12px 20px", fontSize: "1rem", borderRadius: 6, marginTop: 12 }}
                aria-label="Submit email"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}

          {submitted && (
            <p className="thank-you" aria-live="polite">
              Thank you for subscribing to 96Vibez Social Media Group
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
