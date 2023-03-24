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
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const NaverIdLogin = styled.div`
  display: none;
`;

export const NaverLoginBtn = styled.button`
  display: flex;
  align-items: center;
  width: 300px;
  height: 6vh;
  background-color: #03c75a;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 10px;
  @media only screen and (max-width: ${"700px"}) {
    width: 160px;
    height: 6vh;
    margin-left: 10px;
  }
`;

// 로그인 버튼 사용가이드 링크를 들어가면 이미지를 받아 이렇게 적용이 가능하다 !
export const NaverIcon = styled.div`
  width: 30px;
  height: 30px;
  margin-left: 10px;
  background: url("/assets/NaverIcon.png") no-repeat center;
  background-size: 30px;
  background-position: -7px;
`;

export const NaverLoginTitle = styled.span`
  margin-left: 14%;
  color: ${({ theme }) => theme.White};
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  @media only screen and (max-width: ${"700px"}) {
    font-size: 11px;
    margin-left: 10%;
  }
`;

export const LoginTitle = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    margin: 10px;
    font-size: 30px;
    justify-content: center;
    @media only screen and (max-width: ${"400px"}) {
      margin: 10px;
      font-size: 15px;
    }
  }
  .subtitle {
    margin: 10px;
    font-size: 20px;
    @media only screen and (max-width: ${"400px"}) {
      margin: 10px;
      font-size: 10px;
    }
  }
`;
export const Login = styled.div`
  margin: 20%;
  width: 60%;
  padding: 5%;
  background-color: #f9fafb;
  border-radius: 10px;
  display: grid;
  .buttons {
    display: grid;
    justify-content: center;
  }
`;

export const GoogleLoginWrapper = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
  width: 300px;
  height: 6vh;
  margin: 10px 0 10px 10px;
  background-color: #ffffff;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  .logo {
    width: 30px;
    height: 30px;
    margin: 0 10px;
  }
  .social_login_text_box {
    margin-left: 12%;
    @media only screen and (max-width: ${"700px"}) {
      margin-left: 10px;
    }
  }
  @media only screen and (max-width: ${"700px"}) {
    width: 160px;
    height: 6vh;
    margin-left: 10px;
    font-size: 11px;
  }
`;

export const StKaKaoLogin = styled.div`
  border-radius: 6px;
  width: 300px;
  height: 6vh;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: url("/assets/kakaotalk.png") no-repeat center;
  background-size: 25px;
  background-position: 10px;
  background-color: #ffeb00;
  cursor: pointer;
  @media only screen and (max-width: ${"700px"}) {
    width: 160px;
    height: 6vh;
    margin-left: 10px;
  }

  .kakaoTitle {
    font-size: 16px;
    font-weight: bold;
    margin-left: 30%;
    @media only screen and (max-width: ${"700px"}) {
      font-size: 11px;
      margin-left: 60px;
    }
  }
`;

