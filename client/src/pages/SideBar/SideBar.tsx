import * as S from "./styled";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

const SideBar = () => {
    const [ItemToggleMenu, setItemToggleMenu] = useState(false);
    const [MypageToggleMenu, setMypageToggleMenu] = useState(false);

    const ItemToggleChange = () => {
        setItemToggleMenu(!ItemToggleMenu)
        console.log("toggleMenu1 " + ItemToggleMenu)
    }

    const MypageToggleChange = () => {
        setMypageToggleMenu(!MypageToggleMenu)
        console.log("toggleMenu2 "+MypageToggleMenu)
    }

    return (
        <div>
        <S.HeaderMain>
            <Link to ="/">
                <S.LogoImg src="/assets/WhiteLogo.png" alt ="" ></S.LogoImg>
            </Link>
            <S.NavBack to="/">x</S.NavBack>
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
                <S.NavFont to="/write">공동구매 제안하기</S.NavFont>
            </S.GoodsList>
            ):(
            null
            )}
            <S.NavFont to="/myInfo">
                <div>내 정보</div>
            </S.NavFont>
            <S.MenuTitle>
                <div>마이페이지</div>
                {MypageToggleMenu ? (<GoTriangleUp onClick={() => MypageToggleChange()}/>) :
                (<GoTriangleDown onClick={() => MypageToggleChange()}/>)}
            </S.MenuTitle>
            {MypageToggleMenu ? (
            <S.GoodsList>
                <S.NavFont to="/myPage">마이페이지</S.NavFont>
                <S.NavFont to="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%EB%84%A4%EC%9D%B4%EB%B2%84+%EB%B0%B0%EC%86%A1%EC%A1%B0%ED%9A%8C">배송 조회</S.NavFont>
                <S.NavFont to="/cart">장바구니</S.NavFont>
            </S.GoodsList>
            ):(
            null
            )}
            
        </S.Main>
        </div>
    )
}
export default SideBar;