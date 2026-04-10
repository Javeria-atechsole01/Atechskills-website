import React from 'react';
import { FaClock, FaVideo, FaHeadset, FaRobot, FaMobileAlt, FaInfinity, FaCertificate, FaUndo, FaArrowRight } from 'react-icons/fa';
import './CoursePricingCard.css';

const CoursePricingCard = ({ price = 'RS 1,5000', duration = '6 Months', training = '3 Months Training', internship = '3 Months Internship' }) => {
    return (
        <div className="course-pricing-card">
            <div className="price-header">
                <h2 className="price">{price}</h2>
                <div className="duration-tag">
                    <FaClock className="duration-icon" />
                    <span>Course Duration: {duration}</span>
                   
                </div>
                 <div className="duration-tag">
                    <FaClock className="duration-icon" />
                    <span>{training} <br/> {internship} </span>
                   
                </div>
            </div>

            <ul className="course-features">
                <li>
                    <div className="feature-icon"><FaVideo /></div>
                    <span>100+ Live Lectures</span>
                </li>
                <li>
                    <div className="feature-icon"><FaHeadset /></div>
                    <span>24/7 Support</span>
                </li>
                <li>
                    <div className="feature-icon"><FaRobot /></div>
                    <span>AI Support</span>
                </li>
                <li>
                    <div className="feature-icon"><FaMobileAlt /></div>
                    <span>iOS/Android App Access</span>
                </li>
                <li>
                    <div className="feature-icon"><FaInfinity /></div>
                    <span>Lifetime Access</span>
                </li>
                <li>
                    <div className="feature-icon"><FaCertificate /></div>
                    <span>Certificate of Completion</span>
                </li>
                <li>
                    <div className="feature-icon"><FaUndo /></div>
                    <span>15 Days Refund Policy</span>
                </li>
            </ul>

            <button className="enroll-btn-large" onClick={() => window.location.href = 'https://atechskills.com/lms/login.php'}>
                Get Enrolled Now <FaArrowRight size={14} style={{ marginLeft: '8px' }} />
            </button>
        </div>
    );
};

export default CoursePricingCard;
