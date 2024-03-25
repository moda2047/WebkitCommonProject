import React, { useState } from "react";
import "./menu.css";

function Menu() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="mainMenu">
        <ul className="a">
          <li className="parent">
            <span>메인이미지</span>
            <ul className="b"></ul>
          </li>
          <li className="parent">
            <span>메뉴</span>
            <ul className="b">
              <li>마우스소메뉴</li>
              <li>상단고정</li>
              <li>햄버거</li>
            </ul>
          </li>
          <li className="parent">
            <span>배너</span>
            <ul className="b">
              <li>서비스섹션 배너기능</li>
              <li>배너 이동</li>
            </ul>
          </li>
        </ul>
        <div className="at-open-menu" onClick={toggleMenu}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        <div className={`menuBox ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <span>메인이미지</span>
              <ul></ul>
            </li>
            <li>
              <span>메뉴</span>
              <ul>
                <li>마우스소메뉴</li>
                <li>상단고정</li>
                <li>햄버거</li>
              </ul>
            </li>
            <li>
              <span>배너</span>
              <ul>
                <li>서비스섹션 배너기능</li>
                <li>배너 이동</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Menu;
