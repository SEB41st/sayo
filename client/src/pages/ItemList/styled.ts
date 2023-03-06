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
    width: 120px;
    height: 20px;
    border-radius: 5px;
    color: white;
    margin: 10px 0 10px 65%;
    @media screen and (min-width: ${"700px"}) {
    margin: 10px 0 10px 85%;
  }
`

export const GoodsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    grid-template-columns: auto;
    /* justify-content: center; */
    height: 15vh;
    width: 90%;
    height: auto;
    border-radius: 20px;
    margin: 5%;
    gap: 20px;
`
export const Item = styled.div`
    max-height: 10rem;
    max-width: 10rem;
    border-radius: 10px;
    margin: 0px 0px 10px 0px;
    gap: 50px;
    :hover{
        transform: scale(1.2);
    }
    @media screen and (min-width: ${"1280px"}) {
      
    }
`

export const Tag = styled.button`
    background-color: #F9BB00;
    border-radius: 5px;
    width: 60px;
    height: 30px;
    color: white;
    margin: 10px;
    font-size: 12px;
    box-shadow: 0px 0px 3px gray;
`

export const Tags = styled.div`
    display: flex;
    margin: 10px;
`

export const Font = styled.div`
    display: grid;
    margin-left: 15px;
`
