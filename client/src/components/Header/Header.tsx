import * as S from "./styled";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = () => {
    return (
    <S.HeaderMain>
        <S.HeaderLogo>
            <Link to ="/">
                <S.LogoImg src="/assets/Logo.png" alt ="" ></S.LogoImg>
            </Link>
        </S.HeaderLogo>
        <S.Login to='/Login'>Login</S.Login>
        <Link to="/sidebar"><GiHamburgerMenu className="hambergerbar"/></Link>
    </S.HeaderMain>
    )
}
export default Header;