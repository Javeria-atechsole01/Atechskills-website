import React, { useEffect, useRef, useState } from "react";
import './SEBT.css'
import { FaStar, FaAngleRight, FaChevronDown } from "react-icons/fa"
import Testimonals from "./Testimonals.jsx";
import FAQ2 from "./FAQ2.jsx";
import Footer from '../Component/Footer.jsx'

const faqData = [
  {
    question: "Transform Your Career: Discover Why This Training Is a Game-Changer",
    answer:
      <ul>
        <li>
          <span className="star"></span>
          <div>
            <b>Diverse Career Pathways:</b><br />
            Build a thriving career in Full Stack Development, Cybersecurity, AI Agents, or Digital Services, or secure high-paying jobs in top-tier markets.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Comprehensive Tech Training:</b><br />Master everything from coding to deployment. Learn to build, secure, and optimize intelligent applications.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Launch Your Own Tech Agency:</b><br />Acquire cutting-edge skills to build client solutions and establish a successful software house.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Launch an AI Agency:</b><br /> Be among the first to capitalize on AI Agents and Automation, solving complex problems for businesses.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Freelancing Opportunities:</b><br />Deliver premium Dev and Security services on platforms like Fiverr, Upwork, and Toptal while building a strong portfolio.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b> Global Market Competency: </b><br />Develop Technical expertise tailored to meet the demands of global remote roles and international clients.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b> Boost Your Online Business: </b><br />Use Tech skills to scale your business, automate processes, and secure your digital assets.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b> Exceptional Engineering: </b><br />Stand out as a software engineer by crafting impact-driven, secure, and intelligent code.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b> Development Specialization: </b><br />Begin your journey to becoming a certified Full Stack Developer, ready to tackle real-world challenges.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b> Premium Networking Opportunities: </b><br />Join an elite community of developers, security experts, and AI engineers to grow your network and career.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b> Learn from Industry Experts: </b><br />Gain actionable insights from Mustansar Riaz and the ATechSkills leads.
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
            Build a thriving career in Full Stack Development, Cybersecurity, AI Agents, or Digital Services, or secure high-paying jobs in top-tier markets.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Comprehensive Tech Training:</b><br />Master everything from coding to deployment. Learn to build, secure, and optimize intelligent applications.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Launch Your Own Tech Agency:</b><br />Acquire cutting-edge skills to build client solutions and establish a successful software house.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Launch an AI Agency:</b><br /> Be among the first to capitalize on AI Agents and Automation, solving complex problems for businesses.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b>Freelancing Opportunities:</b><br />Deliver premium Dev and Security services on platforms like Fiverr, Upwork, and Toptal while building a strong portfolio.
          </div>
        </li>

        <li>
          <span className="star"></span>
          <div>
            <b> Global Market Competency: </b><br />Develop Technical expertise tailored to meet the demands of global remote roles and international clients.
          </div>
        </li>
      </ul>
    ,
  }];


const SEBT = () => {
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
              <li><span className="star"></span><b>YouTube Automation</b></li>
              <li><span className="star"></span><b>AI Agents</b></li>
              <li><span className="star"></span><b>Tiktok Ads</b></li>
              <li><span className="star"></span><b>Etsy</b></li>
            </ul><br />

            <h2>Course Outline:-</h2>

            <ul>
              <li>
                <span className="star"></span>
                <div>
                  <b>Web Development Basics:</b><br />
                  Learn the essentials of HTML5 and CSS3, including responsive design and mobile-first frameworks.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Niche Research:</b><br />How to find untapped niches and dominate SERP through Comprehensive Content Coverage.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>AI-Driven SEO:</b><br />Integrate generative AI tools and techniques to optimize content and improve search engine rankings
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>AIO (Answer Engine Optimization):</b><br /> Master the art of ranking in AI-driven engines like ChatGPT and Gemini by optimizing content and using modern techniques for AI-based search algorithms.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>SEO and Blogging Frameworks:</b><br /> Leverage actionable insights from industry-specific data to plan and execute successful SEO campaigns and blogs.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>WordPress Training:</b><br /> Build, customize, and optimize websites using WordPress CMS with cutting-edge plugins and themes. Build blogs, ecommerce stores and service sites, modern and elegant.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Search Engine Mechanics:</b><br /> Analyze and adapt to Google’s core web updates and evolving ranking factors
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Competitive SEO Strategies:</b><br />Use SERP analysis tools and market intelligence platforms to outpace rivals.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>On-Site SEO Enhancements:</b><br />Implement advanced techniques in schema markup, structured data, and site architecture for improved visibility
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>AIO (Answer Engine Optimization):</b><br /> Master the art of ranking in AI-driven engines like ChatGPT and Gemini by optimizing content and using modern techniques for AI-based search algorithms.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Specialized SEO Applications:</b><br />Develop expertise in Local SEO, Technical SEO, and Semantic SEO to meet diverse business needs.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Freelancing Ecosystems:</b><br />Build profiles on platforms like Upwork and Fiverr, utilizing AI-enhanced proposals for client acquisition.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Performance Metrics Optimization:</b><br /> Master the art of ranking in AI-driven engines like ChatGPT and Gemini by optimizing content and using modern techniques for AI-based search algorithms.Improve Core Web Vitals, including Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) for better UX and rankings.
                </div>
              </li>

              <li>
                <span className="star"></span>
                <div>
                  <b>Google Suite Proficiency:</b><br />Utilize tools like GA4, Google Tag Manager, and Search Console to track and optimize campaign performance.
                </div>
              </li>
            </ul>
          </div>
        );

      case "important":
        return (

          <div className="faq-containers">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-questions">
                  <h3>{faq.question}</h3>
                  <FaChevronDown className="arrow-icon" />
                </div>
                <div
                  className="faq-answers"
                  style={{
                    maxHeight: openIndex === index ? "200px" : "0",
                    transition: "max-height 0.5s ease",
                  }}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case "bonuses":
        return (
          <div className="faq-containers">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-questions">
                  <h3>{faq.question}</h3>
                  <FaChevronDown className="arrow-icon" />
                </div>
                <div
                  className="faq-answers"
                  style={{
                    maxHeight: openIndex === index ? "200px" : "0",
                    transition: "max-height 0.5s ease",
                  }}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
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
        <h1> SEBT Batch <span id="batch">15 – SEO</span>, AI & Blogging Training </h1>
        <div className="rating">
          <img src='https://iskills.com/wp-content/uploads/2024/04/trainer.svg' />
          <p>M Tanveer Nandla <span>(Trainer)</span></p>
          <img src='https://iskills.com/wp-content/uploads//2024/03/user-stars.svg' />
          <p>12,000+ <span> (Graduates)</span></p>
          <p> 5 <FaStar /> <span> ( 5932 Reviews )</span></p>
        </div>

        <div className="hero-both">
          <div className="hero-bg">
            <button className="play-btn" onClick={() => setOpen(true)}>
              ▶
            </button>
          </div>

          {/* Modal */}
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

          <div className='white-div1'>
            <div className='pic-div'>
              <p id="rs"> RS 60,000</p>
              <div className='pic-innerDiv'>
                <img src='https://iskills.com/wp-content/uploads/2024/03/duration-icon.svg' />
                <p>Course Duration: 6 Months</p>
              </div>
              <div className='innerDiv'>
                <div className='innerdiv2'>
                  <img src='https://iskills.com/wp-content/uploads/2024/03/lcd.svg' />
                  <img src='https://iskills.com/wp-content/uploads/2024/03/support.svg' />
                  <img src='https://iskills.com/wp-content/uploads/2024/03/artificial-intelligence.svg' />
                  <img src='https://iskills.com/wp-content/uploads/2024/03/reservation-smartphone.svg' />
                  <img src='https://iskills.com/wp-content/uploads/2024/03/lifetime-access.svg' />
                  <img src='https://iskills.com/wp-content/uploads/2024/03/diploma.svg' />
                  <img src='https://iskills.com/wp-content/uploads/2024/03/money-bill-wave.svg' />

                </div>
                <div className='innerdiv3'>
                  <p>100+ Live Lectures</p>
                  <p>24/7 Support</p>
                  <p>AI Support</p>
                  <p>iOS/Android App Access</p>
                  <p>Lifetime Access</p>
                  <p>Certificate of Completion</p>
                  <p>15 Days Refund Policy</p>

                </div>
              </div>
              <button className="enroll-btn1"> Get Enrolled Now  < FaAngleRight size={13} />  </button>

            </div>
          </div>
        </div>

        <p id="training-program"><b>Join SEBT Batch 15 by iSkills – Pakistan’s Best SEO Training Program 2025!</b><br /><br />
          Led by industry expert <b>M Tanveer Nandla</b>, master <b>SEO, AIO, Blogging, Freelancing, Local SEO,</b>and<br />
          <b>Digital Marketing.</b> Gain practical skills and expert insights to transform your career.<br /><br />
          Sign up now and become a skilled SEO professional!</p><br />
        <p className="firstP">SEBT Batch 15 Details & Registration ——— —</p>
        <p id="training">Batch 15 by iSkills: SEO, AIO, Blogging, Freelancing, ecom SEO & Paid Marketing Training (2026)</p>

        {/*--- 4-tabs layout---*/}

        <div className="container">

          <div className="tabs">
            <button className={activeTab === "content" ? "active" : ""} onClick={() => setActiveTab("content")}>
              Training Content
            </button>

            <button className={activeTab === "important" ? "active" : ""} onClick={() => setActiveTab("important")}>
              Important
            </button>

            <button className={activeTab === "bonuses" ? "active" : ""} onClick={() => setActiveTab("bonuses")}>
              Bonuses
            </button>

            <button className={activeTab === "vision" ? "active" : ""} onClick={() => setActiveTab("vision")}>
              iSkills Impact & Vision
            </button>
          </div>


          <div className="tab-content">{renderContent()}</div>
        </div>

        <p ref={textRef1}
          className="scroll-fill-text1" id="para"
          style={{
            backgroundSize: `${fillPercent1}% 100%`,
          }}>Join iSkills today and turn learning into earning!</p>
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
          }}>Led by M Tanveer Nandla, learn the core principles of SEO, AI SEO and blogging. Learn how to design standout blogs, write compelling content, and implement advanced SEO strategies. With experts guidance, you'll gain the skills necessary to excel in the digital marketing landscape.</p>

        <div className="white-faq">
          <h2>SEBT</h2>
          <p id="price">RS. 60,000</p>
          <p id="div-p">Important Note<br />
            Course Access<br />
            Training Content<br />
            Support<br />
            Resources<br />
            Bonus<br />
          </p>
          <button className="enroll-btn1"> Register Now  < FaAngleRight size={13} />  </button>
        </div>
        <div className="stories">
          <p id='introS'> Say hi to 👋🏻 ——— — </p>
          <h1>Our Success Stories</h1><br />
          <p ref={textRef11}
            className="scroll-fill-text1" id='introP'
            style={{
              backgroundSize: `${fillPercent11}% 100%`,
            }}>Meet the achievers of iSkills who have turned their dreams into reality. Each story is a testament to perseverance and success, showcasing how our personalized<br />
            training in digital marketing can pave the way to a thriving career.Be inspired by their journeys as they navigate the challenges and triumphs of the digital world.
          </p>
        </div>
        <Testimonals />

        <div className="images">
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.30-PM.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.37-PM-3.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/WhatsApp-Image-2025-10-09-at-7.23.16-PM.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.21-PM-2.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.22-PM-1.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/WhatsApp-Image-2025-10-09-at-9.17.09-PM-3.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.31-PM.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.24-PM-2.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.30-PM-1.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.26-PM-1.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.27-PM.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.39-PM-1.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.33-PM-2-859x1536.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.26-PM-2.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.32-PM-1.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.36-PM.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.37-PM-2-913x1536.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.34-PM-1.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.33-PM-1-904x1536.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.38-PM.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.24-PM-1.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.31-PM-2-856x1536.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.22-PM-2.jpeg' />
          <img src='https://iskills.com/wp-content/uploads/2024/03/Copy-of-WhatsApp-Image-2025-10-09-at-3.52.27-PM-2.jpeg' />
        </div>
        <FAQ2 />
      </div>
      <Footer />

    </>
  )
}

export default SEBT
