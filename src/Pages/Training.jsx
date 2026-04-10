import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./Training.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleRight, FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Import local assets
import haseebImg from '../assets/haseeb-akmal.jpg';
import mustansarImg from '../assets/mustansar-riaz.png';
// Using a placeholder for Javeria as requested
const javeriaImg = "https://ui-avatars.com/api/?name=Javeria+Javaid&background=FF4081&color=fff&size=256&rounded=true&bold=true&font-size=0.4";

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    title: "AI & Machine Learning Track",
    trainer: "Rana Haseeb Akmal",
    role: "Lead Instructor",
    image: haseebImg,
    description:
      "Master Artificial Intelligence, Machine Learning, and Deep Learning. Hands-on training with real-world AI problem solving.",
    graduates: "NAVTEC Certified",
    duration: "6 Months",
  },
  {
    title: "Cybersecurity Track",
    trainer: "Mustansar Riaz",
    role: "CEO & Security Lead",
    image: mustansarImg,
    description:
      "Become a Cyber Defender. Learn Network Security, Ethical Hacking, and Securing AI Systems with industry experts.",
    graduates: "Govt. Collaborator",
    duration: "6 Months",
  },
  {
    title: "Full Stack Development Track",
    trainer: "Javeria Javaid",
    role: "Development Lead",
    image: javeriaImg,
    description:
      "Build scalable web applications. Master MERN stack and modern development standards for production-level coding.",
    graduates: "Industry Vetted",
    duration: "6 Months",
  },
  {
    title: " (QES)Quick Earning Skills Track",
    trainer: "Mustansar Riaz ",
    role: "QES Lead",
    image: mustansarImg,
    description:
      "Build quick earning skills. Learn to create simple apps with limited resources. The track is designed to help you learn the basics of app development and how to create a simple app with limited resources.",
    graduates: "Govt. Collaborator",
    duration: "6 Months",
  },
  {
    title: " AI Automation using n8n zapier",
    trainer: "Mustansar Riaz ",
    role: "AI-Automation Lead",
    image: mustansarImg,
    description:
      "Ai Automation using n8n zapier is a bootcamp that teaches you how to use n8n and zapier to automate your business processes.",
    graduates: "Govt. Collaborator",
    duration: "2 Months",
  }

];

const PrevArrow = ({ onClick }) => (
  <div className="arrow prev-arrow" onClick={onClick}>
    <span>❮</span>
  </div>
);

// Custom right arrow component
const NextArrow = ({ onClick }) => (
  <div className="arrow next-arrow" onClick={onClick}>
    <span>❯</span>
  </div>
);
const Training = () => {


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


  const textRef0 = useRef(null);
  const [fillPercent0, setFillPercent0] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef0.current) return;
      const rect = textRef0.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll percentage (smooth transition)
      const visible = Math.min(windowHeight - rect.top, rect.height);
      const percent = Math.max(0, Math.min(visible / rect.height, 1)) * 100;
      setFillPercent0(percent);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: "unslick" }, // Disable slider on mobile to stack cards vertically
    ],
  };



  return (
    <div className="course-slider">
      <div className="pro">
        <p className="firstP">Elite Tech Training ——— —</p>
        <h1>DEVSECAI Bootcamp Tracks</h1>
        <p className="secondP">Launch your career with ATechSkills' rigorous training programs.
          Detailed curriculum designed for beginners and professionals alike.
          Master the future of tech with Development, Security, and AI.</p>
      </div>
      <Slider {...settings}>
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <div className="course-image">
              <img src={course.image} alt={course.title} style={{ objectFit: 'cover', objectPosition: 'top' }} />
            </div>
            <div className="course-content">
              <h3 className="course-title">{course.title}</h3>
              <p className="trainer">
                <span className="dot"></span> {course.trainer}{" "}
                <span className="role">({course.role})</span>
              </p>
              <p className="description">{course.description}</p>
              <div className="stats">
                <p>🏆 {course.graduates}</p>
                <p>⏱ {course.duration}</p>
              </div>
              <button className="btn-primary1"><Link to="/Enroll"> Apply Now < FaAngleRight size={13} /> </Link></button>
            </div>
          </div>
        ))}
      </Slider>
      <div className="btt">
        <button className="view"><Link to="/Courses">View Detailed Curriculum</Link></button>
      </div>
      <div className="mission">
        <div className='intro'>
          {/* Updated Vision & Mission Image */}
          <img src={mustansarImg} alt="Mustansar Riaz - CEO" style={{ width: '400px', height: 'auto', borderRadius: '10px', objectFit: 'cover' }} />
          <div className='intro-lines'>
            <p id='introS'> Mustansar Riaz ——— — </p>
            <h1>Our Vision & Mission</h1>
            <p ref={textRef1}
              className="scroll-fill-text1"
              style={{
                backgroundSize: `${fillPercent1}% 100%`,
              }}>ATechSkills was founded to bridge the critical skills gap in Pakistan's tech industry. We believe in outcome-based education where Development, Security, and AI converge
              to create the next generation of tech leaders. Our goal is to empower youth with high-income skills.</p>
          </div>
        </div>
      </div>

      <div className="institutes">
      <p id='introS'> Tech Hubs ——— — </p>
      <h1>ATechSkills Institutes</h1><br />
      </div>
      <p ref={textRef0}
        className="scroll-fill-text1"
        style={{
          backgroundSize: `${fillPercent0}% 100%`,
        }}>Headquartered in Lahore with a growing presence across Pakistan.
        <br />We provide state-of-the-art labs and co-working spaces for our students.</p>


      <div className="locations" style={{ justifyContent: 'center', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

        {/* Lahore */}
        <div className="contact-card" >
          <div className="icon-circle orange">
            <FaLocationDot />
          </div>
          <h2>Lahore HQ</h2>
          <div className="divider"></div>
          <ul>
            <li><FaPhone /> +92-325-3344552</li>
            <li><FaEnvelope /> contact@atechskills.pk</li>
            <li>
              <FaLocationDot /> 101 block commercial market DHA phase 12 EME LHR
            </li>
          </ul>
        </div>


      </div>


    </div>


  );
};

export default Training;
