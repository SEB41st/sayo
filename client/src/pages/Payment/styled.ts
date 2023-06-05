import styled from "styled-components";
import { ButtonDiv } from "../Detail/styled";

export const CartWrap = styled.div`
  width: 90%;
  height: 100%;
  margin: 0.625rem 1.25rem;
`;

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #000000;
  font-size: 13px;

  @media screen and (min-width: ${"1280px"}) {
    font-size: 1rem;
  }

  .Cart {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 0.625rem;

    @media screen and (min-width: ${"1280px"}) {
      font-size: 1.25rem;
    }
  }
`;
export const PaymentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  `;
export const OrderDiv = styled.div`
  width: 90%;
  height: auto;
  font-weight: 600;
  font-size: 17px;
  display: flex;
  flex-direction: column;
  border: 1px solid #f9bb00;
  border-radius: 10px;
  margin-bottom: 1%;
  padding: 1%;
  div{
    margin: 5px;
  }
  @media screen and (min-width: ${"1280px"}) {
    max-width: 60%;
    height: auto;
  }
`;

export const OrderInfoDiv = styled.div`
  display: grid;
  width: 90%;
  padding: 1% 5%;
  font-weight:400;
  font-size: 13px;
  /* flex-direction: column; */
  @media screen and (min-width: ${"1280px"}) {

  }
  .orderDetail{
    margin-bottom: 20px;
  }
`;

export const ProductDiv = styled.div`
  /* width: 20rem; */
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #f9bb00;
  border-radius: 10px;
  margin-top: 10px;

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
  .Name {
    margin: 10px;
  }
  .ProductFee {
    margin: 10px;
  }
  .Price{
    margin: 10px;
  }

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

export const ImageDiv = styled.img`
  width: 150px;
  height: 110px;
  background-color: #fffdfd;
  border: 1px solid #d2cdcd;
  /* margin: 0 10px; */

  @media screen and (min-width: ${"1080px"}) {
    width: 200px;
    height: 150px;
    font-size: 20px;
  }
`;


export const TotalDiv = styled.div`
  margin-top: 5%;
  font-size: 20px;
  font-weight: bold;

  @media screen and (min-width: ${"1280px"}) {
    font-size: 20px;
  }
`;

export const TotalPriceDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 5.5rem;
  margin-top: 5%;
  padding: 5%;
  background-color: #fcf6e2;
  border-radius: 10px;

  @media screen and (min-width: ${"1280px"}) {
    max-width: 60%;
    height: 7rem;
    margin-top: 2%;
    padding: 5% 5%;
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
  margin-bottom: 2%;
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
export const Fail = styled.div`
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
export const FailText = styled.div`
  font-size: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Shabnam", Tahoma, sans-serif;
  /* color: #000; */
  color: #f9bb00;
  direction: rtl;
  span{
    margin: 10px 0;
  }
  p{
    margin: 10px 0;
    font-size: 20px;
    color: black;
  }
  a{
    padding: 20px 0;
    margin-top: 20%;
    background-color: #f9bb00;
    color: white;
    border-radius: 10px;
    font-size: large;
  }
`