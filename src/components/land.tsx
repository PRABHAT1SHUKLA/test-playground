import React from "react";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">CoolBrand</div>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="main-content">
        <h1 className="main-title">
          <span>Welcome to</span> <span>CoolBrand</span>
        </h1>
        <p className="main-subtitle">
          Experience innovation like never before. We create solutions that inspire and empower.
        </p>
        <button className="cta-button">Get Started</button>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CoolBrand. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
