import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';


const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    font-family: "Noto Sans KR", sans-serif;
  }
  body{
    background-color: #ffffff;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 62.5%;
    line-height: 1.285;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
  }
  h1, h2, h3, h4, h5, h6{
    font-family: "Noto Sans KR", sans-serif;
  }
  ol, ul, li {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }` 
;

export default GlobalStyle;