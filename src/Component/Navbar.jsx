import React, { useState, useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from '../logo.png'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaBars, FaTimes, FaAngleDown } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [shortDropdownOpen, setShortDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/Home');
  };


  return (
    <div className="navbar-container">
      {/* Top Bar */}
      <div className="top-bar">
        {/* ... (rest of top bar) ... */}
        <div className="contact-info">
          <span><FaPhoneAlt /> +92-325-3344552</span>
          <span><FaEnvelope /> contact@atechskills.pk</span>
          <span><FaMapMarkerAlt /> 101 block commercial market DHA phase 12 EME LHR</span>
        </div>

        <div className="social-icons">
          <FaFacebookF />
          <FaInstagram />
          <FaLinkedinIn />
          <FaTiktok />
        </div>
      </div>

      {/* Main Navbar */}
      <div className="main-navbar">
        <div className="logo">
          <img src={logo} alt="ATechSkills Logo" />
        </div>

        <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen((v) => !v)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={"nav-links" + (menuOpen ? " open" : "")}>
          <li><Link to="/Home" onClick={() => setMenuOpen(false)}> Home </Link></li>
          
          <li className={`dropdown ${shortDropdownOpen ? "active" : ""}`}>
            <span className="nav-item-wrapper">
              <Link
                to="/ShortCourses"
                onClick={(e) => {
                  if (menuOpen) {
                    e.preventDefault();
                    setShortDropdownOpen(!shortDropdownOpen);
                  } else {
                    setMenuOpen(false);
                  }
                }}
              >
                Short Bootcamp
              </Link>
              <FaAngleDown
                className={`dropdown-toggle-icon ${shortDropdownOpen ? 'rotate' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShortDropdownOpen(!shortDropdownOpen);
                }}
              />
            </span>
            <ul className={`dropdown-menu ${shortDropdownOpen ? "open-mobile" : ""}`}>
              <li><Link to="/Automation" onClick={() => setMenuOpen(false)}>AI Automation (n8n & Zapier)</Link></li>
            </ul>
          </li>

          <li className={`dropdown ${dropdownOpen ? "active" : ""}`}>
            <span className="nav-item-wrapper">
              <Link
                to="/Courses"
                onClick={(e) => {
                  // If on mobile (menuOpen is true), toggle dropdown instead of navigating
                  if (menuOpen) {
                    e.preventDefault();
                    setDropdownOpen(!dropdownOpen);
                  } else {
                    setMenuOpen(false);
                  }
                }}
              >
                Complete Bootcamp
              </Link>
              <FaAngleDown
                className={`dropdown-toggle-icon ${dropdownOpen ? 'rotate' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
              />
            </span>
            <ul className={`dropdown-menu ${dropdownOpen ? "open-mobile" : ""}`}>
              <li><Link to="/AI" onClick={() => setMenuOpen(false)}>AI Track Course</Link></li>
              <li><Link to="/Development" onClick={() => setMenuOpen(false)}>Development Track Coure</Link></li>
              <li><Link to="/Cybersecurity" onClick={() => setMenuOpen(false)}>Cybersecurity Track Course </Link></li>
              <li><Link to="/QES" onClick={() => setMenuOpen(false)}>Quick Earning Skills Courses</Link></li>
            </ul>
          </li>

          <li><Link to="/ToolsPage" onClick={() => setMenuOpen(false)}>Tools</Link></li>
          <li><Link to="/Team" onClick={() => setMenuOpen(false)}> Instructors</Link></li>
          <li><Link to="/Enroll" onClick={() => setMenuOpen(false)}> Admissions</Link></li>
          <li><Link to="/Contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {user ? (
            <>
              <Link 
                to={
                  user.role === 'admin' ? '/sms/admin-dashboard' : 
                  user.role === 'instructor' ? '/sms/instructor/dashboard' : 
                  '/sms/student-dashboard'
                } 
                className="dashboard-btn"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button className="login-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/sms/signup" className="enroll-btn" onClick={() => setMenuOpen(false)}>Signup</Link>
              <Link to="/sms/login" className="login-btn" onClick={() => setMenuOpen(false)}>Login</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
