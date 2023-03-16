import styled from "styled-components";

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

  .logo{
    width: 30px;
    height: 30px;
    margin: 0 10px;
  }
  .social_login_text_box{
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
