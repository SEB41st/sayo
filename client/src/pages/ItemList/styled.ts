import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Main = styled.div`
    background: white;  
    width: 100%;
    height: 100%;
    display: grid;
    justify-content: center;
    background-color: #f9fafb;
`

export const MainList = styled.div`
    /* display: grid; */
    margin: 20px 0;
`

export const Title = styled.div`
    font-size: 2em;
    font-weight: 800;
    margin: 0 20px;
`

export const WriteButton = styled.button`
    background-color: #F9BB00;
    width: 100px;
    height: 20px;
    font-size: 10px;
    border-radius: 5px;
    color: white;
    margin: 10px 0 10px 65%;
    @media screen and (min-width: ${"700px"}) {
    margin: 10px 0 10px 85%;
    width: 140px;
    height: 40px;
    font-size: 15px;
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
    gap: 40px;
`
export const Item = styled.div`
    height: 6rem;
    width: 6rem;
    margin: 0px 0px 13px 0px;
    border-bottom: 1px solid whitesmoke;
    gap: 50px;
    img{
        border-radius: 30px;
    }
    :hover{
        transform: scale(1.1);
    }
    @media screen and (min-width: ${"700px"}) {
        height: 10rem;
        width: 10rem;
        margin: 20px;
    }
    @media screen and (min-width: ${"1280px"}) {
        height: 13rem;
        width: 13rem;
        margin: 20px;
    }
`

export const Tag = styled.button`
    background-color: #F9BB00;
    border-radius: 5px;
    width: 15%;
    height: 20px;
    color: white;
    margin: 10px;
    font-size: 5px;
    box-shadow: 0px 0px 3px gray;
    cursor: pointer;
    @media screen and (min-width: ${"1000px"}) {
        width: 6%;
        height: 30px;
        font-size: 15px;
    }
`

export const Tags = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 10px;
`
export const Categorys = styled.div`
    display: flex;
    margin: 10px 10px 20px 10px;
`
export const Category = styled.div`
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    width: 100%;
    height: 20px;
    color: black;
    margin: 10px;
    font-size: 12px;
    box-shadow: 0px 0px 3px gray;
    cursor: pointer;
    @media screen and (min-width: ${"1000px"}) {
        width: 8%;
        height: 40px;
        font-size: 16px;
    }
` 

export const Font = styled.div`
    display: grid;
    font-size: 12px;
    @media screen and (min-width: ${"700px"}) {
        font-size: 15px;
    }
`
//  export const EachItem = styled(NavLink)`
//     background-color: aliceblue;
//     border:40px solid black;
// `
export const EachItem = styled.div`
    background-color: white;
    width: 100%;
    height: 105%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    /* :hover{
        transform: scale(1.1);
    } */
`
