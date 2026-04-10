import React, { useEffect, useRef, useState } from "react";
import "./SEBT.css";
import CoursePricingCard from "../Component/CoursePricingCard.jsx";
import { FaStar, FaAngleRight } from "react-icons/fa";
import Footer from "../Component/Footer.jsx";
import Picture1 from "../assets/Ai-automation/Ai-automation 1.png";
import Picture2 from "../assets/Ai-automation/Ai-automation 2.png";
import Picture3 from "../assets/Ai-automation/Ai-automation 3.png";

const Automation = () => {
  const [activeTab, setActiveTab] = useState("n8n");
  const cardRefs = useRef([]);
  const ctaRef = useRef(null);
  const ctaTitleRef = useRef(null);
  const textRef = useRef(null);
  const [fillPercent, setFillPercent] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
          else entry.target.classList.remove("visible");
        });
      },
      { threshold: 0.3 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
          else entry.target.classList.remove("visible");
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
        ctaRef.current.style.setProperty("--scale", scale.toString());
        const fill = Math.round(ratio * 100);
        if (ctaTitleRef.current) ctaTitleRef.current.style.setProperty("--fill", fill + "%");
      }
    };
    window.addEventListener("scroll", handleCta);
    handleCta();
    return () => window.removeEventListener("scroll", handleCta);
  }, []);

  useEffect(() => {
    const handleScale = () => {
      cardRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const visible = Math.min(vh - rect.top, rect.height);
        const ratio = Math.max(0, Math.min(visible / rect.height, 1));
        const scale = 0.92 + ratio * 0.1;
        el.style.setProperty("--scale", scale.toString());
      });
    };
    window.addEventListener("scroll", handleScale);
    handleScale();
    return () => window.removeEventListener("scroll", handleScale);
  }, []);

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

  const renderContent = () => {
    switch (activeTab) {
      case "n8n":
        return (
          <div className="content-box">
            <h2>n8n Workflow Automation</h2>
            <ul>
              <li>
                <span className="star"></span>
                <div>
                  <b>Core Concepts and Nodes</b><br />
                  <ol>
                  <li><b>1.Workflows:</b> A workflow is an end-to-end automated process, designed in a visual, drag-and-drop canvas, that dictates the sequence of operations.</li>
                  <li><b>2.Nodes:</b> The fundamental building blocks of a workflow. Each node is a self-contained block of functionality that performs a specific task, such as fetching data, manipulating it, applying logic, or interacting with an external service or AI model.</li>
                  <li><b>3.Triggers:</b> Special nodes that initiate a workflow when a specific event occurs (e.g., a new email, a scheduled time, or an incoming webhook). A workflow can only have one trigger.</li> 
                  <li><b>4.AI Agents:</b> Advanced systems built within n8n workflows that can reason, remember context (memory), and use external tools to perform complex, multi-step tasks autonomously. n8n serves as the orchestration layer, managing inputs, outputs, and system integrations while the agent handles the reasoning.</li>
                  <li><b>5.Data Structure:</b> Data moves between nodes as an array of JSON objects, referred to as "items". This standardized format ensures seamless data flow and manipulation.</li>
                  <li><b>6.Credentials:</b> Secure storage for sensitive information like API keys, usernames, and passwords, allowing nodes to authenticate with external services without exposing secrets within the workflow itself. </li>   
                </ol>
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Webhooks and APIs</b><br />
                  <ol>
                  <li><b>1.API (Application Programming Interface):</b></li>
                  <li>An API is a set of rules and protocols that allow applications to request and interact with the functionality or data of another application on demand. </li>
                  <li><b>a.Communication Model:</b> The client application initiates the communication by sending a request to the server, and the server then sends a response. This is a "pull" mechanism.</li>
                  <li><b>b.Control:</b> The client is in control and decides when to ask for information.</li>
                  <li><b>c.Data Flow:</b> Typically bidirectional, supporting full CRUD (Create, Read, Update, Delete) operations.</li>
                  <li><b>d.Efficiency:</b> Can be resource-intensive if frequent "polling" (repeatedly asking for updates) is needed to check for new data, as many requests may return no new information.</li>

                  <li><b>2.Webhook:</b></li>
                  <li><b>A webhook is a user-defined HTTP callback that is triggered automatically when a specific event occurs in a source application. </b></li>
                  <li><b>a.Communication Model:</b> The source application automatically sends data to a predefined URL (endpoint) in the receiving application when an event happens. This is a "push" mechanism.</li>
                  <li><b>b.Control:</b> The server (the one sending the data) decides when to send the notification.</li>
                  <li><b>c.Data Flow:</b> Primarily unidirectional (one-way notification), designed to alert the receiving system that something has happened.</li>
                  <li><b>d.Efficiency:</b> Highly efficient for real-time updates as it eliminates the need for constant polling, reducing unnecessary network traffic and server load.</li>
                </ol>
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Data Handling</b><br />
                  <ol>
                  <li><b>1. Collection:</b> Gathering raw data from various sources (surveys, sensors, inputs).</li>
                  <li><b>2. Organization/Cleaning:</b> Structuring data and removing errors or inconsistencies.</li>
                  <li><b>3. Storage:</b> Securely keeping data in databases or cloud systems.</li>
                  <li><b>4. Processing/Analysis:</b> Transforming data into usable information, identifying patterns, and drawing conclusions.</li>
                  <li><b>5. Presentation:</b> Displaying findings clearly through charts, graphs (bar, line, pie), tables, or reports for easier interpretation.</li>
                  <li><b>6. Security & Archiving:</b> Protecting data from breaches and managing its lifecycle, including secure disposal.</li> 
                </ol>
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Common Integrations</b><br />Google Sheets, Slack, Email, CRM/Forms — templates to automate reporting and notifications.
                <br/><b>1.Custom Integrations:</b> Tailored solutions for unique business needs, such as syncing data between custom applications or databases.
                <br/><b>2.Third-Party Integrations:</b> Connecting with external services like payment gateways, social media platforms, or marketing automation tools to extend functionality.
                <br/><b>3. Custom Scripts:</b> Writing custom code to handle specific business logic or data transformations that aren't covered by pre-built integrations.
                <br/><b>4. Zapier AI:</b> Leveraging Zapier's AI to embed AI steps directly into Zaps, enabling tasks like summarizing emails, creating content, or extracting information from text.
                <br/><b>5. Zapier Custom Code:</b> Writing custom code snippets in Zapier's JavaScript editor to handle more complex logic or data manipulations not possible with pre-built actions.
                <br/><b>6. Zapier Webhooks:</b> Using Zapier to create custom endpoints that can receive data from external services or trigger Zaps when specific events occur.
                </div>
              </li>
            </ul>
          </div>
        );
      case "zapier":
        return (
          <div className="content-box">
            <h2>Zapier Automation</h2>
            <ul>
              <li>
                <span className="star"></span>
                <div>
                  <b>Zaps and Triggers</b><br />In Zapier, a Zap is an automated workflow (e.g., "When [Trigger], do [Action]") connecting apps, with a Trigger being the event that starts it (like a new email) and Actions being the subsequent tasks (like summarizing or sending a Slack message). With Zapier's AI, you embed AI steps (like using OpenAI) directly into Zaps, using triggers to feed data to the AI for summarization, content creation, or task extraction, with the AI's output then sent as another action to complete the workflow. 
                <ol>
                  <li><b>Zap:</b> A complete automated workflow that connects apps to perform tasks without manual intervention.</li>
                  <li><b>Trigger:</b> The specific event in one app that initiates the Zap (e.g., New Email in Gmail, New File in Google Drive).</li>
                  <li><b>Actions:</b> The one or more tasks performed in other apps after the trigger fires (e.g., Create a new task in Asana, Send a message in Slack). </li> 
                </ol>
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Formatter and Paths</b><br />Formatter and Paths" refers to techniques for structuring data (formatters) and locating files/resources (paths), often combined in programming or software to make data readable, consistent, and easily accessible, like formatting text for display versus defining a file's location in a system, or using specific path formats (like UNC) for network access. Formatters transform data (e.g., dates, numbers, JSON), while paths specify locations (e.g., /home/user/file.txt, \\server\share\file), with tools like std::formatter in C++ handling path presentation or code formatters (like Prettier/Black) standardizing code style. 
                <br/><b>1.Formatter:</b> A tool that transforms data into a specific format or style, such as changing a date from "MM/DD/YYYY" to "YYYY-MM-DD" or converting currency from dollars to euros.
                <br/><b>2.Path:</b> A string that specifies the location of a file or resource on a computer or network, such as "/home/user/file.txt" or "\\server\share\file".
                <br/><b>3.UNC Path:</b> A Windows-specific path format that uses double backslashes (\\) to represent network shares, like "\\server\share\folder\file.txt".
                <br/><b>4. Relative Path:</b> A path that is relative to the current working directory, such as "./file.txt" or "../folder/file.txt".
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>AI-assisted Automation</b><br />AI-assisted automation is the integration of artificial intelligence (AI) with automation technologies to streamline complex tasks, reduce manual effort, and improve decision-making beyond the capabilities of traditional rule-based automation. Unlike basic automation which follows fixed instructions, AI-assisted systems use machine learning (ML), natural language processing (NLP), and computer vision to learn, adapt, and handle unstructured data and dynamic situations. 
                <br/><b>1. Zapier AI:</b> Leveraging Zapier's AI to embed AI steps directly into Zaps, enabling tasks like summarizing emails, creating content, or extracting information from text.
                <br/><b>2. Zapier Custom Code:</b> Writing custom code snippets in Zapier's JavaScript editor to handle more complex logic or data manipulations not possible with pre-built actions.
                <br/><b>3. Zapier Webhooks:</b> Using Zapier to create custom endpoints that can receive data from external services or trigger Zaps when specific events occur.
                <br/><b>4. Zapier Custom Code:</b> Writing custom code snippets in Zapier's JavaScript editor to handle more complex logic or data manipulations not possible with pre-built actions.
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Operations and Limits</b><br />
                  <ol>
                    <b> Operations in Zapier AI</b>
                      <li><b>Zapier is an AI orchestration platform.</b> It allows users to integrate AI into business processes without coding. </li>
                      <li><b> AI Agents:</b> AI agents can be created using natural language prompts. These agents can work across apps, browse the web, analyze data, and perform research and drafting tasks.</li>
                      <li><b> Workflow Automation:</b> AI can be embedded in Zaps (automated workflows) for lead scoring, content generation, email summarization, and data categorization.</li>
                      <li><b> Integration with AI Tools:</b> Zapier connects to over 300 AI tools like ChatGPT, Claude, and Gemini. This allows data to flow between these services and other apps.</li>
                      <li><b> Model Context Protocol (MCP):</b> This feature lets AI chat tools interact and take action across your tech stack using natural language commands. One MCP tool call uses two tasks from your quota.</li>
                      <li><b> Built-in Tools:</b> Zapier has AI-powered features in its built-in tools like Interfaces, Tables, and Code steps. These tools allow users to create custom automations using AI without coding.</li>
                  </ol>
                </div>
              </li>
            </ul>
          </div>
        );
      case "guideline":
        return (
          <div className="content-box">
            <h2>Final Guideline</h2>
            <ul>
              <li>
                <span className="star"></span>
                <div>
                  <b>Design and Reliability</b><br />Best practices for idempotency, retries, alerting and observability to trust automations.In AI automation, n8n emphasizes technical control (custom code, self-hosting) for granular design and data sovereignty, while Zapier prioritizes ease of use and accessibility (no-code, extensive integrations) for rapid implementation and high cloud reliability. 
                <br/><b>1. Idempotency:</b> Ensuring that repeated requests have the same effect as a single request, preventing unintended side effects.
                <br/><b>2. Retries:</b> Configuring automated retries for failed operations to handle transient errors.
                <br/><b>3. Alerting and Observability:</b> Setting up notifications and monitoring to detect and respond to issues proactively.
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Deployment and Security</b><br />Self‑hosting n8n, credentials management, secret rotation and access controls.Deployment and security in AI automation with n8n and Zapier differ significantly based on their core architectures: Zapier is a fully managed cloud platform, while n8n offers both cloud and self-hosted options, granting users greater control over their infrastructure and data
                <br/><b>1. Self-Hosting:</b> Deploying n8n on-premises or in a private cloud for enhanced security and data sovereignty.
                <br/><b>2. Credentials Management:</b> Storing and rotating API keys, tokens, and other sensitive credentials securely.
                <br/><b>3. Access Controls:</b> Implementing role-based access controls (RBAC) to restrict access to sensitive resources.
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Use Cases and Monetization</b><br />Client services, internal ops, lead pipelines and reporting products to generate ROI.AI automation with n8n and Zapier offers diverse use cases like intelligent data processing, personalized marketing, and autonomous agents, monetized by selling services (building/consulting), enhancing internal efficiency (cost savings/revenue), or creating AI-powered products, with n8n favoring complex, self-hosted solutions for control and Zapier excelling at simpler, broad integrations, both leveraging AI for logic, data enrichment, and RAG (Retrieval-Augmented Generation). 
                <br/><b>1. Client Services:</b> Building custom AI solutions for clients, such as chatbots, virtual assistants, or data analysis tools.
                <br/><b>2. Internal Ops:</b> Streamlining internal processes like lead management, task automation, or resource allocation using AI.
                <br/><b>3. Lead Pipelines:</b> Enhancing lead conversion and customer engagement with AI-driven automation.
                <br/><b>4. Reporting Products:</b> Creating AI-powered tools for data visualization, trend analysis, or business intelligence.
                </div>
              </li>
              <li>
                <span className="star"></span>
                <div>
                  <b>Best Practices</b><br />Guidelines for designing, implementing, and maintaining AI automations. The best practices for each platform are as follows:
                <br/><b>1. Design Principles:</b> Follow best practices for designing AI automations, such as clear documentation, modularity, and error handling. This ensures that automations are maintainable, scalable, and aligned with business goals.
                <br/><b>2. Implementation Strategies:</b> Use n8n for complex, self-hosted automations and Zapier for simpler, broad integrations. Which platform is best for your use case depends on the complexity of the automation, the level of control you need over the infrastructure, and the ease of use for non-technical users.
                <br/><b>3. Monitoring and Maintenance:</b> Set up monitoring tools to track automation performance and address issues proactively. However, it's important to note that monitoring alone is not sufficient for maintaining a reliable automation system. Regular maintenance, including testing, updating dependencies, and addressing security vulnerabilities, is also crucial.
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
        <h1> ATechSkills<span id="batch"> DevSecAI </span> Short Course — AI Automation (n8n & Zapier) </h1>
        <div className="rating">
          <img src="https://iskills.com/wp-content/uploads/2024/04/trainer.svg" />
          <p>Mustansar Riaz <span>(Trainer)</span></p>
          <img src="https://iskills.com/wp-content/uploads//2024/03/user-stars.svg" />
          <p>5,000+ <span> (Graduates)</span></p>
          <p> 5 <FaStar /> <span> ( 1800 Reviews )</span></p>
        </div>

        <div className="hero-both">
          <div className="hero-AutoBg">
  
          </div>
          <div className="white-div1" style={{ height: 'auto', background: 'transparent', boxShadow: 'none', padding: 0 }}>
            <CoursePricingCard price="RS 3,000" duration="2 Months" training="1 Month Training" internship="1 Month Internship" />
          </div>
        </div>

        <p id="training-program"><b>ATechSkills Short Course - AI Automation using n8n & Zapier</b><br /><br />
          Automate repetitive work, integrate apps and build event-driven workflows with visual tools.</p><br />
        <p className="firstP">Short Course Details & Registration ——— —</p>
        <p id="training">Course Breakdown: n8n, Zapier, Final Guideline</p>

        <div className="container">
          <div className="tabs">
            <button className={activeTab === "n8n" ? "active" : ""} onClick={() => setActiveTab("n8n")}>
              n8n Workflows
            </button>
            <button className={activeTab === "zapier" ? "active" : ""} onClick={() => setActiveTab("zapier")}>
              Zapier Workflows
            </button>
            <button className={activeTab === "guideline" ? "active" : ""} onClick={() => setActiveTab("guideline")}>
              Final Guideline
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

        <p ref={textRef1}
          className="scroll-fill-text1" id="para"
          style={{
            backgroundSize: `${fillPercent1}% 100%`,
          }}>Join ATechSkills DevSecAI Short Bootcamp - AI Automation using n8n Zapier today and turn learning into earning!
          <br /> Led by Mustansar Riaz, provide practical, industry-aligned training that helps students and
          professionals step confidently<br /> into the global tech marketplace—equipped with the knowledge, skills,
        and mindset needed to succeed.</p>

        <section className="stack-section">
          <div ref={(el) => (cardRefs.current[0] = el)} className="stack-card pink">
            <div className="step-badge">01</div>
            <h2 className="stack-title">Workflow Design & Execution</h2>
            <p className="stack-desc">Build real workflows integrating apps, webhooks and APIs with monitoring and logging.</p>
            <img src={Picture1} alt="Workflow Design & Execution" />
          </div>
          <div ref={(el) => (cardRefs.current[2] = el)} className="stack-card smoke">
            <div className="step-badge">02</div>
            <h2 className="stack-title">Portfolio & Client Acquisition</h2>
            <p className="stack-desc">Portfolio guidance and client acquisition playbooks for automation services.</p>
            <img src={Picture2} alt="Portfolio & Client Acquisition" />
          </div>
           <div ref={(el) => (cardRefs.current[1] = el)} className="stack-card lavender">
            <div className="step-badge">03</div>
            <h2 className="stack-title">Feedback & Support</h2>
            <p className="stack-desc">Get feedback on workflow designs, reliability and scaling strategies.</p>
            <img src={Picture3} alt="Mentorship" />
          </div>
        </section>
      </div>
      <section className="cta-section">
        <div ref={ctaRef} className="cta-container">
          <h2 ref={ctaTitleRef} className="cta-title">BUILT FOR EVERYONE</h2>
          <p className="cta-sub">Automate, integrate, and scale with visual tools — fast.</p>
          <div className="white-faq">
            <h2>Short Course Bootcamp — AI Automation</h2><br />
            <p>Start Date: 1st Nov 2025<br />
              Location: DHA Phase 12 EME, Lahore<br />
              Fee: 3000 Rs (Refundable Security Fee)<br />
              Contact: 0325 3344552<br />
              Email: info@atechskills.com<br />
            </p>
          </div>
          <div className="cta-actions">
            <button className="cta-button" onClick={() => window.location.href = 'https://wa.me/923253344552'}>For Inquiry</button>
            <button className="cta-button" onClick={() => window.location.href = 'https://atechskills.com/lms/login.php'}>Enroll Now</button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Automation;
