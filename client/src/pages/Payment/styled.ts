import styled from "styled-components";
import { ButtonDiv } from "../Detail/styled";

export const CartWrap = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0.625rem 1.25rem;
`;

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #000000;
  font-size: 10px;

  @media screen and (min-width: ${"1280px"}) {
    font-size: 1rem;
  }

  .Cart {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 0.625rem;

    @media screen and (min-width: ${"1280px"}) {
      font-size: 1.25rem;
    }
  }
`;

export const OrderDiv = styled.div`
  max-width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #f9bb00;
  border-radius: 10px;
  margin-bottom: 1%;
  padding: 1%;

  @media screen and (min-width: ${"1280px"}) {
    max-width: 60%;
    height: auto;
  }
`;

export const OrderInfoDiv = styled.div`
  display: flex;
  width: 90%;
  padding: 1% 5%;
  /* flex-direction: column; */
  @media screen and (min-width: ${"1280px"}) {

  }
`;

export const ProductDiv = styled.div`
  /* width: 20rem; */
  max-width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #f9bb00;
  border-radius: 10px;

  @media screen and (min-width: ${"1280px"}) {
    max-width: 60%;
    height: auto;
  }
`;
export const ProductInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 50px;
  margin: 10px;

  @media screen and (min-width: ${"1280px"}) {
    /* max-width: 60%; */
    height: 150px;
    margin: 20px;
  }
`;
export const ProductInfoDiv2 = styled.div`
  width: 60%;
  /* margin: 10px; */

  @media screen and (min-width: ${"1280px"}) {
    width: 60%;
  }
`;



export const CheckboxInput = styled.input`
  width: 50%;

  @media screen and (min-width: ${"1280px"}) {
    width: 100%;
  }
`;

export const ImageDiv = styled.div`
  min-width: 30%;
  min-height: 100%;
  background-color: #fffdfd;
  border: 1px solid #d2cdcd;
  /* margin: 0 10px; */

  @media screen and (min-width: ${"1280px"}) {
    /* width: 30%;
    height: 90%; */
  }
`;


export const TotalDiv = styled.div`
  margin-top: 5%;
  font-size: 14px;
  font-weight: bold;

  @media screen and (min-width: ${"1280px"}) {
    font-size: 20px;
  }
`;

export const TotalPriceDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  max-height: 1.5rem;
  margin-top: 1%;
  padding: 5%;
  background-color: #fcf6e2;
  border-radius: 10px;

  @media screen and (min-width: ${"1280px"}) {
    max-width: 60%;
    height: 5rem;
    padding: 4% 5%;
  }
`;

export const TotalPriceDiv2 = styled.div`
  display: flex;
  width: 100%;
`;

export const TotalPriceDiv3 = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 50%;
  margin-bottom: 1%;
`;

export const ButtonDiv2 = styled(ButtonDiv)`
  width: 90%;
  height: 2.5rem;
  align-items: flex-end;
  justify-content: flex-end;

  @media screen and (min-width: ${"1280px"}) {
    max-width: 60%;
    height: 5rem;
  }
`;
