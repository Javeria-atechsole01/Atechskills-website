
import React, { useEffect, useRef, useState } from "react";
import './Timer.css'

const Timer = () => {

  const textReff = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { threshold: 0.2 }
    );

    if (textRef.current) observer.observe(textRef.current);
    return () => observer.disconnect();
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




  const [time, setTime] = useState({
    days: -335,
    hours: -9,
    minutes: -52,
    seconds: -25,
  });

  useEffect(() => {
    // Set target date to 30 days from now (demo) or a specific date
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15); // 15 days from now
    targetDate.setHours(23, 59, 59);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTime({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (

    <>
      <div className='regis'>
        <h1 ref={textRef}
          className="scroll-fill-text"
          style={{
            backgroundSize: `${fillPercent}% 100%`,
          }}
        >Registration is Open</h1>
        <p ref={textReff}
          className={`drop-text ${isVisible ? "visible" : ""}`}>Enroll Now</p>
      </div>
      <section className="timer-section">
        <div className="timer-container">
          <div className="time-box">
            <h4>Days</h4>
            <span>{time.days}</span>
          </div>
          <span className="colon">:</span>
          <div className="time-box">
            <h4>Hours</h4>
            <span>{time.hours}</span>
          </div>
          <span className="colon">:</span>
          <div className="time-box">
            <h4>Minutes</h4>
            <span>{time.minutes}</span>
          </div>
          <span className="colon">:</span>
          <div className="time-box">
            <h4>Seconds</h4>
            <span>{time.seconds}</span>
          </div>
        </div>
      </section>

      {/*--- Support section removed to avoid overlap with Team section ---*/}
    </>
  );
};

export default Timer
