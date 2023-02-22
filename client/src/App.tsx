import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./Style/globalStyle";
import styled from "styled-components";
import Main from "./pages/Main/Main";
import Write from "./pages/Write/Write";
import Footer from "./components/Footer/Footer";

const Domain = styled.div`
  min-width: 22.5rem;
  min-height: 40rem;
`;

const App: React.FC = () => {
  return (
    <Domain>
      <GlobalStyle />
      {/* <Routes>
        <Route path="/" element={<Main />} 
        <Route path="/write" element={<Write />} 
      </Routes> */}
        <Write />
        <Footer />
    </Domain>
  );
}

export default App;
