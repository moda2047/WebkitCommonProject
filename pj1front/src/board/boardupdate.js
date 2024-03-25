import React, { useEffect, useState } from "react";
import axios from "axios";
import "./boardpost.css"; // 스타일 시트를 임포트합니다
import { useNavigate, useParams } from "react-router-dom"; // useNavigate 임포트

function Boardupdate() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate(); // useNavigate 훅 사용
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/board/${id}`)
      .then((response) => {
        console.log("게시글 상세 정보:", response.data);
        const { name, title, content } = response.data;
        setName(name);
        setTitle(title);
        setContent(content);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, [id]);
  const handleupdate = () => {
    const data = {
      name: name,
      title: title,
      content: content,
    };

    axios
      .put(`http://localhost:8080/board/${id}`, data)
      .then((response) => {
        // 성공적으로 요청을 보낸 후 실행할 코드
        console.log("서버 응답:", response.data);
        alert("수정이 완료되었습니다.");
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
      <button className="button" onClick={handleupdate}>
        수정하기
      </button>
    </div>
  );
}

export default Boardupdate;
