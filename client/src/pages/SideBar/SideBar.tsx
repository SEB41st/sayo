import * as S from "./styled";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

const SideBar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    const toggleChange = () => {
        setToggleMenu(!toggleMenu)
        console.log(toggleMenu)
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
                {toggleMenu ? (<GoTriangleUp onClick={toggleChange}/>) :
                (<GoTriangleDown onClick={toggleChange}/>)}
            </S.MenuTitle>
            {toggleMenu ? (
            <S.GoodsList>
                <S.NavFont to="/">상품 전체 보기</S.NavFont>
                <S.NavFont to="/map">지도로 찾아보기</S.NavFont>
                <S.NavFont to="/write">공동구매 제안하기</S.NavFont>
            </S.GoodsList>
            ):(
            null
            )}
            <S.NavFont to="/myInfo">내 정보</S.NavFont>
            <S.NavFont to="/myPage">마이페이지</S.NavFont>
        </S.Main>
        </div>
    )
}
export default SideBar;