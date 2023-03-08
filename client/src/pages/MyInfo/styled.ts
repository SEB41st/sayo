import styled from "styled-components";

export const MypageWrap = styled.div`
  width: 100vw;
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
  height: 30%;
  background-color: #fef8e3;
  border-radius: .625rem;
  margin: 30px;

  @media screen and (min-width: ${"1280px"}) {
    width: 31.25rem;
    height: 50%;
  }
`;

export const ImageDiv = styled.div`
  width: 30%;
  height: 30%;
  background-color: #ffffff;
  border-radius: 100%;
  margin: .625rem;

  @media screen and (min-width: ${"1280px"}) {
    width: 15%;
    height: 50%;

    margin: 1.875rem;
  }
`;

export const MypageDiv = styled.div`
  .Name {
    font-size: 1.25rem;
    margin-right: 7.5rem;


    @media screen and (min-width: ${"1280px"}) {
      margin-right: 9.375rem;
    }
  }
  .UserName {
    font-size: 1.25rem;

    /* @media screen and (min-width: ${"1280px"}) {
      font-size: 1rem;
    } */
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
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