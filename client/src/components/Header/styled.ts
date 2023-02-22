import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const HeaderMain = styled.div`
    width: 100%;
    /* border-top: 1px solid #d0d0d0; */
    background: #FEF8E3;
    max-height: 3%;
    display: flex;
    justify-content: center;
    
`

export const LogoImg = styled.img`
    max-width: 5%;
    max-height: 5%;
`

export const SideBar = styled(NavLink)`
    font-size: small;
`