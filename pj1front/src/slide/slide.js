import React, { useState, useEffect } from "react";
import "./slide.css"; // 슬라이드 스타일을 정의한 CSS 파일을 가져옵니다.

const Slide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const pears = [
    "./img/배1.png",
    "./img/배2.png",
    "./img/배3.png",
    "./img/배4.png",
    "./img/배5.png",
    "./img/배6.png",
  ];

  const pearname = ["배1", "배2", "배3", "배4", "배5", "배6"];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % pears.length);
    }, 3000); // 3초마다 슬라이드를 변경합니다.

    return () => clearInterval(interval);
  }, []); // 처음 한 번만 실행되도록 빈 배열 전달

  const handleMouseEnter = (event) => {
    event.currentTarget.querySelector(".hover").style.opacity = "1";
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.querySelector(".hover").style.opacity = "0";
  };

  return (
    <div className="slider-container">
      <ul className="slides">
        {[
          currentSlide,
          (currentSlide + 1) % pears.length,
          (currentSlide + 2) % pears.length,
        ].map((index) => (
          <li
            key={index}
            className="slide"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="image-container">
              <img src={pears[index]} alt={`Slide ${index + 1}`} />
              <div className="hover">
                <div className="hover_in">
                  <div>{pearname[index]}</div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slide;
