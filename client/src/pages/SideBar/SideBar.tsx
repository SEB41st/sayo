import * as S from "./styled";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

const SideBar = () => {
    const [toggleMenu1, setToggleMenu1] = useState(false);
    const [toggleMenu2, setToggleMenu2] = useState(false);

    const toggleChange = () => {
        setToggleMenu1(!toggleMenu1)
        console.log(toggleMenu1)
    }

    return (
        <div>
        <S.HeaderMain>
            {/* <Link to ="/"> */}
            <S.LogoImg src="/assets/WhiteLogo.png" alt ="" ></S.LogoImg>
            {/* </Link> */}
            <S.NavBack to="/">x</S.NavBack>
        </S.HeaderMain>
        <S.Main>
            <S.MenuTitle>
                <div>상품</div>
                {toggleMenu1 ? (<GoTriangleUp onClick={toggleChange}/>) :
                (<GoTriangleDown onClick={toggleChange}/>)}
            </S.MenuTitle>
            {toggleMenu1 ? (
            <S.GoodsList>
                <S.NavFont to="/itemList">상품 전체 보기</S.NavFont>
                <S.NavFont to="/map">지도로 찾아보기</S.NavFont>
                <S.NavFont to="/write">공동구매 제안하기</S.NavFont>
            </S.GoodsList>
            ):(
            null
            )}
            <S.NavFont to="/myInfo">내 정보</S.NavFont>
            <S.MenuTitle>
                <div>마이페이지</div>
                {toggleMenu2 ? (<GoTriangleUp onClick={toggleChange}/>) :
                (<GoTriangleDown onClick={toggleChange}/>)}
            </S.MenuTitle>
            {toggleMenu2 ? (
            <S.GoodsList>
                <S.NavFont to="/myPage">마이페이지</S.NavFont>
                <S.NavFont to="/map">배송 조회</S.NavFont>
                <S.NavFont to="/write">장바구니</S.NavFont>
            </S.GoodsList>
            ):(
            null
            )}
            
        </S.Main>
        </div>
    )
}
export default SideBar;