import styled from "styled-components";
import { ButtonDiv } from "../../pages/MyInfo/styled"; 

export const PaymentWrap = styled.div`
  width: 90%;
  height: 100vh;
  margin: 0.625rem 1.25rem;
`;

export const PaymentContainer = styled.div`
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

export const ProductDiv = styled.div`
  width: 90%;
  height: 6.875rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #f9bb00;
  border-radius: 10px;
  margin-bottom: 1%;

  @media screen and (min-width: ${"1280px"}) {
    max-width: 60%;
    height: 12.5rem;
  }
`;
export const ProductInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60%;
  margin: 10px;

  @media screen and (min-width: ${"1280px"}) {
    /* max-width: 60%; */
    /* height: 1%; */
    margin: 20px;
  }
`;
export const ProductInfoDiv2 = styled.div`
  margin-left: 10px;
  width: 60%;

  @media screen and (min-width: ${"1280px"}) {
    width: 60%;
  }
`;

export const CheckboxDiv = styled.div``;

export const CheckboxInput = styled.input`
  width: 50%;
  cursor: pointer;

  @media screen and (min-width: ${"1280px"}) {
    width: 100%;
  }
`;

export const ImageDiv = styled.div`
  min-width: 30%;
  max-width: 50%;
  height: 100%;
  background-color: #fffdfd;
  border: 1px solid #d2cdcd;
  /* margin: 0 10px; */
  .itemPicture {
    height: 100%;

    @media screen and (min-width: ${"1280px"}) {
      width: 100%;
      height: 350%;
    }
  }

  @media screen and (min-width: ${"1280px"}) {
    width: 30%;
    height: 30%;
  }
`;

export const CloseBox = styled.div`
  cursor: pointer;
  /* margin: 1% 0 0 40%; */
`;

export const ProductInfoDiv3 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  margin: 0 8%;
  margin-bottom: 10px;
  cursor: pointer;

  @media screen and (min-width: ${"1280px"}) {
    width: 85%;
    height: auto;
  }

  .Sum {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 20%;
    height: 90%;
    border: 1px solid #f9bb00;
  }
`;

export const CountDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  gap: 10%;
  /* margin-left: 8%; */
`;

export const TotalPriceDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  height: 2.5rem;
  margin-top: 50%;
  background-color: #fcf6e2;
  border-radius: 10px;

  @media screen and (min-width: ${"1280px"}) {
    max-width: 60%;
    height: 5rem;
    margin-top: 20%;
  }
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
