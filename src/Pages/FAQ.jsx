import React, { useState } from "react";
import "./FAQ.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronDown, FaFacebookMessenger, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

// ... (existing code)

<div className="cont">
  <div className="msg">
    <FaFacebookMessenger size={30} color="#0084FF" style={{ marginBottom: '10px' }} />
    <p> Chat with Messenger</p>
  </div>
  <div className="msg">
    <FaPhoneAlt size={30} color="#34C759" style={{ marginBottom: '10px' }} />
    <p> +92-325-3344552 </p>
  </div>
  <div className="msg">
    <FaWhatsapp size={30} color="#25D366" style={{ marginBottom: '10px' }} />
    <p> Chat with WhatsApp</p>
  </div>
</div>


const courses = [
  {
    image: "https://placehold.co/150x80?text=Yahoo",
  },
  {
    image: "https://placehold.co/150x80?text=DigiSkills",
  },
  {
    image: "https://placehold.co/150x80?text=ProPakistani",
  },
  {
    image: "https://placehold.co/150x80?text=PTV",
  },
  {
    image: "https://placehold.co/150x80?text=Forbes",
  },
  {
    image: "https://placehold.co/150x80?text=Samaa",
  },
  {
    image: "https://placehold.co/150x80?text=DigiSkills",
  },
  {
    image: "https://placehold.co/150x80?text=UrduPoint",
  },
  {
    image: "https://placehold.co/150x80?text=ARY",
  }
];

const faqData = [
  {
    question: "How can I contact ATechSkills for more information?",
    answer:
      "You can reach us by phone, email, or through our website's contact form. All contact details are listed on the ‘Contact Us’ page.",
  },
  {
    question: "Do I receive a certificate upon completing a course?",
    answer:
      "Yes, upon successfully completing your course and meeting all requirements, you’ll receive a certificate from ATechSkills.",
  },
  {
    question: "Is there a refund policy if I decide to drop a course?",
    answer:
      "Yes, ATechSkills offers a refund policy. Please review the refund policy section on our website for detailed terms and conditions.",
  },
  {
    question: "What are the payment options for course fees?",
    answer:
      "We accept payments through multiple channels including bank transfer, Easypaisa, JazzCash, and online card payments.",
  },
  {
    question: "How do the live sessions work?",
    answer:
      "Live sessions are conducted online via Zoom or Google Meet, allowing you to interact directly with instructors and peers in real-time.",
  },
  {
    question: "Are there any prerequisites for joining ATechSkills courses?",
    answer:
      "Most courses are beginner-friendly. However, some advanced courses, like the DEVSECAI tracks, may have specific learning paths.",
  },
  {
    question: "What support will I receive during my training?",
    answer:
      "You’ll receive complete support from trainers and our technical team, including Q&A sessions, discussion groups, and mentorship.",
  },
  {
    question: "What Training programs does ATechSkills offer?",
    answer:
      "ATechSkills offers specialized bootcamps in Full Stack Development, Cybersecurity, and Artificial Intelligence.",
  },
  {
    question: "How do I enroll in a course at ATechSkills?",
    answer:
      "Visit our website, choose your desired course, and click the enroll button. You’ll be guided through a simple registration and payment process.",
  },
  {
    question: "Can I take more than one course at a time?",
    answer:
      "Yes, you can enroll in multiple courses simultaneously, but we recommend focusing on one specialized track for best results.",
  },
];

export default function FAQSection() {

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0, // Continuous flow effect
    speed: 3000, // Smooth transition speed
    cssEase: "linear", // Smooth continuous sliding
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
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
        <p id='introo'>Got questions? We’ve got answers. Check out our FAQs to find quick, clear information on our courses/trainings, enrollment, and support at ATechSkills.
          Whether you're a newbie or a seasoned professional, we're here to help you navigate your educational journey with us.</p>
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
        <br /><h1>Didn’t find what you’re looking for?</h1>

        <button className="enroll"> Contact to Support Now </button>
      </div>

      <div className="media">

        <div className="inTouch">
          <h1>Get in touch now!</h1><br />
          <p>Need more information or ready to enroll? Contact us today via phone, WhatsApp, email, or our online form. We’re here to help guide you on your journey with<br />
            ATechSkills.</p>
          <div className="cont">
            <div className="msg">
              <FaFacebookMessenger size={40} color="#0084FF" />
              <p> Chat with Messenger</p>
            </div>
            <div className="msg">
              <FaPhoneAlt size={40} color="#d32f2f" />
              <p> +92-325-3344552 </p>
            </div>
            <div className="msg">
              <FaWhatsapp size={40} color="#25D366" />
              <p> Chat with WhatsApp</p>
            </div>
          </div>

        </div>
      </div>


    </>
  );
}
