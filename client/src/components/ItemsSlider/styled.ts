import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    position: relative;
    width: 90%;
    .item{
        margin: 20px;
        flex-direction: column;
        width: 80vw;
        height: 10vh;
    }
    .dots_custom {
    display: flex;
    margin-left: 20%;
  }
  
  .dots_custom li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
    margin: 0 6px;
    padding: 0;
  }
  
  .dots_custom li button {
    border: none;
    background: #d1d1d1;
    color: transparent;
    cursor: pointer;
    display: block;
    height: 8px;
    width: 8px;
    border-radius: 100%;
    padding: 0;
  }
  
  .dots_custom li.slick-active button {
    background-color: #F9BB00;
  }
`
export const Item = styled.div`
    height: 6rem;
    max-width: 50%;
    border-radius: 10px;
    margin: 10px;
    gap: 30px;
    margin-bottom: 30px;
    img{
      border-radius: 20px;
    }
    /* div{
      margin-left: 25px;
    } */
    :hover{
        transform: scale(1.1);
    }
    .itempicture{
        max-height: 100%;
        max-width: 100%;
        margin: 20px;
        
        :hover{
        transform: scale(1.2);
    }

    }
    @media screen and (min-width: ${"1280px"}) {
      
    }


`