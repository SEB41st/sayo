import styled from "styled-components"

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
export const Font = styled.div`
    display: grid;
    font-size: 12px;
    @media screen and (min-width: ${"700px"}) {
        font-size: 15px;
    }
`

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

export const EndImg = styled.div`
    background-color: 	rgba(0,0,0,20%);
    border-radius: 20px;
    width: 25%;
    height: 25%;
    position: absolute;
    font-size: 20px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(0, 0);
`