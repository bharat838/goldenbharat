import React, { useState, useEffect } from "react";
import "./HeroSection.css";

const images = [
  "/images/flag1.jpg",
  "/images/defence1.jpg",
  "/images/isro1.jpg",
  "/images/drdo1.jpg",
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // 4 seconds delay
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
      }}
    >
      <div className="hero-overlay">
        <div className="hero-content" data-aos="fade-up">
          <h1 className="hero-title">🇮🇳 Join the Mission</h1>
          <p className="hero-subtitle">
            Support India’s Defence, Space, and Research for a Stronger Nation
          </p>
          <button className="hero-btn">Explore Plans</button>
        </div>
      </div>
    </section>
  );
}

