import React from "react";
import "./Team.css";
import haseebImg from '../assets/haseeb-akmal.jpg';
import mustansarImg from '../assets/mustansar-riaz.png';
import Footer from "../Component/Footer.jsx";
const javeriaImg = "https://ui-avatars.com/api/?name=Javeria+Javaid&background=9051e7&color=fff&size=256";

const Team = () => {
  return (
    <div className="team-page">
      <div className="team-header-main">
        <h1>Meet Our Industry Experts</h1>
        <p>Learn from the minds shaping the future of AI, Cybersecurity, and Full Stack Development.</p>
      </div>

      <div className="profiles-container">

        {/* Mustansar Riaz */}
        <div className="profile-card">
          <div className="profile-sidebar">
            <img src={mustansarImg} alt="Mustansar Riaz" className="profile-img" />
            <div className="profile-intro">
              <h2>Mustansar Riaz</h2>
              <h3>Founder & CEO – ATechSole</h3>
              <span className="badge">Secure Full Stack AI Developer</span>
            </div>
          </div>
          <div className="profile-content">
            <section>
              <h4>Profile Overview</h4>
              <p>Mustansar Riaz is the Founder and CEO of ATechSole with over 8+ years of professional experience in software engineering, including 5+ years focused on Artificial Intelligence and Machine Learning–driven products. He is a seasoned Software and AI/ML Engineer known for delivering secure, scalable, and high-impact digital solutions for enterprises and public-sector organizations.</p>
            </section>

            <section>
              <h4>Professional Experience</h4>
              <p>Mustansar has led multiple full stack development projects, including collaborations with the Government of Pakistan, successfully delivering production-grade systems from architecture to deployment. His work spans custom software, SaaS platforms, cloud applications, and secure enterprise systems.</p>
              <p>He possesses deep expertise in Generative AI, Computer Vision, Natural Language Processing, and Large Language Models (LLMs), with the ability to translate cutting-edge academic research into real-world, business-ready solutions.</p>
            </section>

            <section>
              <h4>Leadership & Mentorship</h4>
              <p>At the core of his leadership philosophy is collaborative growth and mentorship. He actively mentors developers and engineers, helping teams scale technically while driving revenue growth, innovation, and brand expansion through advanced technology adoption.</p>
            </section>

            <div className="skills-grid">
              <div>
                <h4>Core Expertise</h4>
                <ul>
                  <li>Secure Full Stack Development</li>
                  <li>Artificial Intelligence & Machine Learning</li>
                  <li>Generative AI, NLP, Computer Vision, LLMs</li>
                  <li>Cybersecurity & Information Security</li>
                  <li>SaaS & Cloud Application Development</li>
                </ul>
              </div>
              <div>
                <h4>Technology Stack</h4>
                <ul>
                  <li><strong>Languages:</strong> PHP (Laravel), Python, React.js, Vue.js</li>
                  <li><strong>AI & Data:</strong> ML & AI Systems, LLMs, Intelligent Automation</li>
                  <li><strong>Solutions:</strong> Custom Software, Web & Mobile Apps, Cloud Platforms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Rana Haseeb Akmal */}
        <div className="profile-card">
          <div className="profile-sidebar">
            <img src={haseebImg} alt="Rana Haseeb Akmal" className="profile-img" />
            <div className="profile-intro">
              <h2>Rana Haseeb Akmal</h2>
              <h3>AI | Machine Learning | Deep Learning Trainer</h3>
            </div>
          </div>
          <div className="profile-content">
            <section>
              <h4>Profile Overview</h4>
              <p>Rana Haseeb Akmal is an Artificial Intelligence and Data Science professional with an MS in Information Technology and extensive experience in academic teaching, professional training, and curriculum design. He is a certified trainer in AI, Machine Learning, and Data Analytics, delivering outcome-driven education aligned with both academic and industry standards.</p>
            </section>

            <section>
              <h4>Academic & Professional Background</h4>
              <p>He has served as a Computer Science and IT Lecturer at leading institutions including University of Central Punjab (UCP) and National College of Business Administration & Economics (NCBA&E). Additionally, he has worked as an Internal Examiner (Computer Studies) at the University of the Punjab (PU), contributing to academic assessment and quality assurance.</p>
            </section>

            <div className="skills-grid">
              <div>
                <h4>Certifications & Credentials</h4>
                <ul>
                  <li>NAVTTC Certified Artificial Intelligence Trainer</li>
                  <li>India EduxLabs Certified – AI & Machine Learning</li>
                  <li>LUMS Certified – Data Science & Machine Learning using Python</li>
                  <li>FAST Certified – Data Analytics & Microsoft Power BI with DAX</li>
                  <li>Bloom’s Digital Taxonomy Expert</li>
                </ul>
              </div>
              <div>
                <h4>Areas of Expertise</h4>
                <ul>
                  <li>Artificial Intelligence & Machine Learning</li>
                  <li>Deep Learning</li>
                  <li>Data Science & Analytics</li>
                  <li>Python for AI & Data</li>
                  <li>Power BI & Data Visualization</li>
                  <li>Outcome-Based Education Design</li>
                </ul>
              </div>
            </div>

            <section>
              <h4>Teaching Philosophy</h4>
              <p>Rana Haseeb’s training methodology focuses on conceptual clarity, analytical thinking, and applied problem-solving. He integrates theory with practical implementation, enabling learners to confidently apply AI and data science techniques to real-world scenarios.</p>
            </section>
          </div>
        </div>

        {/* Javeria Javaid */}
        <div className="profile-card">
          <div className="profile-sidebar">
            <img src={javeriaImg} alt="Javeria Javaid" className="profile-img" />
            <div className="profile-intro">
              <h2>Javeria Javaid</h2>
              <h3>Full Stack Developer | Instructor</h3>
            </div>
          </div>
          <div className="profile-content">
            <section>
              <h4>Profile Overview</h4>
              <p>Javeria Javaid is a Full Stack Developer with a Bachelor’s degree in Computer Science and one year of professional industry experience at AtechSole. She specializes in building and maintaining scalable, production-level web applications using modern full stack technologies.</p>
            </section>

            <section>
              <h4>Professional Experience</h4>
              <p>During her tenure at AtechSole, Javeria worked on both front-end and back-end development, collaborating with cross-functional teams and following industry-standard development workflows. Her contributions focused on clean code practices, performance optimization, and maintainable system design.</p>
            </section>

            <section>
              <h4>Teaching Experience & Approach</h4>
              <p>In addition to her industry role, Javeria is actively involved in teaching Full Stack Development, guiding students through the complete application lifecycle — from fundamentals to deployment. Her teaching approach is structured, practical, and industry-oriented, ensuring learners gain both conceptual clarity and hands-on confidence.</p>
            </section>

            <div className="skills-grid">
              <div>
                <h4>Technology Stack</h4>
                <ul>
                  <li><strong>Front-End:</strong> React, React.js, HTML5, CSS3, JavaScript (ES6+)</li>
                  <li><strong>Back-End:</strong> Node.js, Express.js, RESTful API Development</li>
                  <li><strong>Database:</strong> MongoDB</li>
                  <li><strong>Tools:</strong> Git & GitHub, MVC Architecture</li>
                </ul>
              </div>
              <div>
                <h4>Student Outcomes</h4>
                <ul>
                  <li>Build complete full stack applications independently</li>
                  <li>Understand real-world development workflows</li>
                  <li>Prepare for internships, interviews, and junior developer roles</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer/>
    </div>
  );
};

export default Team;
