import styled from "styled-components";

export const MypageWrap = styled.div`
  width: 100%;
  height: 100%;

  .Title {
    font-size: 20px;
    margin: 20px;
    margin-left: 40%;
  }
`;

export const MypageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 20.4375rem;
  height: 3.75rem;
  border-radius: 0.625rem;
  margin: 30px;
  .Nickname {
    font-size: 14px;
  }

  @media screen and (min-width: ${"1280px"}) {
    width: 31.25rem;
    height: 18.75rem;
  }
`;

export const ImageDiv = styled.img`
  width: 2.25rem;
  height: 2.25rem;
  background-color: aliceblue;
  border-radius: 100%;
  margin: 0.625rem;

  @media screen and (min-width: ${"1280px"}) {
    width: 8.125rem;
    height: 8.125rem;
    margin: 1.875rem;
  }
`;

export const MypageDiv = styled.div`
  .Name {
    font-size: 0.625rem;
    margin-right: 7.5rem;

    @media screen and (min-width: ${"1280px"}) {
      font-size: 1rem;
      margin-right: 9.375rem;
    }
  }
  .UserName {
    font-size: 0.625rem;

    @media screen and (min-width: ${"1280px"}) {
      font-size: 1rem;
    }
  }
`;

export const ProductListName = styled.div`
  margin-left: 20px;
  font-size: 20px;
`;

export const ProductList = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  font-size: 13px;
  .plusIcon {
    margin-left: 5px;
    color: #f9bb00;
  }
`;

export const Lists = styled.div`
  display: flex;
  width: 90%;
  height: 100%;
  margin: 20px;
  .nullItem{
    font-size: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    color: gray;
  }
`;

export const ChoiceList = styled.div`
  width: 20%;
  height: 90%;
  margin: 10px;
`;
export const Line = styled.div`
  background-color: #d9d9d9;
  height: 2px;
  margin: 50px 0 10px 0;
  width: 100%;
`;

export const ItemImg = styled.div`
  /* width: 50%; */
  margin: 10px;
  display: flex;
  justify-content: center;
  img {
    border-radius: 30px;
    width: 80%;
    @media screen and (max-width: ${"500px"}) {
    width: 140%;
    border-radius: 10px;
    }
  }
  .XButton {
    margin-left: 30px;
  }
`;

export const ItemName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
  @media screen and (max-width: ${"500px"}) {
    align-items: center;
    font-size: 10px;
  }
  span{
  display: flex;
  flex-direction: row;
  }
`;

export const Item = styled.div`
  display: grid;
`;
