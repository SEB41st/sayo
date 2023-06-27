import styled from "styled-components";

export const Container = styled.div`
  display: flex;


  .item{
    margin: 20px;
    flex-direction: column;
    width: 80vw;
    height: 13vh;
    @media screen and (min-width: ${"600px"}) {
    }
    .slick-dots {
    bottom: -50px;
    width: 100%;
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
    gap: 20px;
    img{
      border-radius: 20px;
      width: 100%;
      height: 100%;
      :hover{
          transform: scale(1.1);
      }
    }
    .itempicture{
        max-height: 100%;
        max-width: 100%;
        margin: 20px;
    }
    div{
      font-size: 13px;
      width: 100%;
      display: flex;
      justify-content: center;
      margin-left: 15%;
      font-weight: 700;
      color: #706868;
    }
    @media screen and (min-width: ${"1280px"}) {
      height: 6rem;
      margin-bottom: 30px;
    }


`