import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./Style/globalStyle";
import styled from "styled-components";
import Main from "./pages/Main/Main";
import Write from "./pages/Write/Write";
import Footer from "./components/Footer/Footer";
import Mypage from "./pages/Mypage/Mypage";
import Detail from "./pages/Detail/Detail";
import Cart from "./pages/Cart/Cart";

const Domain = styled.div`
  min-width: 22.5rem;
  min-height: 40rem;
`;

const App = () => {
  return (
    <Domain>
      <GlobalStyle />
      {/* <Routes>
        <Route path="/" element={<Main />} 
        <Route path="/detail" element={<Detail />} 
        <Route path="/write" element={<Write />} 
        <Route path="/mypage" element={<Mypage/>} 
      </Routes> */}
      <Cart/>
      <Footer />
    </Domain>
  );
};

export default App;
