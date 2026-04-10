import React, { useEffect, useRef, useState } from "react";
import './Footer.css'
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef}
      className={`footer ${visible ? "footer-visible" : ""}`}>
      <div className="footer-container">

        <div className="footer-about">
          <h2 className="logo">ATechSkills</h2>
          <p>
            Leading technology solutions provider specializing in cybersecurity, web development, and AI solutions. Empowering businesses worldwide since 2012.
          </p>

          <div className="footer-social">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaTiktok /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Services</h3>
          <ul>
            <li><a href="#">Web Development</a></li>
            <li><a href="#">Cybersecurity</a></li>
            <li><a href="#">AI Solutions</a></li>
            <li><a href="#">Mobile Apps</a></li>
            <li><a href="#">Cloud Services</a></li>
            <li><a href="#">UI/UX Design</a></li>

          </ul>
        </div>

        <div className="footer-links">
          <h3>Legal Pages</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
            <li><a href="#">Terms and Conditions</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

      </div>


      <div className="footer-bottom">
        © 2024 ATechSkills. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
