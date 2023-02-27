import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const HeaderMain = styled.div`
    width: 100%;
    /* border-top: 1px solid #d0d0d0; */
    background: #FEF8E3;
    height: 3%;
    display: flex;
    justify-content: center;
    align-items: center;
.hambergerbar{
    justify-self: end;
    font-size: 1.5rem;
}
`

export const LogoImg = styled.img`
    width: 100%;
    height: 100%;
`

export const SideBar = styled(NavLink)`
    font-size: small;
`