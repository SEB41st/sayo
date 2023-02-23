import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import GlobalStyle from "./Style/globalStyle";
import styled from "styled-components";
import Main from "./pages/Main/Main";
import Write from "./pages/Write/Write";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import SideBar from "./pages/SideBar/SideBar";
import MyPage from "./pages/MyPage/MyPage";
import MyInfo from "./pages/MyInfo/MyInfo";
import Map from "./pages/Map/Map";

const Domain = styled.div`
  min-width: 22.5rem;
  min-height: 40rem;
`;

const App = () => {

  const location = useLocation();
  return (
    <Domain>
      <GlobalStyle />
      {/* sidebar 일 때 header 없애기 */}
        {!['/sidebar'].includes(location.pathname) && <Header/> }
        <Routes>
          <Route path="/" element={<Main />}/> 
          <Route path="/write" element={<Write />}/>
          <Route path="/sidebar" element={<SideBar/>}/> 
          <Route path="/myPage" element={<MyPage/>}/>
          <Route path="/myInfo" element={<MyInfo/>}/>
          <Route path="/map" element={<Map/>}/>
        </Routes>
        <Footer />
    </Domain>
  );
}

export default App;
