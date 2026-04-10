import React, { useEffect, useRef, useState } from "react";
import "./SEBT.css";
import CoursePricingCard from '../Component/CoursePricingCard.jsx';
import { Link } from "react-router-dom";
import { FaStar, FaAngleRight } from "react-icons/fa";
import Footer from "../Component/Footer.jsx";
import EnrollModal from "../Component/EnrollModal.jsx";
import images1 from '../web1.png'
import images2 from '../web2.png'
import images3 from '../web3.png'

const Development = () => {
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

  const renderContent = () => {
    switch (activeTab) {
      case "content":
        return (
          <div className="content-box">
            <h2>Whats New:-</h2>
            <ul>
              <li><span className="star"></span>
              <div><b>Full-Stack Projects</b><br/> Full stack projects cover both front-end and back-end development, using technologies like React, Node.js, and MongoDB. You’ll build real-world applications from scratch, understanding the full development lifecycle and best practices.</div>
              </li>
              <li><span className="star"></span>
              <div><b>Modern Frontend Frameworks</b><br/> Modern frontend frameworks like React, Angular, and Vue.js enable you to create dynamic, interactive user interfaces. You’ll learn to build single-page applications (SPAs) and component-based architectures, mastering state management, routing, and performance optimization.</div>
              </li>
              <li><span className="star"></span>
              <div><b>UI/UX Design principles</b><br/> UI/UX design principles focus on creating intuitive, user-centered interfaces. You’ll learn to design wireframes, prototypes, and interactive wireflows, ensuring a seamless and enjoyable user experience.</div> 
              </li>  
            </ul><br />

            <h2>Course Outline:-</h2>
            <ul>
              <li>
                <span className="star"></span>
                <div>
                  <b>Front-End Development:<br/>HTML, CSS, JavaScript Fundamentals</b><br />Responsive design, semantic HTML, modern CSS and ES6+ JavaScript for interactive UIs. You’ll learn layout techniques (Flexbox/Grid), component-driven UIs, accessibility (WCAG), performance optimization (lazy loading, bundling), and testing (Jest/RTL) to ship fast, polished experiences on web and mobile.
                This topic covers the core concepts of front-end development, including HTML, CSS, and JavaScript. You’ll learn to build responsive, interactive, and user-friendly web applications using modern front-end frameworks and libraries.
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Back-end Development:<br/> Python with Node.js</b><br />Server fundamentals, REST APIs, authentication and data persistence patterns. Build scalable services with routing, middleware, ORM/ODM integration, background jobs and caching, and secure them using JWT/OAuth2, rate-limiting and input validation, ready for production deployment.
                This topic covers the core concepts of back-end development, including server-side logic, database interaction, and API design. You’ll learn to build robust, secure, and high-performance back-end systems using Python and Node.js.
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Web Development frameworks:<br/> React, Angular</b><br />Components, routing, state management and best practices for scalable frontends. Master hooks, context, Redux/Signals, code-splitting, SSR/SSG patterns and TypeScript adoption to achieve maintainable architectures and seamless user journeys.
                This topic covers the core concepts of web development frameworks, including React and Angular. You’ll learn to build modern, interactive, and user-friendly web applications using these popular front-end frameworks.
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Database Management (SQL/NoSQL)</b><br />Schema design, indexing, transactions and query optimization across relational and document stores. Learn normalization vs denormalization, write/read patterns, migrations, backups, and monitoring for healthy, cost‑efficient data layers.
                This topic covers the core concepts of database management, including SQL and NoSQL databases. You’ll learn to design, query, and optimize databases for performance, scalability, and security.
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Software Development life Cycle(SDLC)</b><br />Requirements, architecture, testing, CI/CD and deployment for production readiness. Adopt agile practices, user story mapping, design reviews, test pyramids, observability and release strategies to deliver iteratively and safely.
                The SDLC topic covers the entire software development lifecycle, from requirements gathering and analysis to testing, deployment, and maintenance. You’ll learn to follow best practices and industry standards to build high-quality, scalable, and maintainable software solutions.
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Version Control with Git</b><br />Branching strategies, pull requests, code reviews and release management. Use trunk-based or GitFlow, enforce quality via CI checks, manage conflicts effectively and maintain clean histories for collaboration at scale.
                This topic covers the core concepts of version control with Git, including branching, merging, pull requests, and code reviews. You’ll learn to use Git effectively for collaboration and project management.
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>UI/UX Design principles</b><br />Layout, typography, accessibility and usability heuristics for delightful experiences. Practice wireframing, prototyping, design systems and micro‑interactions to raise engagement and reduce friction across journeys.
                This topic covers the core concepts of UI/UX design principles, including layout, typography, accessibility, and usability heuristics. You’ll learn to create user-friendly and visually appealing interfaces that enhance the user experience.
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
                  <b>Introduction to AI</b><br />Key concepts, applications and terminology with practical real-world use cases. Understand ML vs DL, data-centric vs model-centric approaches, and where AI augments developer workflows for smarter products.
                  The core funadamentals of AI include key concepts, applications, and terminology with practical real-world use cases. You’ll learn to understand the difference between Machine Learning (ML) and Deep Learning (DL), as well as the data-centric vs model-centric approaches to AI. You’ll also learn about the role of AI in augmenting developer workflows for smarter products.
                
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Machine Learning fundamentals</b><br />Machine Learning (ML) fundamentals involve teaching computers to learn patterns from data to make predictions or decisions without explicit programming, using key types like Supervised (labeled data), Unsupervised (unlabeled patterns), and Reinforcement Learning (rewards/punishments). Core concepts include data, algorithms, models (learned patterns), training (learning), and evaluation, with the process involving data prep, training, testing, and deployment to find optimal solutions through optimization. 
                This topic teachs you the core fundamentals of Machine Learning (ML), including key concepts, applications, and terminology with practical real-world use cases. You’ll learn to understand the difference between Machine Learning (ML) and Deep Learning (DL), as well as the data-centric vs model-centric approaches to AI. You’ll also learn about the role of AI in augmenting developer workflows for smarter products.
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Deep Learning Basics</b><br />Deep learning basics involve using multi-layered artificial neural networks, inspired by the human brain, to automatically learn patterns from vast amounts of complex data, making it a subset of machine learning used for tasks like image recognition and NLP without manual feature extraction. 
                  These networks consist of interconnected "neurons" organized in layers that process data, with the "deep" part referring to having many layers, allowing for the extraction of complex, hierarchical features for highly accurate AI applications. 
                  
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>data processing and analysis</b><br />Data processing and analysis transform raw data into insights, with processing being the initial steps of collecting, cleaning, organizing, and converting data into a usable format, while analysis is the subsequent stage of inspecting, modeling, and interpreting that processed data to find patterns, test hypotheses, and support decision-making, forming the backbone of data-driven strategies across industries like business, healthcare, and finance. 
                  <br/><b>Data Processing: Turning Raw Data into Information</b><br/>
                    <b>Collection:</b> Gathering data from various sources (databases, streams, files).
                   <br/> <b>Cleaning/Editing:</b>  Removing errors, handling missing values, and eliminating duplicates.
                    <br/><b>Transformation/Coding:</b>  Converting data into a consistent format (e.g., numerical/alphabetical codes).
                    <br/><b>Classification & Tabulation:</b>  Grouping data and organizing it into tables (like frequency tables).
                    <br/><b>Summarization:</b>  Condensing data into main points.
                    <br/><b>Output:</b>  Presenting the processed data as usable information (charts, reports). 
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>AI tools and frameworks(TensorFlow, Pytorch)</b><br />Hands-on workflows, model training and integration with web applications. Set up experiments, leverage GPUs, export artifacts and wire inference to your backend/frontend safely.
                <br/><b>Popular frameworks</b><br/>
                <b>1.TensorFlow</b><br/>
                  TensorFlow is an open-source library known for its scalability and performance in large-scale, distributed environments. 
                  <br/><b>* Strengths:</b> Excels in production environments due to its static computation graphs (in older versions) which allow for optimization across various hardware configurations. It provides a broad ecosystem of tools for specific deployment needs, such as TensorFlow Lite for mobile and embedded devices, and TensorFlow.js for web browsers.
                 <br/> <b>* Best For:</b> Enterprise-level projects, large-scale deployments, and robust applications where performance optimization is key. 
                 <br/> <b>2. PyTorch</b><br/>
                  PyTorch is a framework popular in the research community for its flexibility and ease of use. 
                  <br/><b>* Strengths:</b> Its dynamic computation graphs (eager execution) allow for real-time changes and easier debugging, making experimentation faster and more intuitive. It has a deep integration with Python and a very active community.
                 <br/><b>* Best For:</b> Academic research, rapid prototyping, and projects requiring high flexibility and a more intuitive coding experience. 
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
                  <b>Cyber Security Fundamentals </b><br />Cybersecurity fundamentals involve protecting systems, networks, and data using technologies, processes, and controls, centered on the core principles of Confidentiality, Integrity, and Availability (the CIA Triad). Key areas include network security, threat detection, identity/access management, incident response, data security (like encryption), and educating users against threats like phishing, all working together to build a strong defense against cyberattacks and ensure digital resilience.  
                <br/><b>Key Concepts & Best Practices</b><br/>
                <b>1.Authentication & Authorization:</b> Verifying who someone is (authentication) and what they are allowed to do (authorization).
                <br/><b>2.Multi-Factor Authentication (MFA):</b> Requiring multiple forms of verification (password + code from phone) for logins.
                <br/><b>3.Encryption:</b> Scrambling data so it's unreadable without a key, protecting data in transit and at rest.
                <br/><b>4.Least Privilege:</b> Granting users only the minimum access needed for their job.
                <br/><b>5.Security Awareness:</b> Educating users about phishing, malware, and safe browsing habits.
                <br/><b>6.Incident Response:</b> Having a plan to detect, contain, and recover from security breaches. 
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Threat Modeling and Risk Management</b><br />Threat modeling identifies potential security threats to systems and assets, while risk management assesses, prioritizes, and mitigates those threats, with threat modeling feeding into risk management by providing detailed insights into vulnerabilities and potential attacks, allowing for proactive security measures, early design fixes, and informed decision-making on where to focus resources for better overall cybersecurity posture
                <br/><b>Key Methodologies & Frameworks</b>
                 <br/><b> 1.STRIDE:</b> Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege.
                 <br/><b> 2.DREAD:</b> Damage potential, Reproducibility, Exploitability, Affected users, Discoverability (often superseded).
                  <br/><b>3.PASTA:</b> Process for Attack Simulation and Threat Analysis.
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Network Security Fundamentals</b><br />Network Security Fundamentals involve protecting networks and data from threats, focusing on the CIA Triad (Confidentiality, Integrity, Availability) through layered controls like firewalls, strong access (MFA, least privilege), segmentation, encryption, and regular updates, all managed by policies, monitoring, and user training to ensure secure communication and reliable system access. 
                <br/><b>Key Technologies & Methods</b>
                <br/><b>1.Firewalls:</b> Act as barriers, controlling incoming and outgoing network traffic.
                <br/><b>2.Encryption:</b> Scrambles data so only authorized parties can read it.
                <br/><b>3.Access Control:</b> Manages who can access what (Authentication & Authorization).
                <br/><b>4.Antivirus/Anti-malware:</b> Protects against malicious software.
                <br/><b>5.Intrusion Detection/Prevention Systems (IDS/IPS):</b> Monitor for and block suspicious activity. 
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Web Application Security</b><br />Web application security is the practice of protecting websites, web apps, and APIs from threats by securing their code, infrastructure, and data throughout the Software Development Life Cycle (SDLC) to prevent data theft, service disruption, and unauthorized access, using methods like secure coding, penetration testing, input validation, and tools like Web Application Firewalls (WAFs).
                <br/><b>Key Aspects</b>
                 <br/><b>1.Vulnerability Protection:</b> Defends against common attacks like SQL Injection, XSS, Denial of Service (DoS), and Cross-Site Request Forgery (CSRF).
                 <br/><b>2.Data Security:</b> Encrypts sensitive data at rest and in transit, protecting user information and intellectual property.
                 <br/><b>3.Authentication & Authorization:</b> Implements strong access controls, multi-factor authentication (MFA), and role-based permissions.
                 <br/><b>4.Secure Development:</b> Integrates security into every stage of development (DevSecOps) through secure coding practices, design reviews, and continuous testing. 
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Cryptography Basics</b><br />Cryptography basics involve securing information by transforming readable plaintext into unreadable ciphertext using algorithms and keys, ensuring confidentiality, integrity, authentication, and non-repudiation for data, with core types being symmetric (same key) and asymmetric (public/private key pairs) encryption, essential for everything from secure web browsing (HTTPS) to banking and messaging. 
               <br/><b>1.Plaintext:</b> The original, readable message or data (e.g., a text document or image).
                <br/><b>2.Ciphertext:</b> The scrambled, unreadable version of the message after it has been encrypted.
                <br/><b>3.Cipher:</b> The specific algorithm or mathematical formula used to transform plaintext into ciphertext.
                <br/><b>4.Key:</b> A secret string of bits or characters used by the cipher to perform the encryption and decryption processes.
                <br/><b>5.Encryption:</b> The process of converting plaintext into ciphertext using a cipher and a key.
                <br/><b>6.Decryption:</b> The reverse process of converting ciphertext back into its original, readable plaintext.
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
        <h1> ATechSkills<span id="batch"> DevSecAI </span> Bootcamp - Development Track </h1>
        <div className="rating">
          <img src="https://iskills.com/wp-content/uploads/2024/04/trainer.svg" />
          <p>Javeria <span>(Trainer)</span></p>
          <img src="https://iskills.com/wp-content/uploads//2024/03/user-stars.svg" />
          <p>10,000+ <span> (Graduates)</span></p>
          <p> 5 <FaStar /> <span> ( 4000 Reviews )</span></p>
        </div>

        <div className="hero-both">
          <div className="hero-Dbg">

          </div>

          {open && (
            <div className="video-overlay">
              <div className="video-box">
                <span className="close" onClick={() => setOpen(false)}>✖</span>
                <iframe
                  src="https://youtu.be/-DhuMYRSmP0"
                  title="YouTube video"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          <div className='white-div1' style={{ height: 'auto', background: 'transparent', boxShadow: 'none', padding: 0 }}>
            <CoursePricingCard />
          </div>
        </div>


        <p id="training-program"><b>ATechSkills DevSecAI Bootcamp - Development Track Training Program 2025!</b><br /><br />
          Led by industry expert <b>Javeria</b>, master <b>Full stack developer.</b><br />
          Gain practical skills and expert insights to transform your career.<br /><br />
          Sign up now and become a skilled full-stack developer!</p><br />
        <p className="firstP">Bootcamp - Development Track Details & Registration ——— —</p>
        <p id="training">Course Breakdown (60% Development, 20% AI, 20% Cybersecurity)</p>

        <div className="container">
          <div className="tabs">
            <button className={activeTab === "content" ? "active" : ""} onClick={() => setActiveTab("content")}>
              60% Development
            </button>
            <button className={activeTab === "important" ? "active" : ""} onClick={() => setActiveTab("important")}>
              20% AI
            </button>
            <button className={activeTab === "bonuses" ? "active" : ""} onClick={() => setActiveTab("bonuses")}>
              20% Cybersecurity
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
        >Join AtechSkills DevSecAI Bootcamp - Development Track today and turn learning into earning!<br />
          Led by Javeria, provide practical, industry-aligned training that helps students and professionals<br />
          step confidently into the global tech marketplace—equipped with the knowledge, skills, and<br /> mindset needed to succeed.</p>
        <section className="stack-section">
          <div ref={(el) => (cardRefs.current[0] = el)} className="stack-card pink">
            <div className="step-badge">01</div>
            <h2 className="stack-title">Modern Frontend</h2>
            <p className="stack-desc">React patterns, state management and UI architecture with reusable components.</p>
            <img src={images1} alt="Modern Frontend" />
          </div>
          <div ref={(el) => (cardRefs.current[1] = el)} className="stack-card lavender">
            <div className="step-badge">02</div>
            <h2 className="stack-title">Robust Backend</h2>
            <p className="stack-desc">RESTful APIs with Node.js, authentication, testing and production deployments.</p>
            <img src={images2} alt="Robust Backend" />
          </div>
          <div ref={(el) => (cardRefs.current[2] = el)} className="stack-card smoke">
            <div className="step-badge">03</div>
            <h2 className="stack-title">Dev Career</h2>
            <p className="stack-desc">Projects, Git workflows and interview prep tailored for full-stack roles.</p>
            <img src={images3} alt="Dev Career" />
          </div>
        </section>
      </div>

      <section className="cta-section">
        <div ref={ctaRef} className="cta-container">
          <h2 ref={ctaTitleRef} className="cta-title">BUILT FOR EVERYONE</h2>
          <p className="cta-sub">Learn in public, build projects, and join a supportive community.</p>
          <div className="white-faq">
            <h2>Bootcamp - Development Track</h2><br />
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


      <EnrollModal open={enrollOpen} onClose={() => setEnrollOpen(false)} track="Development" source="enroll" />
      <EnrollModal open={joinOpen} onClose={() => setJoinOpen(false)} track="Development" source="join" />

      <Footer />
    </>
  );
};

export default Development;
