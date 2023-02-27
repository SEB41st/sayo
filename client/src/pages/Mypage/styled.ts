import styled from "styled-components";

export const MypageWrap = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  `;

export const MypageContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  min-width: 20.4375rem;
  min-height: 9.75rem;
  background-color: #fef8e3;
  border-radius: .625rem;
  margin: 30px;
  
  .Title{
    font-size: 20px;
  }
  @media screen and (min-width: ${"1280px"}) {
    width: 31.25rem;
    height: 18.75rem;
  }
`;

export const ImageDiv = styled.div`
  width: 4.25rem;
  height: 4.25rem;
  background-color: #ffffff;
  border-radius: 100%;
  margin: .625rem;

  @media screen and (min-width: ${"1280px"}) {
    width: 8.125rem;
    height: 8.125rem;
    margin: 1.875rem;
  }
`;

export const MypageDiv = styled.div`
  .Name {
    font-size: .625rem;
    margin-right: 7.5rem;

    @media screen and (min-width: ${"1280px"}) {
      font-size: 1rem;
      margin-right: 9.375rem;
    }
  }
  .UserName {
    font-size: .625rem;

    @media screen and (min-width: ${"1280px"}) {
      font-size: 1rem;
    }
  }
`;


export const Lists = styled.div`
    width: 100%;
    height: 100%;

  `

  export const ChoiceList = styled.div`
    display: flex;
    width: 30%;
    height: 70%;
    background-color: gray;

  `
