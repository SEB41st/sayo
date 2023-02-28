import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const HeaderMain = styled.div`
    width: 100%;
    /* border-top: 1px solid #d0d0d0; */
    background: #FEF8E3;
    max-height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
.hambergerbar{
    justify-self: end;
    font-size: 1.5rem;
    margin-right: 20px;
}
`

export const LogoImg = styled.img`
    width: 100%;
    height: 80%;
`

export const SideBar = styled(NavLink)`
    font-size: small;
`