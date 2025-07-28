import React, { useState, useEffect } from "react";
import "./App.css";
import backgroundImage from "./images/96VibezSMG2.png";

function App() {
  // Form states
  const [formVisible, setFormVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Subscription confirmation (checkbox)
  const [subscribedConfirmed, setSubscribedConfirmed] = useState(false);

  // Artist profile form states
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [bio, setBio] = useState("");

  // For redirection after submission (optional)
  useEffect(() => {
    let timeout;
    if (submitted) {
      timeout = setTimeout(() => {
        window.location.href = "https://www.facebook.com/groups/96vibez";
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [submitted]);

  // Handle profile image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subscribedConfirmed) {
      alert("Please confirm you have subscribed to our YouTube channel.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("profileImage", profileImage);
    formData.append("youtubeLink", youtubeLink);
    formData.append("socialLink", socialLink);
    formData.append("bio", bio);

    try {
      // Example Formspree endpoint - change to your real one
      await fetch("https://formspree.io/f/mwpornop", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      setSubmitted(true);
      setLoading(false);
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
      <div className="overlay" style={{ maxWidth: 600 }}>
        {/* Embed YouTube video */}
        <div className="video-container" style={{ marginBottom: 20 }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/Q7fLqwF9wlA"
            title="96Vibez YouTube"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p style={{ marginTop: 10 }}>
            <a
              href="https://www.youtube.com/@96Vibez/videos"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#ffcc00",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Subscribe to our YouTube channel
            </a>
          </p>
        </div>

        {/* Before form: show submit button or thank you */}
        {!formVisible && !submitted && (
          <>
            <h2 className="email-title">Join 96Vibez Artist Community</h2>
            <p className="email-text">
              To be part of the site, confirm your subscription to our YouTube
              and submit your profile.
            </p>
            <button
              aria-label="Show artist submission form"
              className="email-button"
              onClick={() => setFormVisible(true)}
              style={{ width: "100%", maxWidth: 320 }}
            >
              Submit Profile
            </button>
          </>
        )}

        {formVisible && !submitted && (
          <form onSubmit={handleSubmit} className="email-form">
            {/* Profile image upload */}
            <label>
              Profile Picture (required)
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                style={{ marginTop: 5 }}
              />
            </label>
            {profileImagePreview && (
              <img
                src={profileImagePreview}
                alt="Profile Preview"
                style={{
                  marginTop: 10,
                  maxWidth: 150,
                  maxHeight: 150,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}

            {/* YouTube video link */}
            <label style={{ marginTop: 15 }}>
              YouTube Video URL (required)
              <input
                type="url"
                placeholder="https://www.youtube.com/..."
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                required
                style={{ width: "100%", marginTop: 5, padding: 8 }}
              />
            </label>

            {/* Social media link */}
            <label style={{ marginTop: 15 }}>
              Social Media Link (optional)
              <input
                type="url"
                placeholder="https://instagram.com/..."
                value={socialLink}
                onChange={(e) => setSocialLink(e.target.value)}
                style={{ width: "100%", marginTop: 5, padding: 8 }}
              />
            </label>

            {/* Bio */}
            <label style={{ marginTop: 15 }}>
              Bio (required)
              <textarea
                rows={4}
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
                style={{ width: "100%", marginTop: 5, padding: 8 }}
              />
            </label>

            {/* Subscription confirmation checkbox */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 15,
                gap: 8,
              }}
            >
              <input
                type="checkbox"
                checked={subscribedConfirmed}
                onChange={() =>
                  setSubscribedConfirmed((prev) => !prev)
                }
                required
              />
              I confirm I have subscribed to the YouTube channel
            </label>

            <button
              type="submit"
              className="email-submit"
              disabled={loading}
              style={{ marginTop: 20, width: "100%" }}
              aria-label="Submit artist profile"
            >
              {loading ? "Submitting..." : "Submit Profile"}
            </button>
          </form>
        )}

        {submitted && (
          <p className="thank-you" aria-live="polite" style={{ marginTop: 20 }}>
            Thank you for submitting your profile! We will review it and get
            back to you.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
