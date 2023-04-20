import styled from "styled-components";

export const DetailWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 500px;
  margin-top: 20px;
  border-bottom: 1px solid #f9bb00;

  @media screen and (min-width: ${"1280px"}) {
    width: 100%;
    height: 100%;
  }
`;

export const ImageDiv = styled.div`
  width: 165px;
  height: 250px;
  border-radius: 20px;

  @media screen and (min-width: ${"1280px"}) {
    width: 500px;
    height: 400px;
  }

  .ProductImg {
    width: 120px;
    height: 155px;
    margin: 0 15px;
    background-color: #fffdfd;
    /* border: 0.1008px solid #d2cdcd; */
    img{
    border-radius: 10px;
    }

    @media screen and (min-width: ${"1280px"}) {
      width: 250px;
      height: 300px;
    }
  }
`;

export const ProductInfoDiv = styled.div`
  width: 196px;
  height: 227px;
  font-size: 11px;

  @media screen and (min-width: ${"1280px"}) {
    width: 500px;
    height: 330px;
    font-size: 16px;
  }

  .Product{
    display: flex;
  }

  .ProductName {
    font-size: 20px;
    margin-bottom: 10px;

    @media screen and (min-width: ${"1280px"}) {
      font-size: 25px;
      margin-bottom: 20px;
    }
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  /* width: 100%; */
  margin-top: 3rem;

  @media screen and (min-width: ${"1280px"}) {
    width: 500px;
    margin-bottom: 3.125rem;
  }
`;

export const CartBtn = styled.button`
  width: 4.0625rem;
  height: 1.25rem;
  color: #000000;
  font-size: 10px;
  background-color: #ffffff;
  border: 0.0625rem solid #f9bb00;
  border-radius: 0.3125rem;
  cursor: pointer;

  @media screen and (min-width: ${"1280px"}) {
    width: 100px;
    height: 35px;
    font-size: 15px;
  }
`;

export const BuyBtn = styled(CartBtn)`
  width: 4.0625rem;
  height: 1.25rem;
  color: #ffffff;
  font-size: 10px;
  background-color: #f9bb00;
  border-radius: 0.3125rem;
  cursor: pointer;

  @media screen and (min-width: ${"1280px"}) {
    width: 100px;
    height: 35px;
    font-size: 15px;
  }
`;

export const DetailDiv = styled.div`
  width: 100%;
  height: 100%;
  font-size: 13px;

  /* @media screen and (min-width: ${"1280px"}) {
    width: 1000px;
    height: 500px;
    font-size: 20px;
  } */

  .DetailInfo {
    margin: 20px;
    font-weight: 800;
    font-size: 15px;

    @media screen and (min-width: ${"1280px"}) {
    }
  }

  .DetailInfoTxt {
    font-size: 11px;
    margin-left: 30px;

    @media screen and (min-width: ${"1280px"}) {
      font-size: 15px;
    }
  }

  .DetailLocation {
    margin: 20px;
    font-weight: 800;
    font-size: 15px;
  }
`;

export const StaticMap = styled.div`
  width:100%;
  height:100%;
  border-radius: 10px;
  margin-bottom:10px;
`
export const goodsDetail = styled.div`
  width: 80%;
  font-size: 15px;
  margin-left: 10px;
  .ProductPrice{
    margin-bottom: 10px;
  }
`