import React from "react";
import "./Contact.css";
import Footer from '../Component/Footer.jsx'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";

const Contact = () => {
  return (
    <>
      <div className="contact-container">
        <div className="polygon-bg">
          <div className="contact-info">
            <h1>Get in touch now!</h1>
            <p>
              Have questions about ATechSkills?<br />
               We’re here to help!<br />
              Drop us a message with your queries, and we’d be<br />
              delighted to assist and engage with
              you.
            </p>
            <ul>
              <li><FaPhoneAlt /> +92 325 3344552</li>
              <li><FaEnvelope /> contact@atechskills.pk</li>
              <li><FaMapMarkerAlt /> 101 block commercial market DHA phase 12 EME LHR</li>
            </ul>
          </div>
        </div>

        <form className="contact-form">
          <label>Your Name?</label>
          <input type="text" placeholder="Enter your name" />

          <label>Email</label>
          <input type="email" placeholder="Email" />

          <label>Subject</label>
          <select>
            <option>Feedback</option>
            <option>Query</option>
            <option>Support</option>
          </select>

          <label>Message</label>
          <textarea placeholder="Your message..." />

          <label>Human?</label>
          <input type="text" placeholder="Type Yes" required />
          <button type="submit">SUBMIT</button>
        </form>
      </div >

      <Footer />
    </>
  );
};

export default Contact;
