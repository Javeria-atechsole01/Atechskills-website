import React, { useState } from "react";
import "./Services.css";
import { Link } from "react-router-dom";

const services = [
  {
    key: "ai",
    label: "AI Track Course",
    route: "/AI",
    title: "AI Development",
    desc:
      "Build end-to-end AI solutions using ML, DL and NLP. Learn to design data pipelines, train and evaluate models, and deploy APIs with production-grade practices.",
  },
  {
    key: "dev",
    label: "Development Track Course",
    route: "/Development",
    title: "Full-Stack Web Development",
    desc:
      "Master modern frontends and backends, databases, SDLC and CI/CD. Ship scalable, secure applications with clean architecture and robust UX.",
  },
  {
    key: "cyber",
    label: "Cybersecurity Track Course",
    route: "/Cybersecurity",
    title: "Cybersecurity",
    desc:
      "Learn defense-in-depth, network security, SOC operations and incident response. Apply practical playbooks to protect systems across the stack.",
  },
  {
    key: "qes",
    label: "(QES) Quick Earning Skills",
    route: "/QES",
    title: "Quick Earning Skills",
    desc:
      "Launch AI-assisted micro-businesses: YouTube automation, SEO blogging, digital marketing, freelancing and no-code sites — optimized for fast execution.",
  },
  {
    key: "Ai-auto",
    label: "AI Automation using n8n zapier",
    route: "/Automation",
    title: "AI Automation using n8n zapier",
    desc:
      "Ai Automation using n8n zapier is a bootcamp that teaches you how to use n8n and zapier to automate your business processes.",
  },
];

export default function Services() {
  const [active, setActive] = useState(services[0].key);
  const current = services.find((s) => s.key === active);

  return (
    <section className="services-section">
      <h2 className="services-title">Services We Offer</h2>
      <div className="services-grid">
        <aside className="services-sidebar">
          {services.map((s) => (
            <button
              key={s.key}
              className={"service-item" + (active === s.key ? " active" : "")}
              onClick={() => setActive(s.key)}
              aria-pressed={active === s.key}
            >
              {s.label}
            </button>
          ))}
        </aside>

        <div className="service-content">
          <div className="service-tab-badge">{current.label}</div>
          <h3 className="service-content-title">{current.title}</h3>
          <p className="service-content-desc">{current.desc}</p>

          <ul className="service-benefits">
            <li>
              <span className="dot"></span>
              Industry-aligned curriculum and hands-on projects
            </li>
            <li>
              <span className="dot"></span>
              Mentorship, community and career support
            </li>
            <li>
              <span className="dot"></span>
              Production-ready workflows and best practices
            </li>
          </ul>

          <Link to={current.route} className="read-more">
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
}
