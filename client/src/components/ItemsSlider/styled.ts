import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    /* position: relative; */
    justify-content: center;
    
    width: 90%;
    .item{
        margin: 20px;
        flex-direction: column;
        width: 80vw;
        height: 10vh;
    }
    .dots_custom {
    /* display: grid; */
    margin-left: 15%;
    @media screen and (min-width: ${"600px"}) {
      margin-left: 45%;
    }
    .dots_custom ul {
    display: flex;
    margin: 0 6px;
    padding: 0;
  }
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
    display: grid;
    justify-content: center;
    cursor: pointer;
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
    height: 4rem;
    max-width: 50%;
    border-radius: 10px;
    margin: -10px 10px 10px 10px;
    gap: 30px;
    /* margin-bottom: 30px; */
    img{
      border-radius: 20px;
      width: 100%;
      height: 100%;
    }
    :hover{
        transform: scale(1.1);
    }
    .itempicture{
        max-height: 100%;
        max-width: 100%;
        margin: 20px;
    }
    @media screen and (min-width: ${"1280px"}) {
      height: 6rem;
      margin-bottom: 30px;
    }


`