import styled from "styled-components";

export const Main = styled.div`
    background: white;  
    width: 100%;
    height: 100%;
    display: grid;
    justify-content: center;
`

export const MainList = styled.div`
    display: grid;
    margin: 20px 0;
`

export const Title = styled.div`
    font-size: 2em;
    font-weight: 800;
    margin: 0 20px;
`

export const WriteButton = styled.button`
    background-color: #F9BB00;
    border-radius: 20px;
    color: white;
    margin-left: 5%;

`

export const Line = styled.div`
    height: 1.5px;
    margin: -10px 0 10px 0 ;
    width: 100%;
    background-color: #F9BB00;
`

export const Menus = styled.div`
    display: grid;
    margin: 20px;
    .font{
        justify-self: end;
        font-size: 13px;
    }
    .plusIcon{
        margin-left: 5px;
        color: #F9BB00;
    }
`

export const GoodsList = styled.div`
    display: flex;
    height: 15vh;
    width: 100%;
    background-color: #FEF8E3;
    border-radius: 20px;
    margin-top: 10px;
`

export const SearchBar = styled.div`
    margin-bottom: 20px;
    .Search{
        border: 1px solid #F9BB00;
        border-radius: 10px;
        width: 90%;
        height: 150%;
    }
`

export const Item = styled.img`
    max-height: 80%;
    max-width: 80%;
    background-color: gainsboro;
    border-radius: 10px;
    margin: 10px;
    :hover{
        transform: scale(1.2);
    }
    @media screen and (min-width: ${"1280px"}) {
      
    }
`

export const LogoImg =styled.img`
    width: 100%;
    height: 20vh;
    border-radius: 0 0 20px 20px;
    justify-content: center;
    
    /* @media screen and (min-width: ${"1280px"}) {
    width: 100%;
    height: 100%;
  } */
`