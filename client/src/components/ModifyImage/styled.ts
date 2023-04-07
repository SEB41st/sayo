import styled from "styled-components";

export const ModifyImageWrapper = styled.div`
  width: 350px;
  height: 175px;
  margin-top: 30px;
  @media screen and (min-width: ${"1280px"}) {
    width: 350px;
    height: 350px;
    margin: 50px;
    }
  

  input {
    display: none;
  }

  img {
    width:100%;
    height: 80%;
    margin-bottom: 35px;
    cursor: pointer;
    @media screen and (min-width: ${"1280px"}) {
      width: 100%;
    height: 100%;
    margin-bottom: 50px;
    }
  }

  .upLoad {
    width: 70px;
    height: 20px;
    background-color: #f9bb00;
    border-radius: 5px;
    font-size: 10px;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: #ffffff;
      color: #f9bb00;
      border: 1px solid #f9bb00;
    }
    @media screen and (min-width: ${"1280px"}) {
      width: 6.25rem;
      height: 2.1875rem;
      font-size: 15px;
    }
  }
`;
