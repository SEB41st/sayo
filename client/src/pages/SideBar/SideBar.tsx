import * as S from "./styled";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

const SideBar = ({ isOpen, setIsOpen }:any) => {
    const [ItemToggleMenu, setItemToggleMenu] = useState(false);
    const [MypageToggleMenu, setMypageToggleMenu] = useState(false);
    let userId = localStorage.getItem("userId")
    const outside = useRef<any>();
 
    useEffect(() => {
        document.addEventListener('mousedown', handlerOutsie);
        return () => {
        document.removeEventListener('mousedown', handlerOutsie);
        };
    });
    
    const handlerOutsie = (e: any) => {
        if (!outside.current.contains(e.target)) {
          toggleSide();
        }
      };
      const toggleSide = () => {
        setIsOpen(false);
      };

    const ItemToggleChange = () => {
        setItemToggleMenu(!ItemToggleMenu)
    }

    const MypageToggleChange = () => {
        setMypageToggleMenu(!MypageToggleMenu)
    }

    return (
        <S.SidebarWrap id="sidebar" ref={outside} className={isOpen ? 'open' : ''}>
            <S.HeaderMain>
                <Link to ="/">
                    <S.LogoImg src="/assets/WhiteLogo.png" alt ="" ></S.LogoImg>
                </Link>
                {/* <S.NavBack to="/">x</S.NavBack> */}
                <S.NavBack onClick={() => setIsOpen(false)}>x</S.NavBack>
            </S.HeaderMain>
            <S.Main>
                <S.MenuTitle>
                    <div>상품</div>
                    {ItemToggleMenu ? (<GoTriangleUp onClick={() => ItemToggleChange()}/>) :
                    (<GoTriangleDown onClick={() => ItemToggleChange()}/>)}
                </S.MenuTitle>
                {ItemToggleMenu ? (
                <S.GoodsList>
                    <S.NavFont to="/itemList">상품 전체 보기</S.NavFont>
                    <S.NavFont to="/map">지도로 찾아보기</S.NavFont>
                    {userId ? <S.NavFont to="/write">공동구매 제안하기</S.NavFont>:<S.NavFont to="/login">공동구매 제안하기</S.NavFont>}
                </S.GoodsList>
                ):(
                null
                )}
                {userId?
                <S.NavFont to="/myInfo">
                     <div>내 정보</div>
                </S.NavFont> : <S.NavFont to="/login">
                     <div>내 정보</div>
                </S.NavFont>}
                <S.MenuTitle>
                    <div>마이페이지</div>
                    {MypageToggleMenu ? (<GoTriangleUp onClick={() => MypageToggleChange()}/>) :
                    (<GoTriangleDown onClick={() => MypageToggleChange()}/>)}
                </S.MenuTitle>
                {MypageToggleMenu ? (
                <S.GoodsList>
                    {userId? <S.NavFont to="/myPage">마이페이지</S.NavFont> : <S.NavFont to="/login">마이페이지</S.NavFont>}
                    <S.NavFont to="http://st.sweettracker.co.kr/#/">배송 조회</S.NavFont>
                    {userId? <S.NavFont to="/cart">장바구니</S.NavFont> : <S.NavFont to="/login">장바구니</S.NavFont>}
                </S.GoodsList>
                ):(
                null
                )}
                
            </S.Main>
        </S.SidebarWrap>
    )
}
export default SideBar;