import * as S from "./styled";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = () => {
    return (
    <S.HeaderMain>
        {/* <Link to ="/"> */}
            <S.LogoImg src="/assets/Logo.png" alt ="" ></S.LogoImg>
        {/* </Link> */}
        <Link to="/sidebar">next page</Link>
    </S.HeaderMain>
    )
}
export default Header;