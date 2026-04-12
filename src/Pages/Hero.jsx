import React from "react";
import './Hero.css'
import { Link } from "react-router-dom";


function Hero() {

  return (
    <div className="hero-section">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video">
        <source src="https://cdn.pixabay.com/video/2024/02/02/198901-909564558_large.mp4" type="video/mp4" />
      </video>

      <div className="overlay"></div>

      <div className="hero-content">
        <h2>Launch Your Tech Career with</h2>
        <h1>
          DEVSECAI Bootcamp <br /> <span>Development | Security | AI</span>
        </h1>

        <p>
          Master Development, Security, and AI in One Bootcamp.
          Bridge the tech skills gap with industry-vetted curriculum and expert mentorship.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary"><Link to="/sms/signup"> Apply Now for Next Cohort</Link></button>
          <button className="btn-outline"><Link to="/Courses">View Curriculum</Link></button>
        </div>
      </div>
    </div>
  )
}

export default Hero
