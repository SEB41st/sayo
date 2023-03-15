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
.hambergerbar{
    justify-content: flex-end;
    font-size: 1.5rem;
    margin-right: 0px;
}
`

export const HeaderLogo = styled.div`
    
`

export const LogoImg = styled.img`
    width: 100%;
    height: 80%;
`

export const Login = styled(NavLink)`
    font-size: small;
    font-weight: 600;
    margin-right: 10px;
`