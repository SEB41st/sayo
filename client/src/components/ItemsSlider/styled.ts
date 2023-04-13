import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  .item{
    margin: 20px;
    flex-direction: column;
    width: 80vw;
    height: 10vh;
    @media screen and (min-width: ${"600px"}) {
        /* margin-left: 45%; */
    }
    .slick-dots {
    /* position: absolute; */
    bottom: -50px;
    width: 100%;
    /* padding: 0; */
    /* margin-top: 100px; */
    list-style: none;
    } 
    }
  .slick-dots li.slick-active button:before
  {
    opacity: .75;
    color: #F9BB00;
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