import styled from "styled-components";

export const MypageWrap = styled.div`
  width: 100%;
  height: 100%;

  .Title{
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
    border-radius: .625rem;
    margin: 30px;
    .Nickname{
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
    width: 90%;
    height: 100%;
    margin: 20px;
    .Name {
    font-size: 20px;
    }
    
  `

export const ChoiceList = styled.div`
    display: flex;
    width: 90%;
    height: 90%;
    margin: 10px;
    
  `
export const Line = styled.div`
    background-color: #D9D9D9;
    height: 2px;
    margin: 50px 0 10px 0 ;
    width: 100%;
`

export const ItemImg = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 10px 10px 10px ;
    img{
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
    .XButton{
      margin-left: 30px;
    }
`

export const ItemName = styled.div`
  display: grid;
  justify-content: center;
  div{
      justify-content: center;
    }
`

export const Item = styled.div`
  display: grid;
`