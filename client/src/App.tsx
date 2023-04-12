import React, { useState } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import GlobalStyle from "./Style/globalStyle";
import styled from "styled-components";
import Main from "./pages/Main/Main";
import Write from "./pages/Write/Write";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import SideBar from "./pages/SideBar/SideBar";
import MyInfo from "./pages/MyInfo/MyInfo";
import Map from "./pages/Map/Map";
import Mypage from "./pages/MyPage/MyPage";
import Detail from "./pages/Detail/Detail";
import ItemList from "./pages/ItemList/ItemList"
import Cart from "./pages/Cart/Cart";
import Payment from "./pages/Payment/Payment";
import Login from "./pages/Login/Login";


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
          <Route path="/" element={<Main/>}/> 
          <Route path="/write" element={<Write />}/>
          <Route path="/sidebar" element={<SideBar/>}/> 
          <Route path="/myPage" element={<Mypage/>}/>
          <Route path="/myInfo" element={<MyInfo/>}/>
          <Route path="/map" element={<Map/>}/>
          <Route path="/detail/:Id" element={<Detail/>}/>
          <Route path="/itemList" element={<ItemList/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/cart" element={<Cart/>}/>
          {/* <Route path="/kakaoLogin" element={<KakaoSignUp/>}/> */}
          <Route path="/login" element={<Login/>}/>
          {/* <Route path="/googlelogin" element={<GoogleAuthLogin/>}/> */}
        </Routes>
        {!['/sidebar'].includes(location.pathname) && <Footer />}
        
    </Domain>
  );
};

export default App;
