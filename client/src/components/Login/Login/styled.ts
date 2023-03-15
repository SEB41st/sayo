import styled from "styled-components";

export const NaverBtn = styled.div`
    padding: 0;
    width: 190px;
    height: 44px;
    line-height: 44px;
    color: #783c00;
    /* background-color: #FFEB00; */
    /* border: 1px solid transparent; */
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

export const NaverIdLogin = styled.div`
	display: none;
`

export const NaverLoginBtn = styled.button`
	display: flex;
	align-items: center;
	width: 23vw;
	height: 7vh;
	background-color: #03c75a;
	border-radius: 6px;
    cursor: pointer;
    margin-left: 20px;
`

// 로그인 버튼 사용가이드 링크를 들어가면 이미지를 받아 이렇게 적용이 가능하다 ! 
export const NaverIcon = styled.div`
	width: 30px;
	height: 30px;
	margin-left: 10px;
	background: url("/assets/NaverIcon.png") no-repeat center;
	background-size: 30px;
`

export const NaverLoginTitle = styled.span`
	margin-left: 4px;
	color: ${({ theme }) => theme.White};
	font-weight: bold;
	font-size: 16px;
	line-height: 24px;
`

export const LoginTitle = styled.div`
    margin: 20px;
    display: grid;
    justify-content: center;
    .title{
        margin: 10px;
        font-size: 30px;
        @media only screen and (max-width: ${"400px"}) {
            margin: 10px;
            font-size: 15px;
        }
    }
    .subtitle{
        margin: 10px;
        font-size: 20px;
        @media only screen and (max-width: ${"400px"}) {
            margin: 10px;
            font-size: 10px;
        }
    }
`
export const Login = styled.div`
    margin: 20%;
    padding: 5%;
    background-color: aliceblue;
    border-radius: 10px;
`