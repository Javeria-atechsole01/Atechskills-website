import React, { useEffect, useRef, useState } from "react";
import { FaAngleRight, FaStar, FaUser, FaUsers, FaClock, FaArrowRight, FaVideo, FaHeadset, FaInfinity, FaUserPlus } from "react-icons/fa"
import Footer from '../Component/Footer.jsx'
import { Link } from "react-router-dom";
import './Courses.css'

const cardsData = [
  {
    id: 1,
    title: "AtechSkills DevSecAI Bootcamp - AI Track",
    trainer: "Rana Haseeb Akmal",
    desc: "AtechSkills DevSecAI Bootcamp offers a comprehensive Artificial Intelligence course, focused on AI algorithms, machine learning, and deep learning.This track includes a mix of development and cybersecurity principles to integrate AI into real-world applications.",
    duration: "6 Months",
    image: "https://www.workitdaily.com/media-library/artificial-intelligence-ai-technology-concept.jpg?id=34199573&width=1200&height=800&quality=50&coordinates=84%2C0%2C84%2C0",
  },
  {
    id: 2,
    title: "AtechSkills DevSecAI Bootcamp - Development Track",
    trainer: "Javeria Javed",
    desc:
      "AtechSkills DevSecAI Bootcamp offers a comprehensive Development course, covering key concepts of front-end and back-end development,cybersecurity, and AI. This track is designed for those interested in becoming full-stack developers with knowledge of AI and cybersecurity",
    duration: "6 Months",
    image: "https://blog.zegocloud.com/wp-content/uploads/2024/03/types-of-web-development-services.jpg",
  },
  {
    id: 3,
    title: "AtechSkills DevSecAI Bootcamp - Cybersecurity Track",
    trainer: "Mustansar Riaz ",
    desc:
      "AtechSkills DevSecAI Bootcamp offers a comprehensive Cybersecurity course, equipping students with the skills necessary to protect systems,networks, and data from cyber attacks.The course also includes a basic understanding of development and AI principles.",
    duration: "6 Month",
    image: "https://certiprof.com/cdn/shop/articles/Cybersecurity_certiprof.webp?v=1741879682&width=1312",
  },
  {
    id: 4,
    title: "(QES)Quick Earning Skills Bootcamp - QES Track",
    trainer: "Mustansar Riaz ",
    desc:
      "AtechSkills DevSecAI Bootcamp offers a comprehensive Quick Earning Skills course, equipping students with the skills necessary to create simple apps with limited resources. The course covers 10 skills using AI tools.AI chatgpt intro,youtube automation,seo blogging,graphic designing,digital marketing,video editting,ecommerce,freelancing,no code website builder ,final guidelines ",
    duration: "6 Month",
    image: "https://media.istockphoto.com/id/2168908844/photo/excellence-growth-strategy-business-trend-concept-businessman-hand-on-arrow-invest-icon-fast.webp?a=1&b=1&s=612x612&w=0&k=20&c=GDmY1ae2WyLST65B5PzGMqd4bVno6iowVHQKNRBMzX0=",
  },
];


const Courses = () => {
  const textReff = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { threshold: 0.2 }
    );

    if (textRef.current) observer.observe(textRef.current);
    return () => observer.disconnect();
  }, []);

  const textRef = useRef(null);
  const [fillPercent, setFillPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return;
      const rect = textRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll percentage (smooth transition)
      const visible = Math.min(windowHeight - rect.top, rect.height);
      const percent = Math.max(0, Math.min(visible / rect.height, 1)) * 100;
      setFillPercent(percent);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textRef1 = useRef(null);
  const [fillPercent1, setFillPercent1] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef1.current) return;
      const rect = textRef1.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll percentage (smooth transition)
      const visible = Math.min(windowHeight - rect.top, rect.height);
      const percent = Math.max(0, Math.min(visible / rect.height, 1)) * 100;
      setFillPercent1(percent);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);




  const [time, setTime] = useState({
    days: -335,
    hours: -9,
    minutes: -52,
    seconds: -25,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } = prev;

        seconds--; // countdown

        if (seconds < -59) {
          seconds = -0;
          minutes--;
        }
        if (minutes < -59) {
          minutes = -0;
          hours--;
        }
        if (hours < -23) {
          hours = -0;
          days--;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className='courses'>
        <div className='about'>
          <p id='SigC'>Signature Courses ——— —</p>
          <h1>AI <span>Web Development & CyberSecurity</span> Training<br /> by Mustansar Riaz</h1>
          <div className='M-tanveer'>
            <img src='data:image/jpeg;base64,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' />
            <div className='inner-div'>
              <h2>M Mustansar Riaz</h2>
              <p>Full stack developer – Master Trainer. 12+ Years Experienced</p>
            </div>
          </div>
          <p id='aboutP'>If you’re aiming to build a future-proof tech career in one of the world’s fastest-growing digital industries,
            mastering Full-Stack Development, AI, and Cybersecurity is the smartest path forward. And when it comes to learning these high-demand skills with real-world depth, there’s no better guide than a dedicated full-stack developer and AI–cybersecurity professional like Mustansar Riaz.</p>
          <div className='STAR'>
            <div className="starr">
              <span><FaStar /> AtechSkills DevSecAI Bootcamp - AI Track</span>
              <span><FaStar /> AtechSkills DevSecAI Bootcamp - Cybersecurity Track</span>
              <span><FaStar /> AtechSkills DevSecAI Bootcamp - Development Track</span>
            </div>
          </div>
        </div>



        <div className="stats-section">
          <h2 className="stats-title">Our numbers speak for themselves</h2>
          <div className="stats-grid-container">
            <div className="stat-item">
              <FaVideo className="stat-icon" />
              <h3>100+</h3>
              <p>Live Lectures</p>
            </div>

            <div className="stat-item">
              <FaHeadset className="stat-icon" />
              <h3>24/7</h3>
              <p>Expert Support</p>
            </div>

            <div className="stat-item">
              <FaInfinity className="stat-icon" />
              <h3>LifeTime</h3>
              <p>Course Access</p>
            </div>

            <Link to="/Enroll" className="stat-item cta-card">
              <FaUserPlus className="stat-icon" />
              <h3>3,000+</h3>
              <p>Enrolled (Join Now)</p>
            </Link>
          </div>
        </div>
      </div>

      <div className='regis'>
        <h1 ref={textRef}
          className="scroll-fill-text"
          style={{
            backgroundSize: `${fillPercent}% 100%`,
          }}
        >You already missed the current Batch </h1>
        <p ref={textReff}
          className={`drop-text ${isVisible ? "visible" : ""}`}>Pre Register Now</p>
      </div>
      <section className="timer-section">
        <div className="timer-container">
          <div className="time-box">
            <h4>Days</h4>
            <span>{time.days}</span>
          </div>
          <span className="colon">:</span>
          <div className="time-box">
            <h4>Hours</h4>
            <span>{time.hours}</span>
          </div>
          <span className="colon">:</span>
          <div className="time-box">
            <h4>Minutes</h4>
            <span>{time.minutes}</span>
          </div>
          <span className="colon">:</span>
          <div className="time-box">
            <h4>Seconds</h4>
            <span>{time.seconds}</span>
          </div>
        </div>
      </section>
      <div className="Courses">
        <p >Popular ——— —  </p>
        <h1>Courses by AtechSole</h1>
        <p ref={textRef1}
          className="scroll-fill-text1" id="crs"
          style={{
            backgroundSize: `${fillPercent1}% 100%`,
          }}> Enhance your career with AtechSole' professional training programs in AI, Web Development and Cyber Security.AtechSkills DevSecAI Bootcamp offers a comprehensive Artificial Intelligence course, Cybersecurity course and Development course focused on AI algorithms, machine learning,understanding of
          <br />development and AI principles,key concepts of front-end and back-end development.

        </p>
      </div>

      <div className="cards-container">
        {cardsData.map((c) => (
          <div key={c.id} className="card">
            <div className="card-image">
              <img src={c.image} alt={c.title} />
            </div>


            <div className="card-body">
              <h3 className="card-title">{c.title}</h3>


              <div className="trainer">
                <img src="https://cdn-icons-png.flaticon.com/128/11528/11528308.png" className="icon" alt="Trainer Icon" />
                <span className="trainer-name">{c.trainer} <span className="muted">(Trainer)</span></span>
              </div>


              <p className="card-desc">{c.desc}</p>


              <div className="meta">
                <div className="meta-item">
                  <img src="https://cdn-icons-png.flaticon.com/128/11925/11925884.png" className="meta-icon" alt="Duration Icon" />
                  <div>
                    <div className="meta-value">{c.duration}</div>
                    <div className="muted small">(Duration)</div>
                  </div>
                </div>
              </div>


              <div className="card-footer">
                <button className="detail-btn">
                  <Link to={
                    c.title.includes('AI Track') ? '/AI' :
                      c.title.includes('Cybersecurity Track') ? '/Cybersecurity' :
                        c.title.includes('Development Track') ? '/Development' :
                          '/Courses'
                  }>Get Details < FaAngleRight size={13} /></Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </>
  );
};

export default Courses
