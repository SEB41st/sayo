import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const HeaderMain = styled.div`
    width: 100%;
    /* border-top: 1px solid #d0d0d0; */
    background: #FEF8E3;
    max-height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const HeaderLogo = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    margin-right: 10px;
    
    .hambergerbar{
    font-size: 1.7rem;
    margin-right: 0px;
}
.personIcon{
    justify-content: flex-end;
    font-size: 1.7rem;
    margin-right: 0px;
}
`

export const LogoImg = styled.img`
    width: 100%;
    height: 80%;
`

export const Login = styled(NavLink)`
    font-size: small;
    font-weight: 600;
    margin-right: 10px;
    display: flex;
    align-content: center;
    img{
        width: 40px;
        height: 40px;
        border-radius: 20px;
        align-content: center;
        margin-left: 20px;
        @media screen and (max-width: ${"1080px"}) {
            width: 25px;
            height: 25px;
  }
    }
`