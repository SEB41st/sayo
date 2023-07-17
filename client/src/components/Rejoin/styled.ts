import styled from "styled-components";
/* 404 Error Page */
export const Error = styled.div`
  /* background: #f9bb00; */
  position: fixed;
  left: 0px;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 1.5em;
  z-index: 9999;
  background-color: #f9f9f9;
`;
export const ErrorText = styled.div`
  font-size: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Shabnam", Tahoma, sans-serif;
  /* color: #000; */
  color: #f9bb00;
  direction: rtl;
  img {
    margin: 85px auto 20px;
    height: 342px;
    @media only screen and (max-width: ${"500px"}) {
      height: 200px;
    }
  }
  span {
    position: relative;
    font-size: 3.3em;
    font-weight: 900;
    margin-bottom: 50px;
    @media only screen and (max-width: ${"500px"}) {
      font-size: 1.5em;
      font-weight: 800;
    }
  }
  p {
    &.p-a {
      font-size: 25px;
      margin: 30px 0 15px 0;
      @media only screen and (max-width: ${"500px"}) {
        font-size: 13px;
      }
    }
    &.p-b {
      font-size: 20px;
      @media only screen and (max-width: ${"500px"}) {
        font-size: 10px;
      }
    }
  }
  .back {
    // Homepage bButton
    background: #fff;
    color: #000;
    font-size: 25px;
    text-decoration: none;
    margin: 2em auto 0;
    padding: 0.7em 2em;
    border-radius: 500px;
    box-shadow: 0 20px 70px 4px rgba(0, 0, 0, 0.1), inset 7px 33px 0 0px #f9bb00;
    font-weight: 900;
    transition: all 300ms ease;
    &:hover {
      transform: translateY(-13px);
      box-shadow: 0 35px 90px 4px rgba(0, 0, 0, 0.3), inset 0px 0 0 3px #000;
    }
    @media only screen and (max-width: ${"350px"}) {
      font-size: 20px;
      box-shadow: 0 20px 70px 4px rgba(0, 0, 0, 0.1),
        inset 7px 25px 0 0px #f9bb00;
    }
  }
`;
