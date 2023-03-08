import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    position: relative;
    width: 300px;
    height: 80px;
    .item{
        margin-right: 20px;
        flex-direction: column;
        width: 100vh;
        height: 100px;
    }
`
export const Item = styled.div`
    max-height: 80px;
    max-width: 80px;
    border-radius: 10px;
    margin: 10px;
    gap: 30px;
    :hover{
        transform: scale(1.2);
    }
    .itempicture{
        max-height: 80%;
        max-width: 80%;
        :hover{
        transform: scale(1.2);
    }
    }
    @media screen and (min-width: ${"1280px"}) {
      
    }
`