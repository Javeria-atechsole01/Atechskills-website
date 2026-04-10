import React, { useState, useRef, useEffect } from "react";
import Footer from "../Component/Footer.jsx";
import "./ToolsPage.css";

const tools = [
  {
    title: "Screenify",
    description: "Record, share, and collaborate with instant screen recordings.",
    img: "https://screenify.atechskills.com/assets/screenify-DxDjX7tB.png",
    link: "https://screenify.atechskills.com/",
    glow: "#bdaaff"
  },
  {
    title: "Atechlancer",
    description: "Connect with top freelancers and get your projects done.",
    img: "http://atechlancer.atechskills.com/assets/atechlancer_logo-D_f-0Vls.png",
    link: "http://atechlancer.atechskills.com/",
    glow: "#ffd9b3"
  },
  {
    title: "Educonnect",
    description: "Bridge the gap between students and educators for seamless learning.",
    img: "http://educonnect.atechskills.com/educonnect_logo.png",
    link: "http://educonnect.atechskills.com/",
    glow: "#b3ffe2"
  }
];


const ToolsPage = () => {
  const [hovered, setHovered] = useState(null);
  const [typedText, setTypedText] = useState("");
  const typingIndex = useRef(0);
  const cards = [tools[0], tools[1]];
  const educonnect = tools[2];
  const typingText =
    "Discover a powerful suite of productivity tools crafted by AtechSkills to empower students, professionals, and businesses.\nWhether you need to record and share your screen, connect with top freelancers, or bridge the gap between educators\nand learners, our platform offers seamless, secure, and innovative solutions.\nExperience efficiency, collaboration, and growth with our handpicked digital tools, designed to meet the evolving needs \nof the modern world." + 
    "\n\nUnlock your potential today with AtechSkills Tools.";

  useEffect(() => {
    setTypedText("");
    typingIndex.current = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => {
        if (typingIndex.current < typingText.length) {
          const next = prev + typingText[typingIndex.current];
          typingIndex.current += 1;
          return next;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tools-main-wrapper">
      <div className="tools-flex-layout tools-flex-vertical">
        <div className="tools-left">
          <h1 className="tools-title">AtechSkills Tools</h1>
          <p className="tools-sub"><span className="tools-typing-text">{typedText}</span></p>
        </div>
        <div className="tools-right">
          <div className="tools-cards-floating tools-cards-vertical">
            {cards.map((tool, idx) => (
              <a
                key={tool.title}
                href={tool.link}
                className={`tool-round-card${hovered === idx ? ' hovered' : ''}`}
                style={{
                  animationDelay: `${idx * 1.5}s`,
                  '--glow-color': tool.glow
                }}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="tool-round-img-wrap">
                  <img src={tool.img} alt={tool.title} className="tool-round-img" />
                </div>
                {/* Popup on hover */}
                {hovered === idx && (
                  <div className="tool-popup">
                    <div className="tool-popup-title">{tool.title}</div>
                    <div className="tool-popup-desc">{tool.description}</div>
                  </div>
                )}
              </a>
            ))}
            {/* Educonnect at the bottom */}
            <a
              key={educonnect.title}
              href={educonnect.link}
              className={`tool-round-card${hovered === 2 ? ' hovered' : ''}`}
              style={{
                animationDelay: `1.2s`,
                '--glow-color': educonnect.glow
              }}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(2)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="tool-round-img-wrap">
                <img src={educonnect.img} alt={educonnect.title} className="tool-round-img" />
              </div>
              {hovered === 2 && (
                <div className="tool-popup">
                  <div className="tool-popup-title">{educonnect.title}</div>
                  <div className="tool-popup-desc">{educonnect.description}</div>
                </div>
              )}
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ToolsPage;
