import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Boarddetail() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comname, seComName] = useState("");
  const [comcontent, setComContent] = useState("");
  const [board, setBoard] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const boardupdate = () => {
    navigate("/boardupdate/" + id);
  };
  const boarddelete = () => {
    axios
      .delete(`http://localhost:8080/board/${id}`)
      .then((response) => {
        // 성공적으로 요청을 보낸 후 실행할 코드
        console.log("서버 응답:", response.data);
        alert("삭제가 완료되었습니다.");
        navigate("/"); // 홈페이지로 이동
      })
      .catch((error) => {
        // 요청 실패 시 실행할 코드
        alert("삭제를 실패했습니다.");
        console.error("요청 실패:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/board/${id}`)
      .then((response) => {
        console.log("게시글 상세 정보:", response.data);
        const { name, title, content } = response.data;
        setName(name);
        setTitle(title);
        setContent(content);
        setBoard(response.data);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, [id]); // id가 변경될 때만 실행

  const handleComPost = () => {
    const data = {
      name: comname, // 댓글 작성자
      content: comcontent, // 댓글 내용
    };

    axios
      .post(`http://localhost:8080/board/${id}/comment`, data) // 게시글 id와 함께 댓글 엔드포인트로 요청을 보냄
      .then((response) => {
        console.log("서버 응답:", response.data);
        alert("댓글 등록이 완료되었습니다.");
        // 댓글 등록 후 새로고침 없이 댓글을 보여주기 위해 해당 댓글을 board 상태에 추가
        setBoard((prevState) => {
          const updatedComments = [...prevState.comments, response.data]; // 새로 추가된 댓글을 기존 댓글 목록에 추가
          return { ...prevState, comments: updatedComments }; // 기존 board 상태를 유지하면서 새로운 댓글 목록으로 갱신
        });
        // 댓글 등록 후 입력 필드 초기화
        seComName("");
        setComContent("");
      })
      .catch((error) => {
        console.error("요청 실패:", error);
        alert("댓글 등록에 실패했습니다.");
      });
  };

  return (
    <div>
      <h1>게시글 상세 정보</h1>
      <br></br>

      <p>Name: {name}</p>
      <p>Title: {title}</p>
      <p>Content: {content}</p>
      <button className="button" onClick={boardupdate}>
        수정
      </button>
      <button className="button" onClick={boarddelete}>
        삭제
      </button>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <hr></hr>
      <p>댓글</p>
      <input
        className="input-field"
        type="text"
        value={comname}
        placeholder="댓글 작성자"
        onChange={(e) => seComName(e.target.value)}
      />
      <input
        className="input-field"
        type="text"
        value={comcontent}
        placeholder="댓글 내용"
        onChange={(e) => setComContent(e.target.value)}
      />
      <button className="button" onClick={handleComPost}>
        댓글 등록
      </button>
      <div>
        {board.comments &&
          board.comments.map((comment, index) => (
            <div key={index}>
              <p>Name: {comment.name}</p>
              <p>Content: {comment.content}</p>
              <p>Regdate: {comment.regdate}</p>
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Boarddetail;
