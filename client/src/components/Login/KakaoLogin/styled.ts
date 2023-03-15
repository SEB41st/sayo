import styled from "styled-components";
import KaKaoLogin from 'react-kakao-login';

export const StKaKaoLogin = styled.div`
    cursor: pointer;
    /* border-radius:10px; */
    /* width: 200px; */
    /* &:hover{
        box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 0px 20px 0 rgba(0, 0, 0, 0.19);
    } */
`;

export const KaKaoBtn = styled(KaKaoLogin)`
    /* padding: 0;
    
    line-height: 44px; */
    /* color: #783c00; */
    /* background-color: #fff; */
    border: 1px solid transparent;
    
    font-size: 5px;
    font-weight: bold;
    /* text-align: end; */
    margin: 20px;
    background: url("/assets/kakaotalk.png") no-repeat center;
    background-size: 30px;
    background-position: 5px;
    .kakaobutton{
        width: 10px;
        height: 30%;
        border-radius: 30px;
    }
    cursor: pointer;    
    &:hover{
        box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2)
    }
`
export const KakaoLoginBtn = styled.div`
    padding: 0;
    width: 28vh;
    height: 30%;
    line-height: 44px;
    color: #783c00;
    background-color: #FFEB00;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin: 20px;
    cursor: pointer;    
    &:hover{
        box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2)
    }
`

// export const KakaoIcon = styled.div`
// 	width: 30px;
// 	height: 30px;
// 	margin-left: 10px;
// 	background: url("/assets/kakaotalk.png") no-repeat center;
// 	background-size: 30px;
// `