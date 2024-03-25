import React, { useState } from "react";
import "./banner.css"; // CSS 파일 임포트

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = ["./img/사과.png", "./img/바나나.png", "./img/키위.png"];

  const handleNextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const handlePrevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleClickBanner = (index) => {
    setCurrentBanner(index);
  };

  return (
    <div className="banner-container">
      <div className="image-container">
        <img
          className="banner-image"
          src={banners[currentBanner]}
          alt={`Banner ${currentBanner + 1}`}
        />
        <div className="banner-buttons">
          {banners.map((banner, index) => (
            <button
              key={index}
              className={`banner-button ${
                currentBanner === index ? "active" : ""
              }`}
              onClick={() => handleClickBanner(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button className="prev-button" onClick={handlePrevBanner}>
          이전
        </button>
        <button className="next-button" onClick={handleNextBanner}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Banner;
