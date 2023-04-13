import styled from "styled-components";


export const MypageWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* min-width: 20.4375rem;
  min-height: 9.75rem; */
  min-width: 90%;
  height: 50%;
  background-color: #fef8e3;
  border-radius: .625rem;
  margin: 30px;

  @media screen and (min-width: ${"1080px"}) {
    width: 31.25rem;
    height: 80vh;
  }
`;

export const ImageDiv = styled.img`
  width: 30%;
  height: 30%;
  background-color: #ffffff;
  border-radius: 100%;
  margin: .625rem;

  @media screen and (min-width: ${"700px"}) {
    width: 15%;
    height: 50%;
    margin: 1.875rem;
  }
`;

export const MypageDiv = styled.div`
  margin: 15px;
  display: flex;
  justify-content: left;
  width: 80%;
  button{
    justify-content: left;
  }
  .Name {
    font-size: 1rem;
    width: 30%;
    display: flex;
    padding: 0;
    @media screen and (min-width: ${"700px"}) {
      font-size: 1.25rem;
    }
  }
  .UserName {
    font-size: 1rem;

    /* @media screen and (min-width: ${"1280px"}) {
      font-size: 1rem;
    } */
  }
  .address{
    font-size: 10px;
    @media screen and (min-width: ${"1280px"}) {
      font-size: 1rem;
    }
  }
  
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10%;
  min-width: 20.4375rem;
  margin-bottom: 1.875rem;

  @media screen and (min-width: ${"1280px"}) {
    width: 31.25rem;
    margin-bottom: 3.125rem;
  }
`;

export const LogoutBtn = styled.button`
  width: 4.0625rem;
  height: 1.25rem;
  color: #000000;
  font-size: 13px;
  background-color: #ffffff;
  border: .0625rem solid #f9bb00;
  border-radius: .3125rem;
  cursor: pointer;

  @media screen and (min-width: ${"1280px"}) {
    width: 100px;
    height: 35px;
    font-size: 15px;
  }
`;
export const PostCode = styled.div`
  margin: 15px;
  /* display: flex; */
  width: 80%;
  @media screen and (max-width: ${"1280px"}) {
    width: 90%;
    }
  .Name {
    font-size: 1rem;
    width: 40%;
    @media screen and (min-width: ${"700px"}) {
      font-size: 1.25rem;
    }
  }
  .UserName {
    font-size: 1rem;

    /* @media screen and (min-width: ${"1280px"}) {
      font-size: 1rem;
    } */
  }
  .address{
    font-size: 10px;
    @media screen and (min-width: ${"1280px"}) {
      font-size: 1rem;
    }
  }
  button{
    width: 100%;
  }
  .input{
    margin-left: 20px;
  }
  .PostCodeStyle{
    display: block;
    /* position: relative; */
    /* top: -20%;
    left: -20px; */
    width: 100%;
    height: 100%;
    padding: 7px;
  }
`;