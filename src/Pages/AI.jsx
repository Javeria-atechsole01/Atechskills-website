import React, { useEffect, useRef, useState } from "react";
import './SEBT.css'
import CoursePricingCard from '../Component/CoursePricingCard.jsx'
import { Link } from "react-router-dom";
import { FaStar, FaAngleRight, FaChevronDown } from "react-icons/fa"
import Testimonals from "./Testimonals.jsx";
import Footer from '../Component/Footer.jsx'
import EnrollModal from '../Component/EnrollModal.jsx'
import image1 from '../Ai1.png'
import image2 from '../Ai2.png'
import image3 from '../Ai3.png'

const faqData = [
  {
    question: "Transform Your Career: Discover Why This Training Is a Game-Changer",
    answer:
      <ul>
        <li>
          <span className="star"></span>
          <div>
            <b>Diverse Career Pathways:</b><br />
            Build a thriving career in Blogging, Affiliate Marketing, Freelancing, or Digital Services, or secure high-paying jobs in top-tier markets through our comprehensive training.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Comprehensive Website Development:</b><br />Master everything from website setup to monetization. Learn to create, optimize, and profit from blogs or websites using proven strategies.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Launch Your Own SEO Agency:</b><br />Acquire cutting-edge skills to optimize client websites and establish a successful SEO business.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Launch an AIO Agency:</b><br /> Be among the first to capitalize on Answer Engine Optimization (AIO), optimizing content for AI-driven search engines like ChatGPT and Gemini, and secure the first-mover advantage.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Freelancing Opportunities:</b><br />Deliver premium SEO and digital marketing services on platforms like Fiverr, Upwork, and iSkillsPro while building a strong portfolio
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b> Global Market Competency: </b><br />Develop SEO expertise tailored to meet the demands of global office-based roles and international clients.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b> Boost Your Online Business: </b><br />Use SEO to increase traffic, visibility, and sales for platforms like Amazon FBA, Dropshipping stores, or other e-commerce ventures.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b> Exceptional Content Strategies: </b><br />Stand out as a content creator by crafting impactful, high-ranking content in an increasingly competitive landscape.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b> SEO Specialization: </b><br />Begin your journey to becoming a certified SEO professional, ready to tackle real-world challenges.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b> Premium Networking Opportunities: </b><br />Join an elite community of digital marketers, SEO specialists, and influential bloggers to grow your network and career.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b> Learn from an Industry Pioneer: </b><br />Gain actionable insights from Tanveer Nandla, the ‘Best Blogger of Pakistan’ and recipient of the ‘Pride of Pakistan’ award.
          </div>
        </li>
      </ul>
    ,
  },
  {
    question: "This Training Might Not Be For You If:",
    answer:
      <ul>
        <li>
          <span className="star"></span>
          <div>
            <b>Diverse Career Pathways:</b><br />
            Build a thriving career in Blogging, Affiliate Marketing, Freelancing, or Digital Services, or secure high-paying jobs in top-tier markets through our comprehensive training.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Comprehensive Website Development:</b><br />Master everything from website setup to monetization. Learn to create, optimize, and profit from blogs or websites using proven strategies.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Launch Your Own SEO Agency:</b><br />Acquire cutting-edge skills to optimize client websites and establish a successful SEO business.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Launch an AIO Agency:</b><br /> Be among the first to capitalize on Answer Engine Optimization (AIO), optimizing content for AI-driven search engines like ChatGPT and Gemini, and secure the first-mover advantage.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Freelancing Opportunities:</b><br />Deliver premium SEO and digital marketing services on platforms like Fiverr, Upwork, and iSkillsPro while building a strong portfolio
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b> Global Market Competency: </b><br />Develop SEO expertise tailored to meet the demands of global office-based roles and international clients.
          </div>
        </li>
      </ul>
    ,
  }];


const AI = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1800,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const [openIndex, setOpenIndex] = useState(null);
  const cardRefs = useRef([]);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.3 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ctaRef = useRef(null);
  const ctaTitleRef = useRef(null);
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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

  const textRef11 = useRef(null);
  const [fillPercent11, setFillPercent11] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef11.current) return;
      const rect = textRef11.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll percentage (smooth transition)
      const visible = Math.min(windowHeight - rect.top, rect.height);
      const percent = Math.max(0, Math.min(visible / rect.height, 1)) * 100;
      setFillPercent11(percent);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
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



  const renderContent = () => {
    switch (activeTab) {
      case "content":
        return (
          <div className="content-box">
            <h2>Whats New:-</h2>

            <ul>
              <li><span className="star"></span><div><b>Computer Vision</b><br/>Computer vision allows computers to interpret and analyze visual data from images and videos. This field of AI uses machine learning, deep learning, and pattern recognition to identify objects, detect patterns, and extract meaningful insights.
              <br/><b> * Key techniques</b><br/>
                <b>Image Processing:</b> Enhancing and manipulating visual data.<br/>
                <b>Feature Extraction:</b> Identifying key characteristics.<br/>
                <b>Object Detection/Recognition:</b> Locating and identifying objects.<br/>
                <b>Image Segmentation:</b> Dividing an image into meaningful regions.<br/>
                <b>Pattern Recognition:</b> Finding recurring structures. </div></li> 
              <li><span className="star"></span><div><b>Building AI Applications</b><br/>Building AI applications involves creating software that can perform tasks that typically require human intelligence, such as image recognition, natural language processing, and decision-making. This requires a deep understanding of AI algorithms, data science, and software development.
              <br/><b> * Key techniques</b><br/>
                <b>Data Preprocessing:</b> Cleaning and transforming raw data into a format suitable for analysis.<br/>
                <b>Model Selection:</b> Choosing the right AI model for a specific task, considering factors like performance, interpretability, and scalability.<br/>
                <b>Model Training:</b> Using labeled data to train AI models to make predictions or decisions.<br/>
                <b>Model Evaluation:</b> Assessing the performance of AI models using metrics like accuracy, precision, recall, and F1 score.<br/>
                <b>Deployment:</b> Integrating AI models into production systems to make real-world predictions or decisions. </div></li> 
              <li><span className="star"></span><div><b>AI in Cybersecurity</b><br/>AI in cybersecurity involves using AI algorithms to detect and prevent cyber threats, such as malware, phishing, and identity theft. This requires a deep understanding of network security, data analysis, and machine learning to identify patterns and anomalies that indicate a potential security breach.
              <br/><b> * Key techniques</b><br/>
                <b>Anomaly Detection:</b> Identifying unusual patterns or behaviors that deviate from normalcy.<br/>
                <b>Machine Learning:</b> Utilizing algorithms to learn from data and make predictions or decisions.<br/>
                <b>Deep Learning:</b> Employing neural networks with multiple layers to extract complex features from data.<br/>
                <b>Natural Language Processing (NLP):</b> Analyzing and understanding human language for tasks like sentiment analysis and language translation.<br/>
                <b>Data Privacy:</b> Ensuring the protection of sensitive information through encryption and anonymization techniques. </div></li>
            </ul><br />

            <h2>Course Outline:-</h2>

            <ul>
              <li>
                <span className="star"></span>
                <div>
                  <b>Machine Learning Fundamentals</b><br />Machine Learning (ML) fundamentals involve teaching computers to learn patterns from data to make predictions or decisions, rather than explicit programming, primarily through three types: Supervised Learning (labeled data), Unsupervised Learning (unlabeled data patterns), and Reinforcement Learning (rewards/punishments). Key elements include data preparation, model training, evaluation, and optimization,
                   using algorithms rooted in math and statistics to build predictive models used in everything from spam filters to self-driving cars. The course covers the fundamental concepts of ML, including supervised and unsupervised learning, model evaluation, and optimization techniques. Gain hands-on experience with popular ML libraries like scikit-learn and TensorFlow, and learn how to apply ML to real-world problems.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Deep Learning and Neural Networks</b><br />Deep learning is a subset of machine learning that uses multi-layered artificial neural networks (hence, "deep") to learn complex patterns from vast amounts of data, mimicking the human brain's structure for tasks like image/speech recognition; while all deep learning relies on neural networks, not all neural networks are deep,
                   with "deep" specifically referring to networks with multiple hidden layers, enabling them to solve more intricate problems than simpler, shallower networks, which are limited to linear models. Deep learning has transformed AI, powering applications like image recognition, natural language processing, and autonomous vehicles, by learning complex representations from raw data. 
                   This course covers the fundamental concepts of deep learning, including neural networks, backpropagation, and convolutional neural networks (CNNs), and provides hands-on experience with popular deep learning libraries like TensorFlow and PyTorch. Gain a deep understanding of deep learning architectures and techniques, and learn how to apply them to real-world problems.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Natural Language Processing (NLP)</b><br />NLP (Natural Language Processing) is an AI field enabling computers to understand, interpret, and generate human language (text/speech) by combining computer science, linguistics, and machine learning, powering tools like Siri, Google Translate, chatbots, and spam filters, and allowing machines to process vast amounts of text data for insights and automation.
                   It's fundamental to modern AI, allowing seamless communication between humans and machines in everyday language.Natural Language Processing (NLP) is one of the most important techniques in computer science and it is a key part of many exciting applications such as AI and chatbots. There are 4 different types of techniques: Statistical Techniques, Stochastic Techniques, Rule-Based Techniques and Hybrid Techniques.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Computer Vision</b><br />Image preprocessing, augmentation, detection and recognition pipelines using modern deep learning techniques.Computer vision (CV) is an AI field enabling computers to interpret and understand the visual world from images and videos, mimicking human sight by identifying objects, faces, text, and actions using machine learning, deep learning, and pattern recognition. It automates tasks like object detection,
                   image segmentation, and facial recognition, powering applications in self-driving cars, medical diagnostics, security, and manufacturing by extracting meaningful data from visual inputs to aid decision-making.This course covers the fundamental concepts of computer vision, including image preprocessing, augmentation, object detection, image segmentation, and facial recognition. Gain hands-on experience with popular computer vision libraries like OpenCV and TensorFlow, and learn how to apply computer vision techniques to real-world problems.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>AI Tools and Frameworks (TensorFlow, Keras, PyTorch)</b><br />TensorFlow, PyTorch, and Keras are leading open-source frameworks for building and deploying AI models, each with distinct strengths for different use cases.
                   TensorFlow excels in production, PyTorch is favored for research, and Keras is ideal for rapid prototyping and beginners.<br/>
                   <b> * Key Tools and Frameworks</b><br/>
                    <b>1. TensorFlow:</b> An end-to-end platform for machine learning, known for its robust deployment options across various platforms, including mobile and edge devices via TensorFlow Lite and web browsers with TensorFlow.js. It is the go-to choice for large-scale industrial applications and boasts a large, established community and significant resources, including the powerful visualization tool, TensorBoard.<br/>
                    <b>2. PyTorch:</b> Highly regarded in academia and research due to its "Pythonic" and intuitive design. Its dynamic computation graphs allow for real-time changes and easier debugging using standard Python tools, making it excellent for experimentation and developing novel AI architectures. For more information and resources, visit the official PyTorch website.<br/>
                    <b>3. Keras:</b> Designed for human-centered design, Keras is a high-level API that provides a simple, minimal interface to quickly build neural networks with very little code. It acts as an abstraction layer running on top of a backend engine, which is typically TensorFlow. It is the ideal starting point for beginners or for rapid prototyping. <br/>
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>AI Model Optimization and Deployment</b><br />AI model optimization and deployment involve refining trained models for efficiency (size, speed, cost) using techniques like pruning, quantization, and distillation, then moving them into production environments (cloud, edge, on-premise) for real-world use, requiring robust monitoring, security,
                   and infrastructure management for reliable, scalable performance. The process moves from development to production, focusing on delivering value while managing resource constraints and performance metrics. The course covers the following topics: 
                    <ol>
                      <li><b>Model Optimization Techniques:</b> Pruning, quantization, and distillation to reduce model size, improve inference speed, and enhance efficiency.</li>
                      <li><b>Deployment Strategies:</b> Deploying models on cloud platforms (e.g., TensorFlow Serving, AWS SageMaker) and edge devices (e.g., TensorFlow Lite, ONNX Runtime) for real-time inference.</li>
                      <li><b>Monitoring and Maintenance:</b> Setting up monitoring tools to track model performance, resource utilization, and system health. Implementing maintenance practices to ensure smooth operation and address issues proactively.</li>
                      <li><b>Security Measures:</b> Implementing security best practices to protect model data, prevent unauthorized access, and ensure compliance with privacy regulations.</li>
                    </ol>
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
                  <b> Basic Programming (Python, R)</b><br />Core syntax, data types, functions and libraries like NumPy and Pandas for data manipulation.<br/>
                  <b>1. PYTHON</b>
                        <ol>
                          <li><b> * Key Uses:</b> Web development, automation/scripting, machine learning, and general software development.</li>
                          <li><b>* Strengths: </b> Highly versatile, excellent for building scalable applications & strong for integrating data analysis into a production environment.</li>
                          <li><b>* Core Concepts for Beginners:</b></li>
                            <ol>
                              <li><b> Variables and Data Types:</b> Assigning values to names (e.g., x = 10), with built-in types like int, float, str, and bool.</li>
                              <li><b> Control Flow:</b> Using if-else statements and for/while loops to control program execution.</li>  
                              <li><b> Functions:</b> Reusable blocks of code that perform specific tasks.</li>
                              <li><b> Libraries:</b> Extensive libraries such as NumPy, Pandas, and Matplotlib for data handling and visualization.</li>
                            </ol> 
                        </ol>
                        <b>2. R</b>
                        <ol>
                          <li><b> * Key Uses:</b> Data analysis, visualization, and statistical modeling.</li>
                          <li><b>* Strengths: </b> Widely used for data science, statistical analysis, and visualization, with a vast ecosystem of packages.</li>
                          <li><b>* Core Concepts for Beginners:</b></li>
                            <ol>
                              <li><b> Variables:</b> Creating, naming, and using variables in R..</li>
                              <li><b> Data Structures:</b>  Working with vectors, factors, lists, and data frames.</li>  
                              <li><b> Control Statements:</b>  Using if, if-else, and loop structures (for, while).</li>
                              <li><b> Packages:</b> Utilizing the vast repository of extensions available on the Comprehensive R Archive Network (CRAN).</li>
                            </ol> 
                        </ol>
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Data Structures and Algorithms</b><br /><br />Lists, trees, graphs, complexity analysis and algorithmic thinking tailored for AI workloads.Data Structures and Algorithms (DSA) are
                   foundational concepts in computer science used to organize and store data efficiently and to provide step-by-step instructions for solving problems. They are crucial for developing efficient,
                    scalable software and are a key focus in technical interviews at top tech companies. The key features of DSA include:
                    <ol>
                      <li><b>Data Structures:</b> Arrays, linked lists, stacks, queues, trees, graphs, hash tables, and heaps.</li>
                      <li><b>Algorithms:</b> Sorting (e.g., quicksort, mergesort), searching (e.g., binary search), graph traversal (e.g., DFS, BFS), dynamic programming, and greedy algorithms.</li>
                      <li><b>Complexity Analysis:</b> Measuring time and space complexity using Big O notation to evaluate the efficiency of algorithms.</li>
                      <li><b>Problem-Solving Strategies:</b> Breaking down problems into smaller subproblems, identifying patterns, and applying appropriate algorithms.</li>
                    </ol>
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Building AI Applications</b><br /><br />
                  
                  <b>1.Define & Research:</b> Identify a clear problem where AI outperforms traditional approaches; gather requirements and constraints.<br/>
                  <b>2.Application Logic:</b> Design flows with LangChain or custom orchestration; decide tool usage and memory strategy.<br/>
                  <b>3.Prompt Engineering:</b> Write system/developer prompts; structure inputs/outputs; use templates and guards.<br/>
                  <b>4.Tool Calling:</b> Integrate APIs, databases and calendars; implement retries, timeouts and observability.<br/>
                  <b>5.Fine‑Tuning:</b> Adapt models to domain tone or formats; manage datasets, versions and evaluation baselines.<br/>
                  <b>6.Testing & Evaluation:</b> Add unit/integration tests and model-on-model checks; measure correctness and safety.<br/>
                  <b>7.Deployment & Monitoring:</b> Ship on cloud/edge; monitor latency, costs and drift; set up alerts and rollbacks.<br/>
                  
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
                  <b> Cybersecurity Fundamentals</b><br />Cybersecurity fundamentals involve protecting systems, networks, and data from digital attacks by focusing on core principles like the CIA Triad (Confidentiality, Integrity, Availability), implementing security controls (encryption, access management, firewalls), understanding common threats (phishing, malware, ransomware), and establishing processes for incident response and security awareness training, all to manage risks and ensure data safety in a digital world. 
                  This course covers the essentials of cybersecurity, including the CIA Triad, security controls, common threats, and incident response processes. It emphasizes the importance of understanding how to protect systems, networks, and data from digital attacks, with a focus on implementing best practices for cybersecurity. In which we will cover the following topics:
                  <ol>
                    <li><b>Introduction to Cybersecurity:</b> Understanding the importance of cybersecurity, its role in safeguarding digital assets, and the evolution of cyber threats.</li>
                    <li><b>The CIA Triad:</b> Explaining the CIA Triad (Confidentiality, Integrity, Availability) and its significance in cybersecurity.</li>
                    <li><b>Security Controls:</b> Discussing various security controls such as firewalls, antivirus software, encryption, and access controls to protect systems and data.</li>
                    <li><b>Common Threats:</b> Identifying common cyber threats like malware, phishing, ransomware, and denial-of-service attacks.</li>
                    <li><b>Incident Response Processes:</b> outlining the steps involved in responding to cybersecurity incidents, including detection, containment, eradication, and recovery.</li>  
                  </ol>
                  
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b> AI in Cybersecurity</b><br />AI in cybersecurity uses machine learning, neural networks, and data analytics to automate and enhance threat detection, prevention, and response by analyzing massive datasets to find patterns, predict attacks, and handle routine tasks, freeing human analysts for complex issues. It improves speed and accuracy in identifying malware, phishing, and anomalies, offering benefits like behavioral analytics, automated incident response, and better vulnerability management across networks and cloud environments. 
                  The core fundamentals of AI in cybersecurity include:
                  <ol>
                    <li><b>Machine Learning:</b> Utilizing algorithms to train models that can identify patterns and anomalies in cybersecurity data.</li>
                    <li><b>Neural Networks:</b> Implementing deep learning models to detect complex patterns in large datasets.</li>
                    <li><b>Data Analytics:</b> Analyzing vast amounts of cybersecurity data to uncover trends and vulnerabilities.</li>
                  </ol>
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Securing AI Models</b><br />Securing AI models involves protecting the entire lifecycle—data, development, and deployment—through techniques like data encryption, access controls (RBAC, MFA), input/output screening for prompt injection, adversarial training, continuous monitoring for misuse, and vulnerability scanning of infrastructure, using frameworks like MITRE ATT&CK for AI to defend against theft, poisoning, and data leakage. Key strategies include securing training data, isolating environments,
                   implementing strong access policies, and using specialized security tools (like AI firewalls/interceptors) to monitor and filter interactions. In this we will cover the following topics:
                   <ol>
                    <li><b>Data Encryption:</b> Ensuring that data is protected at rest and in transit using strong encryption algorithms.</li>
                    <li><b>Access Controls:</b> Implementing role-based access controls (RBAC) and multi-factor authentication (MFA) to restrict access to sensitive resources.</li>
                    <li><b>Input/Output Screening:</b> Using techniques like prompt injection detection to prevent malicious inputs from compromising models.</li>
                    <li><b>Adversarial Training:</b> Training models to be resilient against adversarial attacks by exposing them to manipulated data.</li>
                    <li><b>Continuous Monitoring:</b> Implementing real-time monitoring to detect and respond to unusual activities or misuses of the model.</li>
                    <li><b>Vulnerability Scanning:</b> Using tools to identify and patch vulnerabilities in the AI infrastructure and dependencies.</li>
                  </ol>
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Ethical Implications of AI</b><br/>The ethical implications of AI revolve around fairness (bias in data/outcomes), transparency (the "black box" problem), accountability (who's responsible for errors), privacy (data misuse), job displacement (automation's impact), misinformation (deepfakes, manipulation), and potential existential risks.
                  This covers the following topics:
                  <ol>
                    <li><b>Fairness and Bias:</b> Addressing issues related to bias in AI models to ensure equitable outcomes.</li>
                    <li><b>Transparency:</b> Ensuring that AI systems are transparent and explainable to users and regulators.</li>
                    <li><b>Accountability:</b> Establishing clear responsibilities for AI developers and users in case of errors or misuse.</li>
                    <li><b>Privacy:</b> Protecting individuals' personal data and privacy rights in the context of AI.</li>
                    <li><b>Job Displacement:</b> Evaluating the potential impact of AI on job roles and the need for retraining and reskilling.</li>
                    <li><b>Misinformation:</b> Addressing the risks of AI-generated misinformation, such as deepfakes and manipulation.</li>
                    <li><b>Existential Risks:</b>Considering the potential long-term consequences of AI if not developed and deployed responsibly.</li>
                  </ol>
                </div>
              </li>

            </ul>

          </div>

        );

      case "vision":
        return (
          <div className="content-box">
            <ul>
              <li>
                <span className="star"></span>
                <div>
                  <b>Student Achievements:</b><br />
                  Our alumni have collectively earned over $350 Million—a testament to the real-world impact of iSkills training!
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Vision for 2030:</b><br />We aim high: achieving a cumulative alumni revenue of $1 Billion by 2030, In Sha Allah.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Community and Support:</b><br />Be part of a thriving community! Join our free meetups and access tailored guidance through iSkills Success Managers.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Why Choose iSkills?</b><br /> Learn high-demand skills in a booming digital economy—SEO alone is valued at over $80 Billion annually in the USA.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Our Distinctive Edge:</b><br />We don’t just teach; we deliver results. iSkills is the ONLY institute where success is measured by tangible outcomes:
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Your Investment, Your Future:</b><br /> Equip yourself with the skills to thrive in the modern economy.
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
        <h1> ATechSkills<span id="batch"> DevSecAI  </span> Bootcamp - AI Track </h1>
        <div className="rating">
          <img src='https://iskills.com/wp-content/uploads/2024/04/trainer.svg' />
          <p>Rana Haseeb Akmal <span>(Trainer)</span></p>
          <img src='https://iskills.com/wp-content/uploads//2024/03/user-stars.svg' />
          <p>11,000+ <span> (Graduates)</span></p>
          <p> 5 <FaStar /> <span> ( 5000 Reviews )</span></p>
        </div>

        <div className="hero-both">
          <div className="hero-bg">

          </div>

          <div className='white-div1' style={{ height: 'auto', background: 'transparent', boxShadow: 'none', padding: 0 }}>
            <CoursePricingCard />
          </div>
        </div>

        <p id="training-program"><b>AtechSkills DevSecAI Bootcamp - AI Track Training Program 2025!</b><br /><br />
          Led by industry expert <b>Rana Haseeb Akmal</b>, master <b>AI expert. </b><br />
          Gain practical skills and expert insights to transform your career.<br /><br />
          Sign up now and become a skilled AI professional!</p><br />
        <p className="firstP">Bootcamp - AI Track Details & Registration ——— —</p>
        <p id="training">Course Breakdown (60% AI, 20% Development, 20% Cybersecurity)</p>

        {/*--- 4-tabs layout---*/}

        <div className="container">

          <div className="tabs">
            <button className={activeTab === "content" ? "active" : ""} onClick={() => setActiveTab("content")}>
              60% Artificial Intelligence
            </button>

            <button className={activeTab === "important" ? "active" : ""} onClick={() => setActiveTab("important")}>
              20% Development
            </button>

            <button className={activeTab === "bonuses" ? "active" : ""} onClick={() => setActiveTab("bonuses")}>
              20% Cybersecurity
            </button>

          </div>


          <div className="tab-content">{renderContent()}</div>
        </div>

        <div className='regis'>
          <h5 ref={textRef}
            className="scroll-fill-textt"
            style={{
              backgroundSize: `${fillPercent}% 100%`,
            }}
          >Get Enrolled Now</h5>
        </div>

        <p ref={textRef1}
          className="scroll-fill-text1" id="para"
          style={{
            backgroundSize: `${fillPercent1}% 100%`,
          }}>Join ATechSkills DevSecAI Bootcamp - AI Track today and turn learning into earning!
          <br /> Led by Rana Haseeb Akmal, provide practical, industry-aligned training that helps students and
          <br />professionals step confidently into the global tech marketplace—equipped with the knowledge, skills,
          <br /> and mindset needed to succeed.</p>

        <section className="stack-section">
          <div ref={(el) => (cardRefs.current[0] = el)} className="stack-card pink">
            <div className="step-badge">01</div>
            <h2 className="stack-title">Hands-on AI Projects</h2>
            <p className="stack-desc">Build end-to-end applications using ML, DL and NLP with practical datasets, deployment and performance tracking.</p>
            <img src={image1} alt="Hands-on AI Projects" />
          </div>
          <div ref={(el) => (cardRefs.current[1] = el)} className="stack-card lavender">
            <div className="step-badge">02</div>
            <h2 className="stack-title">Mentorship & Community</h2>
            <p className="stack-desc">Join weekly mentor hours and peer groups for feedback, code reviews and interview preparation.</p>
            <img src={image2} alt="Mentorship & Community" />
          </div>
          <div ref={(el) => (cardRefs.current[2] = el)} className="stack-card smoke">
            <div className="step-badge">03</div>
            <h2 className="stack-title">Career Support</h2>
            <p className="stack-desc">Portfolio guidance, resume polishing and mock interviews aligned to AI roles across industry.</p>
            <img src={image3} alt="Career Support" />
          </div>
        </section>
      </div>
      <section className="cta-section">
        <div ref={ctaRef} className="cta-container">
          <h2 ref={ctaTitleRef} className="cta-title">BUILT FOR EVERYONE</h2>
          <p className="cta-sub">Learn in public, build projects, and join a supportive community.</p>
          <div className="white-faq">
            <h2>Bootcamp - AI Track</h2><br />
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

      <EnrollModal open={enrollOpen} onClose={() => setEnrollOpen(false)} track="AI" source="enroll" />
      <EnrollModal open={joinOpen} onClose={() => setJoinOpen(false)} track="AI" source="join" />

      <Footer />

    </>
  )
}

export default AI
