import { NavLink } from "react-router-dom";
import styled from "styled-components";


export const StKaKaoLogin = styled.div`
    border-radius:6px;
    width: 300px;
    height: 6vh;
    margin: 10px;
    background: url("/assets/kakaotalk.png") no-repeat center;
    background-size: 25px;
    background-position: 10px;
    background-color: #FFEB00;
    @media only screen and (max-width: ${"700px"}) {
        width: 160px;
	    height: 6vh;
        margin-left: 10px;
    }
    
`;
export const KaKaoBtn = styled(NavLink)`
    cursor: pointer;    
    display:flex;
    justify-content: center;
    align-self: center;
    div{
        margin-left: 2px;
        font-size: 16px;
        font-weight: bold;
        line-height: 55px;
        @media only screen and (max-width: ${"700px"}) {
            /* margin: 10px; */
            font-size: 11px;
            margin-left: 50px;
            line-height: 43px;
        }
    }

`