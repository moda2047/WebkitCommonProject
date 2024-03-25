import React, { useEffect, useState } from "react";
import "./board.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Board() {
  const navigate = useNavigate();
  const [boardlist, setBoardList] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState();

  const goToBoardPost = () => {
    navigate("/boardpost");
  };

  const handleBoardClick = (id) => {
    navigate("/board/" + id);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/board")
      .then((response) => {
        console.log("서버 응답:", response.data);
        setBoardList(response.data);
        setTotalCount(response.data.length);
      })
      .catch((error) => {
        console.error("요청 실패:", error);
      });
  }, []);
  useEffect(() => {
    // Calculate the maximum page based on data length and itemsPerPage
    const maxPage = Math.ceil(boardlist.length / itemsPerPage);

    // Ensure currentPage is within a valid range
    if (currentPage < 1 || currentPage > maxPage) {
      setCurrentPage((prevPage) => Math.min(Math.max(prevPage, 1), maxPage));
    }
  }, [currentPage, boardlist.length, itemsPerPage]);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    console.log("보드리스트:", boardlist);
  };
  return (
    <div className="AdminMListWrap">
      <div className="AdminMListWrapDiv">
        <button onClick={goToBoardPost}>게시글 등록</button>
      </div>
      <hr />
      <div className="AdminMListMainWrap">
        <div className="AdminMListMainIntro">
          <span className="AdminMListMainIntroSpan">게시판 목록</span>
        </div>
        <div>
          <table className="AdminMListSearchTable">
            <colgroup>
              <col width="15%" />
              <col width="15%" />
              <col width="30%" />
              <col width="25%" />
              <col width="auto" />
            </colgroup>
            <thead>
              <tr>
                <th>no</th>
                <th>이름</th>
                <th>제목</th>
                <th>생성일자</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {Array.isArray(boardlist) && boardlist.length > 0 ? (
                boardlist
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((item) => (
                    <tr key={item.no} onClick={() => handleBoardClick(item.no)}>
                      <td>{item.no}</td>
                      <td>{item.name}</td>
                      <td>{item.title}</td>
                      <td>{item.regdate}</td>
                      <td>{item.hit}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td>게시글이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
          <br />
          <div className="MyBuyListPagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              이전
            </button>
            <span>{currentPage}</span>
            <button
              onClick={nextPage}
              disabled={
                currentPage >= Math.ceil(boardlist.length / itemsPerPage)
              }
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
