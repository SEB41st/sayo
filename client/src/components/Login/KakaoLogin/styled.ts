import styled from "styled-components";


export const StKaKaoLogin = styled.div`
    cursor: pointer;
    /* border-radius:10px; */
    /* width: 200px; */
    /* &:hover{
        box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 0px 20px 0 rgba(0, 0, 0, 0.19);
    } */
    .KakaoBtn{
    border: 1px solid transparent;
    width: 160px!important;
    height: 6vh!important;
    margin: 10px 0 0 10px;
    line-height: 1px!important;
    border-radius: 10px!important;
    background: url("/assets/kakaotalk.png") no-repeat center;
    background-size: 25px;
    background-position: 10px;
    font-weight: bold;
    font-size: 11px!important;
    @media only screen and (min-width: ${"700px"}) {
        width: 300px!important;
	    height: 6vh!important;
        /* margin-left: 10px!important; */
        font-size: 16px!important;
    }
    div{
        margin-left:58px;
        @media only screen and (min-width: ${"700px"}) {
        margin-left: 29%;
    }
    }
    }
`;
export const KaKaoBtn = styled.button`
    border: 1px solid transparent;
    width: 160px;
    height: 40px;
    margin: 10px 0 0 10px;
    border-radius: 10px;
    background-color: rgb(255, 235, 0);
    background:l url("/assets/kakaotalk.png") no-repeat left;
    background-size: 30px;
    background-position: 20px;
    font-weight: bold;
    /* .KakaoBtn{
    display: none!important;
    } */

    cursor: pointer;    
    &:hover{
        box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2)
    }
`
// export const KakaoLoginBtn = styled.div`
//     padding: 0;
//     width: 28vh;
//     height: 30%;
//     line-height: 44px;
//     color: #783c00;
//     background-color: #FFEB00;
//     border: 1px solid transparent;
//     border-radius: 3px;
//     font-size: 16px;
//     font-weight: bold;
//     text-align: center;
//     margin: 20px;
//     cursor: pointer;    
//     &:hover{
//         box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2)
//     }
// `

// export const KakaoIcon = styled.div`
// 	width: 30px;
// 	height: 30px;
// 	margin-left: 10px;
// 	background: url("/assets/kakaotalk.png") no-repeat center;
// 	background-size: 30px;
// `