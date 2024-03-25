import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./menu/menu.js";
import Main from "./main/main.js";
import Boardpost from "./board/boardpost.js";
import Boarddetail from "./board/boardDetail.js";
import Boardupdate from "./board/boardupdate.js";

function App() {
  return (
    <div className="wrap">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/boardupdate/:id" element={<Boardupdate />}></Route>
          <Route path="/boardpost" element={<Boardpost />}></Route>
          <Route path="/board/:id" element={<Boarddetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
