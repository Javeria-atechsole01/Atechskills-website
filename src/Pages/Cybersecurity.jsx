import React, { useEffect, useRef, useState } from "react";
import "./SEBT.css";
import CoursePricingCard from '../Component/CoursePricingCard.jsx';
import { Link } from "react-router-dom";
import { FaStar, FaAngleRight } from "react-icons/fa";
import Footer from "../Component/Footer.jsx";
import EnrollModal from "../Component/EnrollModal.jsx";
import imagee1 from '../cs1.png'
import imagee2 from '../cs2.png'
import imagee3 from '../cs3.png'

const Cybersecurity = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  const textRef = useRef(null);
  const textRef1 = useRef(null);
  const [fillPercent, setFillPercent] = useState(0);
  const [fillPercent1, setFillPercent1] = useState(0);
  const cardRefs = useRef([]);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const ctaRef = useRef(null);
  const ctaTitleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const visible = Math.min(windowHeight - rect.top, rect.height);
        const percent = Math.max(0, Math.min(visible / rect.height, 1)) * 100;
        setFillPercent(percent);
      }
      if (textRef1.current) {
        const rect1 = textRef1.current.getBoundingClientRect();
        const windowHeight1 = window.innerHeight;
        const visible1 = Math.min(windowHeight1 - rect1.top, rect1.height);
        const percent1 = Math.max(0, Math.min(visible1 / rect1.height, 1)) * 100;
        setFillPercent1(percent1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
          else entry.target.classList.remove('visible');
        });
      },
      { threshold: 0.3 }
    );
    if (ctaRef.current) obs.observe(ctaRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handleCta = () => {
      if (ctaRef.current) {
        const r = ctaRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const visible = Math.min(vh - r.top, r.height);
        const ratio = Math.max(0, Math.min(visible / r.height, 1));
        const scale = 0.95 + ratio * 0.07;
        ctaRef.current.style.setProperty('--scale', scale.toString());
        const fill = Math.round(ratio * 100);
        if (ctaTitleRef.current) ctaTitleRef.current.style.setProperty('--fill', fill + '%');
      }
    };
    window.addEventListener('scroll', handleCta);
    handleCta();
    return () => window.removeEventListener('scroll', handleCta);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
          else entry.target.classList.remove('visible');
        });
      },
      { threshold: 0.3 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScale = () => {
      cardRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const visible = Math.min(vh - rect.top, rect.height);
        const ratio = Math.max(0, Math.min(visible / rect.height, 1));
        const scale = 0.92 + ratio * 0.10;
        el.style.setProperty('--scale', scale.toString());
      });
    };
    window.addEventListener('scroll', handleScale);
    handleScale();
    return () => window.removeEventListener('scroll', handleScale);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "content":
        return (
          <div className="content-box">
            <h2>Whats New:-</h2>
            <ul>
              <li><span className="star"></span><b>Network Security</b></li>
              <li><span className="star"></span><b>Threat Detection & Response</b></li>
              <li><span className="star"></span><b>Penetration Testing</b></li>
            </ul><br />

            <h2>Course Outline:-</h2>
            <ul>
              <li>
                <span className="star"></span>
                <div>
                  <b> Cybersecurity Fundamentals</b>
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b> Network Security</b>
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b> Penetration Testing and Ethical Hacking</b>
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Security Operations and Monitoring</b>
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b> Cryptography and Data Protection</b>
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b> Incident Response</b>
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Security Audits and Risk Assessments</b>
                </div>
              </li>
            </ul>
          </div>
        );
      case "important":
        return (
          <div className="content-box">
            <h2>Course Outline:-</h2>
            <ul>
              <li>
                <span className="star"></span>
                <div>
                  <b>Basic Programming (Python, Bash)</b>
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Secure Coding Practices</b>
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Web and App Security Vulnerabilities</b>
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Secure Software Development Lifecycle (SDLC)</b>
                </div>
              </li>
            </ul>
          </div>
        );
      case "bonuses":
        return (
          <div className="content-box">
            <h2>Course Outline:-</h2>
            <ul>
              <li>
                <span className="star"></span>
                <div>
                  <b> AI Basics and Machine Learning</b>
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b> Automation and AI in Cybersecurity</b>
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Anomaly Detection and AI-based Security Solutions</b>
                </div>
              </li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="Sebt-container">
        <h1> ATechSkills<span id="batch"> DevSecAI </span> Bootcamp - Cybersecurity Track </h1>
        <div className="rating">
          <img src="https://iskills.com/wp-content/uploads/2024/04/trainer.svg" />
          <p>Mustanar Riaz <span>(Trainer)</span></p>
          <img src="https://iskills.com/wp-content/uploads//2024/03/user-stars.svg" />
          <p>12,000+ <span> (Graduates)</span></p>
          <p> 5 <FaStar /> <span> ( 5932 Reviews )</span></p>
        </div>

        <div className="hero-both">
          <div className="hero-CSbg">
          </div>

          <div className='white-div1' style={{ height: 'auto', background: 'transparent', boxShadow: 'none', padding: 0 }}>
            <CoursePricingCard />
          </div>
        </div>

        <p id="training-program"><b>AtechSkills DevSecAI Bootcamp - Cybersecurity Track Training Program 2025!</b><br /><br />
          Led by industry expert <b>M.Mustansar Riaz</b>, master <b> Cybersecurity expert.</b><br />
          Gain practical skills and expert insights to transform your career.<br /><br />
          Sign up now and become a skilled cybersecurity professional!</p><br />
        <p className="firstP">Bootcamp - Cybersecurity Track Details & Registration ——— —</p>
        <p id="training">Course Breakdown (60% Cybersecurity, 20% Development, 20% AI)</p>

        <div className="container">
          <div className="tabs">
            <button className={activeTab === "content" ? "active" : ""} onClick={() => setActiveTab("content")}>
              60% Cybersecurity
            </button>
            <button className={activeTab === "important" ? "active" : ""} onClick={() => setActiveTab("important")}>
              20% Development
            </button>
            <button className={activeTab === "bonuses" ? "active" : ""} onClick={() => setActiveTab("bonuses")}>
              20% AI
            </button>
          </div>
          <div className="tab-content">{renderContent()}</div>
        </div>

        <div className='regis'>
          <h5
            ref={textRef}
            className="scroll-fill-textt"
            style={{ backgroundSize: `${fillPercent}% 100%` }}
          >Get Enrolled Now</h5>
        </div>

        <p
          ref={textRef1}
          className="scroll-fill-text1" id="para"
          style={{ backgroundSize: `${fillPercent1}% 100%` }}
        >Join ATechSkills DevSecAI Bootcamp - Cybersecurity Track today and turn learning into earning!<br />
          Led by Mustansar Riaz, provide practical, industry-aligned training that helps students and professionals<br />
          step confidently into the global tech marketplace—equipped with the knowledge, skills, and<br />
          mindset needed to succeed.</p>

        <section className="stack-section">
          <div ref={(el) => (cardRefs.current[0] = el)} className="stack-card pink">
            <div className="step-badge">01</div>
            <h2 className="stack-title">Defense-in-Depth</h2>
            <p className="stack-desc">Layered security across network, application and cloud with real-world playbooks.</p>
            <img src={imagee1} alt="Defense in depth" />
          </div>
          <div ref={(el) => (cardRefs.current[1] = el)} className="stack-card lavender">
            <div className="step-badge">02</div>
            <h2 className="stack-title">Threat Detection</h2>
            <p className="stack-desc">Hands-on SIEM, log analysis and incident response drills to detect and respond fast.</p>
            <img src={imagee2} alt="Threat Detection" />
          </div>
          <div ref={(el) => (cardRefs.current[2] = el)} className="stack-card smoke">
            <div className="step-badge">03</div>
            <h2 className="stack-title">Red vs Blue</h2>
            <p className="stack-desc">Ethical hacking labs and defensive hardening tasks to build complete skills.</p>
            <img src={imagee3} alt="Red vs Blue" />
          </div>
        </section>
      </div>

      <section className="cta-section">
        <div ref={ctaRef} className="cta-container">
          <h2 ref={ctaTitleRef} className="cta-title">BUILT FOR EVERYONE</h2>
          <p className="cta-sub">Learn in public, build projects, and join a supportive community.</p>

          <div className="white-faq">
            <h2>Bootcamp - Cybersecurity Track</h2><br />
            <p >Start Date: 1st Nov 2025<br />
              Location: DHA Phase 12 EME, Lahore<br />
              Fee: 15000 Rs (Refundable Security Fee)<br />
              Contact: 0325 3344552<br />
              Email: info@atechskills.com<br />
            </p>
          </div>
          <div className="cta-actions">
            <button className="cta-button" onClick={() => setJoinOpen(true)}>For Inquiry</button>
            <button className="cta-button" onClick={() => window.location.href = 'https://atechskills.com/lms/login.php'}>Enroll Now</button>
          </div>
        </div>
      </section>



      <EnrollModal open={enrollOpen} onClose={() => setEnrollOpen(false)} track="Cybersecurity" source="enroll" />
      <EnrollModal open={joinOpen} onClose={() => setJoinOpen(false)} track="Cybersecurity" source="join" />

      <Footer />
    </>
  );
};

export default Cybersecurity;

