import styled from "styled-components";

// button {
//     cursor: pointer;
//   }
  
  export const CalenderContainer = styled.div`
    width: 30%;
    height: 20%;
    margin: auto;
    padding: 20px 20px;
    position: absolute; 
    left: 50%;
    top: 20%;
    /* transform: translate(-20%, -20%); */
    @media screen and (max-width: ${"700px"}) {
    width: 50%;
    /* height: 100%; */
    left: 40%;
    top: 20%;
  }
    .title {
     display: flex;
    }
    .calender { 
      width: 100%;
      /* height: 30%; */
      font-size: 5px;
      .dot {
        height: 0.5rem;
        width: 0.5rem;
        background-color: #f87171;
        border-radius: 50%;
        display: flex;
        margin-left: 1px;
}}
  `