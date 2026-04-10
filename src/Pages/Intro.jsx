import React from 'react'
import './Intro.css'
import { FaCalendarAlt, FaStar, FaUserGraduate, FaDollarSign } from "react-icons/fa";

const statsData = [
  { icon: <FaCalendarAlt size={30} />, number: "8+", label: "Years Experience" },
  { icon: <FaStar size={30} />, number: "14+", label: "Batches" },
  { icon: <FaUserGraduate size={30} />, number: "14k+", label: "Students" },
  { icon: <FaDollarSign size={30} />, number: "$300M+", label: "Revenue" },
];

const Intro = () => {
  return (
    <section className='intro-continer'>
      <div className='intro'>

        {/* Text Column */}
        <div className='intro-lines'>
          <p id='introS'> Intro ATechSkills ——— — </p>
          <h1>Welcome to ATechSkills</h1>
          <p id='introP'>Established in 2017, <b>ATechSkills</b> is Pakistan’s leading online platform connecting learners with expert trainers in <b>AI, Cybersecurity, and Full Stack Development.</b><br />
            Our mission? To empower beginners and professionals alike with practical,
            <br />in-demand skills that unlock real opportunities.<br />

            <br />What sets <b>ATechSkills</b> apart is our <b>DEVSECAI model</b> backed by industry expertise. The secret?
            <br />Our <b>mentorship-driven approach,</b> ensuring you’re never left alone during challenging
            times.<b />

            <br />Join the platform that delivers not just training but <b>career transformation.</b></p>
        </div>

        {/* Stats Column */}
        <div className='intro-stats'>
          <div className="stats-grid">
            {statsData.map((item, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-icon">{item.icon}</div>
                <h3>{item.number}</h3>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Intro
