import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const SidebarWrap = styled.div`
    width: 100vw;
    height: 100%;
    display: grid;
    /* @media screen and (min-width: ${"700px"}) {
    width: 25%;
    height: 100%;
  } */
`

export const Main = styled.div`
    width: 100vw;
    height: 100%;
    display: grid;
    `

export const NavFont = styled(NavLink)`
    color: #F9BB00;
    font-size: 1rem;
    margin: 0 20px;
    height: 80px;
    display: grid;
    align-content: center;
    `

export const HeaderMain = styled.div`
    width: 100%;
    /* border-top: 1px solid #d0d0d0; */
    background: #F9BB00;
    max-height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* @media screen and (min-width: ${"700px"}) {
    width: 25%;
    height: 100%;
  } */
    `

export const NavBack = styled(NavLink)`
    margin-right: 10%;
    align-items: center;
    font-size: 1.5rem;
`

export const MenuTitle = styled.div`
    display: flex;
    text-align: justify;
    align-items: flex-end;
    margin: 0 20px 20px 20px;

    color:#F9BB00;
    font-size: 2em;
    height: 3rem;
`

export const LogoImg = styled.img`
    max-width: 30rem;
    max-height: 30rem;
    `

export const GoodsList = styled.div`
    background: #FEF8E3;
    display: grid;
    margin: 10px 50px;
    border-radius: 25px;
`

export const Toggle = styled.button`
    margin-left: 80%;
    color: #f9bb00;
    justify-self: end;
`

