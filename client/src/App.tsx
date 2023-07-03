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
import ItemList from "./pages/ItemList/ItemList";
import Cart from "./pages/Cart/Cart";
import Payment from "./pages/Payment/Payment";
import Login from "./pages/Login/Login";
import MyWishItemList from "./pages/ItemList/MyWishItemList";
import MyItemList from "./pages/ItemList/MyItemList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fail from "./pages/Payment/fail";
import Success from "./pages/Payment/success";
import SuccessOne from "./pages/Payment/successOne";
import PaymantEachItem from "./pages/Payment/PaymentEachItem";

const Domain = styled.div`
  min-width: 22.5rem;
  min-height: 40rem;
`;
const App = () => {
  const location = useLocation();

  return (
    <Domain>
      <ToastContainer
        position="top-center" // 알람 위치 지정
        autoClose={1000} // 자동 off 시간
        // hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        // rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="light"
        limit={1} // 알람 개수 제한
        style={{ fontSize: 13 }}
      />
      <GlobalStyle />
      {/* sidebar 일 때 header 없애기 */}
      {!["/sidebar"].includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/write" element={<Write />} />
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/myPage" element={<Mypage />} />
        <Route path="/myInfo" element={<MyInfo />} />
        <Route path="/map" element={<Map />} />
        <Route path="/detail/:Id" element={<Detail />} />
        <Route path="/itemList" element={<ItemList />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentEachItem" element={<PaymantEachItem />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/mywishList" element={<MyWishItemList />} />
        <Route path="/myList" element={<MyItemList />} />
        <Route path="/fail" element={<Fail />} />
        <Route path="/success" element={<Success />} />
        <Route path="/successOne" element={<SuccessOne />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {!["/sidebar"].includes(location.pathname) && <Footer />}
    </Domain>
  );
};

export default App;
