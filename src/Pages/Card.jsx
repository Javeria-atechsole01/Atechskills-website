import React from "react";
import "./Card.css";
import { FaAngleRight } from "react-icons/fa"


const Card = ({ data }) => {
  return (
    <div className="cardd">

      <div className="cardd-top"></div>

      <div className="cardd-content">
        <h2 className="title">{data.name}</h2>

        <img src={data.image} className="cardd-img" alt="" />

        <div className="Info">
        <div className="info-box">
          <div className="row">
            <img src="https://iskills.com/wp-content/uploads/2024/04/skill-icon.svg" className="icon" />
            <span><strong>Skill</strong> {data.skill}</span>
          </div>

          <div className="row">
            <img src="https://iskills.com/wp-content/uploads/2024/04/batch-icon.svg" className="icon" />
            <span><strong>Batch</strong> {data.batch}</span>
          </div>
        </div>
        <div className="info-boxx">
             <div className="row">
            <img src="https://iskills.com/wp-content/uploads/2024/04/earning-icon.svg" className="icon" />
            <span><strong>Earnings</strong> {data.earnings}</span>
          </div>

          <div className="row">
            <img src="https://iskills.com/wp-content/uploads/2024/04/money-icon.svg" className="icon" />
            <span><strong>Monthly</strong> {data.monthly}</span>
          </div>
        </div>
        </div>

        <button className="arrow-btn">< FaAngleRight size={13} /></button>
      </div>
    </div>
  );
};

export default Card;
