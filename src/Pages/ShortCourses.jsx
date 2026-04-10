import React, { useRef, useState, useEffect } from "react";
import { FaAngleRight, FaStar, FaVideo, FaHeadset, FaInfinity, FaUserPlus } from "react-icons/fa";
import Footer from "../Component/Footer.jsx";
import { Link } from "react-router-dom";
import "./Courses.css";

const shortCards = [
  {
    id: 101,
    title: "AtechSkills DevSecAI Bootcamp - AI Automation using n8n & Zapier",
    trainer: "Mustansar Riaz",
    desc:
      "Automate repetitive work, integrate apps and build event-driven workflows with visual tools. Learn n8n, Zapier and reliability best practices.",
    duration: "2 Months",
    image:
      "https://media.istockphoto.com/id/1503111382/photo/ai-robot-hand-holding-cogwheels-business-idea-with-artificial-intelligence-teamwork-planing.webp?a=1&b=1&s=612x612&w=0&k=20&c=DcyMHHscBgU8S_8ptgyqcyQBipmyetllCKInwGu0rVY=",
    route: "/Automation",
  },
];

const ShortCourses = () => {
  const textRef = useRef(null);
  const [fillPercent, setFillPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return;
      const rect = textRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visible = Math.min(windowHeight - rect.top, rect.height);
      const percent = Math.max(0, Math.min(visible / rect.height, 1)) * 100;
      setFillPercent(percent);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="courses">
        <div className="about">
          <p id="SigC">Short Bootcamps Courses ——— —</p>
          <h1>
            Practical <span>Short Courses Bootcamp</span> by ATechSkills
          </h1>
          <div className="M-tanveer">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSH_McZvBOs1hCbqBSE3OKj2LDcZdm5zo-rQ&s"  alt="Trainer Icon" />
            <div className="inner-div">
              <h2>Mustansar Riaz</h2>
              <p>Full stack developer – Master Trainer. 12+ Years Experienced</p>
            </div>
          </div>
          <p id='aboutP'> If you are looking for a practical bootcamp that covers the latest technologies in AI Automation, then you have come to the right place. ATechSkills DevSecAI Short Bootcamp is a 2-month intensive program, 1 month training and 1 month internship that will help you learn and apply the skills you need to succeed in the tech industry.</p>
                    <div className='STAR'>
                      <div className="starr">
                        <br/><span><FaStar /> AtechSkills DevSecAI Short Bootcamp - AI Automation using n8n zapier</span><br/>
                      </div>
                    </div>
        </div>

        <div className="stats-section">
          <h2 className="stats-title">Learn fast, apply faster</h2>
          <div className="stats-grid-container">
            <div className="stat-item">
              <FaVideo className="stat-icon" />
              <h3>Live</h3>
              <p>Sessions</p>
            </div>
            <div className="stat-item">
              <FaHeadset className="stat-icon" />
              <h3>Support</h3>
              <p>Mentorship</p>
            </div>
            <div className="stat-item">
              <FaInfinity className="stat-icon" />
              <h3>Access</h3>
              <p>Resources</p>
            </div>
            <Link to="/Enroll" className="stat-item cta-card">
              <FaUserPlus className="stat-icon" />
              <h3>Join</h3>
              <p>Enroll Now</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="regis">
        <h1
          ref={textRef}
          className="scroll-fill-text"
          style={{ backgroundSize: `${fillPercent}% 100%` }}
        >
          Explore Short Bootcamps
        </h1>
        <p className="drop-text visible">Build skills quickly</p>
      </div>

      <div className="cards-container">
        {shortCards.map((c) => (
          <div key={c.id} className="card">
            <div className="card-image">
              <img src={c.image} alt={c.title} />
            </div>
            <div className="card-body">
              <h3 className="card-title">{c.title}</h3>
              <div className="trainer">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/11528/11528308.png"
                  className="icon"
                  alt="Trainer Icon"
                />
                <span className="trainer-name">
                  {c.trainer} <span className="muted">(Trainer)</span>
                </span>
              </div>
              <p className="card-desc">{c.desc}</p>
              <div className="meta">
                <div className="meta-item">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/11925/11925884.png"
                    className="meta-icon"
                    alt="Duration Icon"
                  />
                  <div>
                    <div className="meta-value">{c.duration}</div>
                    <div className="muted small">(Duration)</div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="detail-btn">
                  <Link to={c.route}>
                    Get Details <FaAngleRight size={13} />
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default ShortCourses;

