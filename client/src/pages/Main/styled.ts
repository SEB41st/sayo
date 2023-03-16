import styled from "styled-components";

export const Main = styled.div`
    background: white;  
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const MainList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px 0;
`

export const Title = styled.div`
    font-size: 1.5em;
    font-weight: 800;
    margin: 0 30px;
    display: flex;
    @media screen and (min-width: ${"700px"}) {
    font-size: 2em;
    font-weight: 800;
    }
`

export const WriteButton = styled.button`
    background-color: #F9BB00;
    border-radius: 20px;
    color: white;
    width: 120px;
    margin-left: 25%;
    cursor: pointer;
`

export const Line = styled.div`
    height: 1.5px;
    margin: -10px 0 10px 0 ;
    width: 100%;
    background-color: #F9BB00;
`

export const Menus = styled.div`
    display: grid;
    margin: 20px 0 ;
    width: 90%;
    .font{
        justify-self: end;
        font-size: 13px;
    }
    .plusIcon{
        margin-left: 5px;
        color: #F9BB00;
    }
    @media screen and (min-width: ${"700px"}) {
      display: grid;
      
    }
`

export const GoodsList = styled.div`
    display: flex;
    height: 20vh;
    width: 90%;
    background-color: #FEF8E3;
    border-radius: 20px;
    margin: 10px 0 0 30px ;
    justify-content: center;
`

export const Item = styled.div`
    max-height: 80%;
    max-width: 80%;
    border-radius: 10px;
    margin: 10px;
    gap: 30px;
    :hover{
        transform: scale(1.2);
    }
    .itempicture{
        max-height: 80%;
        max-width: 80%;
    }
    @media screen and (min-width: ${"1280px"}) {
      
    }
`

export const LogoImg =styled.img`
    /* width: 100%;
    height: 20vh; */
    border-radius: 0 0 20px 20px;
    justify-content: center;
    
    /* @media screen and (min-width: ${"1280px"}) {
    width: 100%;
    height: 100%;
  } */
`