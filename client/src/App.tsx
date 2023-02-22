import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./Style/globalStyle";
import styled from "styled-components";
import Main from "./pages/Main/Main";
import Write from "./pages/Write/Write";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import SideBar from "./pages/SideBar/SideBar";

const Domain = styled.div`
  min-width: 22.5rem;
  min-height: 40rem;
`;

const App = () => {
  return (
    <Domain>
      <GlobalStyle />
        <Header/>
        <Routes>
          <Route path="/" element={<Main />}/> 
          <Route path="/write" element={<Write />}/>
          <Route path="/sidebar" element={<SideBar/>}/> 
        </Routes>
        <Footer />
    </Domain>
  );
}

export default App;
