import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css"; // Importing the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-title">CollabHub</h2>
        <p className="footer-text">
          Connecting minds, sharing resources, and building together.
        </p>

        {/* Navigation Links */}
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <a href="#" className="social-icon"><FaFacebook /></a>
          <a href="#" className="social-icon"><FaTwitter /></a>
          <a href="#" className="social-icon"><FaInstagram /></a>
          <a href="#" className="social-icon"><FaLinkedin /></a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} CollabHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
