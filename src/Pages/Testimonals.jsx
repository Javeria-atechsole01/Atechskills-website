import React, { useState } from "react";
import "./Testimonals.css";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";



const testimonials = [
  {
    id: 1,
    name: "Faisal Fateh Khan",
    earned: "–",
    source: "Full Stack Development",
    image: "https://ui-avatars.com/api/?name=Faisal+Fateh&background=random&color=fff&size=256",
    text: "Faisal Fateh Khan, a student from the DEVSECAI Bootcamp at ATechSkills, has achieved outstanding success with the guidance and mentorship provided by the team.",
  },
  {
    id: 2,
    name: "Syed Shaban Gillani",
    earned: "-",
    source: "AI & Data Science",
    image: "https://ui-avatars.com/api/?name=Syed+Shaban&background=random&color=fff&size=256",
    text: "Syed Shaban Gillani built his career through ATechSkills mentorship and now earns consistently from international clients in the AI sector.",
  },
  {
    id: 3,
    name: "Imran Ahmed",
    earned: "-",
    source: "Cybersecurity",
    image: "https://ui-avatars.com/api/?name=Imran+Ahmed&background=random&color=fff&size=256",
    text: "Imran Ahmed, a student of ATechSkills in the DEVSECAI batch, has achieved remarkable success under the guidance of our security leads.",
  },
  {
    id: 4,
    name: "Hamza Jahangir",
    earned: "-",
    source: "Web Development",
    image: "https://ui-avatars.com/api/?name=Hamza+Jahangir&background=random&color=fff&size=256",
    text: "Hamza, a brilliant student of ATechSkills, has achieved remarkable success in building scalable web applications.",
  },
  {
    id: 5,
    name: "Hamza Yaseen",
    earned: "-",
    source: "AI Automation",
    image: "https://ui-avatars.com/api/?name=Hamza+Yaseen&background=random&color=fff&size=256",
    text: "Hamza, a student of ATechSkills in the DEVSECAI batch, has achieved remarkable success under the guidance of our expert mentors.",
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ensure these functions are declared BEFORE they are used in JSX
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };
  return (
    <>
    <div className="testimonials">
    <p id='introS'> Testimonials ——— — </p>
    <h1>What Our Students Say</h1><br />  
    </div>
    <div className="testimonial-container">

      <div className="testimonial-slider">
        <div
          className="testimonial-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.id}>
              <div className="profile-section">
                <img src={t.image} alt={t.name} className="profile-img" />
                <div className="profile-info">
                  <h3>{t.name}</h3>
                  <p>Earned: <span>{t.earned}</span></p>
                  <p>Source: {t.source}</p>
                </div>
              </div>

              <div className="quote-section">
                <FaQuoteLeft className="quote-icon left-quote" />
                <p>{t.text}</p>
                <FaQuoteRight className="quote-icon right-quote" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonial-arrowss">
        <button className="arrowws left" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <button className="arrowws right" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </div>
    </div>

    </>

  )
}

export default Testimonials;
