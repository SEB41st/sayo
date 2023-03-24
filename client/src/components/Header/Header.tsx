import * as S from "./styled";
import { Link } from "react-router-dom";
import { RxHamburgerMenu,RxPerson } from 'react-icons/rx';

const Header = () => {
    return (
    <S.HeaderMain>
        <Link to ="/">
            <S.LogoImg src="/assets/Logo.png" alt ="" ></S.LogoImg>
        </Link>
        <S.HeaderLogo>
            <S.Login to='/login'>
                <RxPerson className="personIcon"/>
            </S.Login>
            <Link to="/sidebar">
                <RxHamburgerMenu className="hambergerbar"/>
            </Link>
        </S.HeaderLogo>
    </S.HeaderMain>
    )
}
export default Header;