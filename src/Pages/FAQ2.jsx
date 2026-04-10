import React, { useState } from "react";
import "./FAQ.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronDown } from "react-icons/fa";


const courses = [
  {
    image: "https://iskills.com/wp-content/uploads/2024/04/yahoo.webp",
  },
  {
    image: "https://iskills.com/wp-content/uploads/2024/04/dg-skills.webp",
  },
  {
    image: "https://iskills.com/wp-content/uploads/2024/04/propakistani.webp",
  },
  {
    image: "https://iskills.com/wp-content/uploads/2024/04/ptv.webp",
  },
  {
    image: "https://iskills.com/wp-content/uploads/2024/04/forbes-india.webp",
  },
  {
    image: "https://iskills.com/wp-content/uploads/2024/04/samaa.webp",
  },
  {
    image: "https://iskills.com/wp-content/uploads/2024/04/dg-skills.webp",
  },
  {
    image: "https://iskills.com/wp-content/uploads/2024/04/urdupoint.webp",
  },
  {
    image: "https://iskills.com/wp-content/uploads/2024/04/ary.webp",
  }
];

const faqData = [
  {
    question: "Is this bootcamp online or in-person?",
    answer:
      "The DEVSECAI Bootcamp is primarily online, with live interactive sessions via our portal. We also have physical labs in Lahore for hands-on practice.",
  },
  {
    question: "I’m new to tech. Can I join?",
    answer:
      "Absolutely! Our curriculum is designed to take you from beginner to job-ready. No prior coding experience is required, just a passion to learn.",
  },
  {
    question: "Is it guaranteed that I will get a job?",
    answer:
      "While no legitimate institute can guarantee a job, we guarantee top-tier training that aligns with market demands. Our graduates are highly sought after in the industry.",
  },
  {
    question: "Does the bootcamp cover AI and Security?",
    answer:
      "Yes! Our unique DEVSECAI model integrates Development, Security, and AI, ensuring you have a competitive edge in the modern tech landscape.",
  },
  {
    question: "What is the success rate of your students?",
    answer:
      "We have a high success rate with many students securing high-paying jobs or successful freelance careers within months of graduation.",
  },
  {
    question: "How much time should I invest daily?",
    answer:
      "We recommend dedicating at least 4-6 hours daily for lectures and practice to fully grasp the concepts and complete projects.",
  },
  {
    question: "What support will I receive?",
    answer:
      "You’ll receive 24/7 support from our technical team, live Q&A sessions with lead instructors, and lifetime access to our community.",
  },
  {
    question: "What tracks does ATechSkills offer?",
    answer:
      "We offer specialized tracks in Full Stack Development, Cybersecurity, and Artificial Intelligence & Machine Learning.",
  },
  {
    question: "How do I enroll?",
    answer:
      "Review the tracks, select your desired path, and click 'Apply Now' to start your application process.",
  },
  {
    question: "Can I switch tracks later?",
    answer:
      "We recommend choosing carefully, but valid requests for track changes can be considered within the first week of training.",
  },
];

export default function FAQSection() {

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

  return (
    <>
      <div className="faq-container">
        <p id='introS'> FAQ's ——— — </p>
        <h1>Frequently Asked Questions</h1><br />
        <p id='introo'>Got questions? We’ve got answers. Check out our FAQs to find quick, clear information on our DEVSECAI Bootcamp, enrollment, and support at ATechSkills.
          Whether you're starting fresh or upskilling, we're here to guide your tech journey.</p>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <FaChevronDown className="arrow-icon" />
            </div>
            <div
              className="faq-answer"
              style={{
                maxHeight: openIndex === index ? "200px" : "0",
                transition: "max-height 0.5s ease",
              }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
        <br /><h1>Still have questions?</h1>

        <button className="enrolll"> Contact Us </button>
      </div>


    </>
  );
}
