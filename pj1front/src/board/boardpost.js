import React, { useState } from "react";
import axios from "axios";
import "./boardpost.css"; // 스타일 시트를 임포트합니다
import { useNavigate } from "react-router-dom"; // useNavigate 임포트

function Boardpost() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handlePost = () => {
    const data = {
      name: name,
      title: title,
      content: content,
    };

    axios
      .post("http://localhost:8080/board", data)
      .then((response) => {
        // 성공적으로 요청을 보낸 후 실행할 코드
        console.log("서버 응답:", response.data);
        alert("등록이 완료되었습니다.");
        navigate("/"); // 홈페이지로 이동
      })
      .catch((error) => {
        // 요청 실패 시 실행할 코드
        console.error("요청 실패:", error);
      });
  };

  return (
    <div>
      <h1>게시글 등록</h1>
      <input
        className="input-field"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="button" onClick={handlePost}>
        등록
      </button>
    </div>
  );
}

export default Boardpost;
