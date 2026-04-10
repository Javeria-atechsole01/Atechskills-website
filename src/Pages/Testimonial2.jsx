
import React, { useState } from "react";
import "./Testimonals.css"
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Nafia Memon",
    earned: "–",
    source: "Blogging",
    image: "https://ui-avatars.com/api/?name=Nafia+Memon&background=FF4081&color=fff&size=256",
    text: "Nafia Memon, a student from the DEVSECAI Bootcamp at ATechSkills, has achieved outstanding success with the guidance and mentorship provided by the team.",
  },
  {
    id: 2,
    name: "Iqra Marium",
    earned: "-",
    source: "Freelancing",
    image: "https://ui-avatars.com/api/?name=Iqra+Marium&background=FF4081&color=fff&size=256",
    text: "Iqra Marium built her freelancing career through ATechSkills mentorship and now earns consistently from international clients.",
  },
  {
    id: 3,
    name: "Shazia Meer",
    earned: "500000",
    source: "Freelancing",
    image: "https://ui-avatars.com/api/?name=Shazia+Meer&background=FF4081&color=fff&size=256",
    text: "Shazia Meer, a student of ATechSkills in the DEVSECAI batch, has achieved remarkable success under the guidance of our mentors.",
  },
  {
    id: 4,
    name: "Neelum Shehzadi",
    earned: "7200000",
    source: "Freelancing",
    image: "https://ui-avatars.com/api/?name=Neelum+Shehzadi&background=FF4081&color=fff&size=256",
    text: "Neelum Shehzadi, a brilliant student of ATechSkills in the DEVSECAI batch, has achieved remarkable success in her freelance career.",
  },
  {
    id: 5,
    name: "MehMal Baloch",
    earned: "-",
    source: "Drop-shipping",
    image: "https://ui-avatars.com/api/?name=MehMal+Baloch&background=FF4081&color=fff&size=256",
    text: "MehMal Baloch, a student of ATechSkills in the DEVSECAI batch, has achieved remarkable success under the guidance of the team.",
  }
];


const Testimonial2 = () => {
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
    <div className="female-testimonial">
      <div className="about-female">
        <p id='about-F'> ATechSkills Shines ✨ ——— — </p>
        <h1>Celebrating Our Female Stars' Wins!</h1><br />
        <p id='aboutF-P'>Anas ibn Malik reported: The Messenger of Allah, PBUH, said, “Seeking knowledge is an obligation upon every Muslim (Men & Women).” Sunan Ibn Mājah 224 </p>
      </div>
      <div className="testimonial-container">
        <button className="arrow1 left" onClick={prevSlide}>
          <FaChevronLeft />
        </button>

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

        <button className="arrow1 right" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  )
}

export default Testimonial2
