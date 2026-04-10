import React, { useEffect, useRef, useState } from "react";
import "./SEBT.css";
import CoursePricingCard from "../Component/CoursePricingCard.jsx";
import { FaStar, FaAngleRight } from "react-icons/fa";
import Footer from "../Component/Footer.jsx";
import image1 from '../Ai1.png'
import image2 from '../Ai2.png' 
import images3 from '../web3.png'

const QES = () => {
  const [activeTab, setActiveTab] = useState("skills1");
  const cardRefs = useRef([]);
  const ctaRef = useRef(null);
  const ctaTitleRef = useRef(null);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
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

  const renderContent = () => {
    switch (activeTab) {
      case "skills1":
        return (
          <div className="content-box">
          <h2>Skills 1–5</h2>
          <ul>
            <li>
              <span className="star"></span>
              <div>
                <b>AI ChatGPT Intro</b><br />Prompting fundamentals, workflow design and using AI assistants to accelerate content and tasks. Learn prompt frameworks, context control, automation chains and safety guidelines to boost output across writing, research and planning. Apply role prompts, tool-use prompts and memory strategies to produce consistent, high‑quality outputs across diverse domains.
              This skill covers the basics of using ChatGPT, including how to prompt it for specific tasks, how to use it to generate text, and how to use it to perform other tasks, such as translation, summarization, and question-answering.
              </div>
            </li>
            <li>
              <span className="star"></span>
              <div>
                <b>YouTube Automation</b><br />Topic research, scripting, batch production and automation tools to streamline channel growth. Implement content systems (hooks, CTAs, retention tactics), thumbnails A/B testing and scheduling pipelines that compound reach over time. Establish analytics dashboards, repurpose long‑form to shorts, and automate publishing calendars for consistent momentum.
              This skill covers the basics of using YouTube to create and publish videos, including how to create a channel, upload videos, and manage a video library. It also covers how to use YouTube's automation tools to streamline the video production process, such as using YouTube's video editor to create and edit videos, and using YouTube's video publishing tools to publish videos to YouTube.
              </div>
            </li>
            <li>
              <span className="star"></span>
              <div>
                <b>SEO Blogging</b><br />Keyword research, on-page optimization, internal linking and content calendars for ranking. Build topical authority, craft long-form outlines, optimize for E‑E‑A‑T, and use analytics to iterate toward stable organic traffic. Use programmatic SEO, schema markup and content refresh playbooks to maintain rankings.
              This skill covers the basics of using SEO to improve website visibility and drive organic traffic. It includes topics such as keyword research, on-page optimization, internal linking, and content calendars. The skill also covers how to use programmatic SEO, schema markup, and content refresh playbooks to maintain rankings.
              </div>
            </li>
            <li>
              <span className="star"></span>
              <div>
                <b>Graphic Designing</b><br />Brand kits, thumbnails and social creatives with tools like Canva and AI image assistants. Establish a consistent visual identity, templates and creative testing loops that increase CTR and brand recall. Build reusable design systems and export pipelines optimized for each platform.
              This skill covers the basics of using graphic design tools to create visual content, including how to use Canva to create brand kits, thumbnails, and social creatives. It also covers how to use AI image assistants to generate images and how to use design templates to create consistent visual identities.
              </div>
            </li>
            <li>
              <span className="star"></span>
              <div>
                <b>Digital Marketing</b><br />Funnels, email campaigns, ads basics and analytics to convert traffic into revenue. Map journeys from awareness to conversion, run lean experiments and scale winners using ROAS, LTV and CAC metrics. Implement retargeting, lead magnets and CRM hygiene for predictable growth.
                This skill covers the basics of using digital marketing tools to drive traffic and conversions. It includes topics such as email marketing, social media marketing, search engine optimization (SEO), and pay-per-click ( PPC) advertising. The skill also covers how to use digital marketing analytics to measure the effectiveness of marketing campaigns and how to optimize marketing strategies to drive better results.
              </div>
            </li>
            <li>
              <span className="star"></span>
              <div>
                <b>AIO (Answer Engine Optimization)</b><br />Optimize for AI engines by structuring facts, references and concise answers. Build knowledge panels, citations and Q&A blocks that surface in conversational search.
                This skill covers the basics of using AI to optimize search engine results. It includes topics such as structuring content, using citations, and building knowledge panels. The skill also covers how to use AI to optimize the user experience, such as by surfacing relevant answers in search results.
              </div>
            </li>
          </ul>
        </div>
      );
      case "skills2":
        return (
          <div className="content-box">
          <h2>Skills 6–9</h2>
          <ul>
            <li>
              <span className="star"></span>
              <div>
                <b>Video Editing</b><br />Short-form and long-form editing, captions, hooks and repurposing workflows for reach. Apply storytelling beats, pacing, motion graphics and platform‑native formats to maximize retention. Build project templates and automation scripts to batch‑render content efficiently.
                This skill covers the basics of using video editing tools to create and edit videos, including how to use video editors to cut, trim, and add effects to videos. It also covers how to use video editing tools to create video playlists and to export videos in different formats.
              </div>
            </li>
            <li>
              <span className="star"></span>
              <div>
                <b>Ecommerce</b><br />Store setup, product sourcing, listing optimization and simple fulfillment strategies. Validate demand, optimize product pages, manage inventory and apply simple automations for smooth operations. Integrate payment gateways, analytics and support workflows for a smooth customer journey.
                This skill covers the basics of using e-commerce platforms to set up and manage online stores. It includes topics such as store setup, product sourcing, listing optimization, and simple fulfillment strategies. The skill also covers how to use e-commerce platforms to validate demand, optimize product pages, manage inventory, and apply simple automations for smooth operations. It also covers how to integrate payment gateways, analytics, and support workflows for a smooth customer journey.
              </div>
            </li>
            <li>
              <span className="star"></span>
              <div>
                <b>Freelancing</b><br />Profile building, gigs, proposals and delivery playbooks for repeat clients. Package services, write outcome‑driven proposals, maintain SLAs and upsell via case studies and retainers. Create discovery call scripts, onboarding forms and delivery SOPs for repeatable success.
                This skill covers the basics of using freelancing platforms to find and manage clients. It includes topics such as profile building, gigs, proposals, and delivery playbooks. The skill also covers how to use freelancing platforms to package services, write outcome-driven proposals, maintain SLAs, and upsell via case studies and retainers.
              </div>
            </li>
            <li>
              <span className="star"></span>
              <div>
                <b>No Code Website Builder</b><br />Wix, WordPress and builders to launch sites quickly with AI-generated content blocks. Configure hosting, domains, themes, basic SEO and performance to launch in hours not weeks. Add analytics, forms and automations to convert visitors and collect leads.
              This skill covers the basics of using no-code website builders to create and launch websites. It includes topics such as using Wix, WordPress, and other builders to create websites, configuring hosting, domains, themes, basic SEO, and performance. The skill also covers how to add analytics, forms, and automations to convert visitors and collect leads.
              </div>
            </li>
            <li>
              <span className="star"></span>
              <div>
                <b>Portfolio Bootstrapping</b><br />Build fast case studies and demo assets showcasing skills. Use simple landing pages and social proof to attract clients.
                This skill covers the basics of using portfolio bootstrapping to build fast case studies and demo assets showcasing skills. It includes topics such as using simple landing pages and social proof to attract clients.
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
                <b>Career and Monetization Roadmap</b><br />Niche selection, pricing, packaging and multi-channel income strategies. Choose focus areas, define irresistible offers and stack revenue via services, products, affiliates and content. Map quarterly goals and weekly actions with review rituals to sustain progress.
              This clearly outlines the steps to follow to build a successful career and monetize your skills. It includes topics such as niche selection, pricing, packaging, and multi-channel income strategies. The skill also covers how to choose focus areas, define irresistible offers, and stack revenue via services, products, affiliates, and content. It also covers how to map quarterly goals and weekly actions with review rituals to sustain progress.
              </div>
            </li>
            <li>
              <span className="star"></span>
              <div>
                <b>Project Execution and Consistency Plan</b><br />Weekly sprints, publishing cadence and KPI tracking to maintain momentum. Use calendars, templates and dashboards to keep throughput high and predictable. Define delivery SLAs, acceptance criteria and feedback loops to ensure quality.
              The plan outlines the steps to follow to execute projects consistently and maintain momentum. It includes topics such as weekly sprints, publishing cadence, and KPI tracking. The skill also covers how to use calendars, templates, and dashboards to keep throughput high and predictable. It also covers how to define delivery SLAs, acceptance criteria, and feedback loops to ensure quality.
              </div>
            </li>
            <li>
              <span className="star"></span>
              <div>
                <b>Tooling Stack and Best Practices</b><br />Recommended apps, prompts, templates and checklists for efficient delivery. Standardize workflows, automate repetitive steps and maintain quality bars for everything shipped. Establish backups, versioning and documentation habits for resilience.
              This covers the tools and best practices to use to ensure efficient delivery of projects. It includes topics such as recommended apps, prompts, templates, and checklists. The skill also covers how to standardize workflows, automate repetitive steps, and maintain quality bars for everything shipped. It also covers how to establish backups, versioning, and documentation habits for resilience.
              </div>
            </li>
            <li>
              <span className="star"></span>
              <div>
                <b>Client Outreach Playbook</b><br />Outbound scripts, value ladders and follow‑up sequences to win projects. Track pipelines with CRMs and personalize offers to increase close rates.
              The tools and best practices to use to ensure efficient delivery of projects. It includes topics such as recommended apps, prompts, templates, and checklists. The skill also covers how to standardize workflows, automate repetitive steps, and maintain quality bars for everything shipped. It also covers how to establish backups, versioning, and documentation habits for resilience.
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
        <h1> ATechSkills<span id="batch"> DevSecAI </span> Bootcamp - QES Track </h1>
        <div className="rating">
          <img src="https://iskills.com/wp-content/uploads/2024/04/trainer.svg" />
          <p>Mustansar Riaz <span>(Trainer)</span></p>
          <img src="https://iskills.com/wp-content/uploads//2024/03/user-stars.svg" />
          <p>10,000+ <span> (Graduates)</span></p>
          <p> 5 <FaStar /> <span> ( 4200 Reviews )</span></p>
        </div>

        <div className="hero-both">
          <div className="hero-QESbg"></div>
          <div className="white-div1" style={{ height: 'auto', background: 'transparent', boxShadow: 'none', padding: 0 }}>
            <CoursePricingCard price="RS 5,000" />
          </div>
        </div>

        <p id="training-program"><b>ATechSkills DevSecAI Bootcamp - QES Track Training Program 2025!</b><br /><br />
          Learn 10 quick earning skills using AI tools to launch and scale digital income streams.</p><br />
        <p className="firstP">Bootcamp - QES Track Details & Registration ——— —</p>
        <p id="training">Course Breakdown: 10 Skills using AI Tools</p>

        <div className="container">
          <div className="tabs">
            <button className={activeTab === "skills1" ? "active" : ""} onClick={() => setActiveTab("skills1")}>
              Skills 1–5
            </button>
            <button className={activeTab === "skills2" ? "active" : ""} onClick={() => setActiveTab("skills2")}>
              Skills 6–9
            </button>
            <button className={activeTab === "guideline" ? "active" : ""} onClick={() => setActiveTab("guideline")}>
              Final Guideline
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
          }}>Join ATechSkills DevSecAI Bootcamp - QES Track today and turn learning into earning!
          <br /> Led by Mustansar Riaz, provide practical, industry-aligned training that helps students and
          <br />professionals step confidently into the global tech marketplace—equipped with the knowledge, skills,
          <br /> and mindset needed to succeed.</p>
        <section className="stack-section">
          <div ref={(el) => (cardRefs.current[0] = el)} className="stack-card pink">
            <div className="step-badge">01</div>
            <h2 className="stack-title">AI-Assisted Micro-Business Projects</h2>
            <p className="stack-desc">Build practical projects in blogging, automation, and no-code sites using AI tools for quick earning.</p>
            <img className="qes-image" src={image1} alt="AI Assisted Projects" />
          </div>
          <div ref={(el) => (cardRefs.current[1] = el)} className="stack-card lavender">
            <div className="step-badge">02</div>
            <h2 className="stack-title">Mentorship & Community</h2>
            <p className="stack-desc">Join mentor hours, peer groups and get feedback on your QES projects and earning strategy.</p>
            <img src={image2} alt="Mentorship and Community" />
          </div>
          <div ref={(el) => (cardRefs.current[2] = el)} className="stack-card smoke">
            <div className="step-badge">03</div>
            <h2 className="stack-title">Career & Client Support</h2>
            <p className="stack-desc">Portfolio guidance, freelancing profile setup and client acquisition playbooks aligned to QES.</p>
            <img src={images3} alt="Career Support" />
          </div>
        </section>
      </div>
      <section className="cta-section">
        <div ref={ctaRef} className="cta-container">
          <h2 ref={ctaTitleRef} className="cta-title">BUILT FOR EVERYONE</h2>
          <p className="cta-sub">Learn fast, ship projects, and start earning with AI-powered skills.</p>
          <div className="white-faq">
            <h2>Bootcamp - QES Track</h2><br />
            <p>Start Date: 1st Nov 2025<br />
              Location: DHA Phase 12 EME, Lahore<br />
              Fee: 5000 Rs (Refundable Security Fee)<br />
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

export default QES;
