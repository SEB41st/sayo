import styled from "styled-components";

export const FooterWrap = styled.div`
  min-width: 360px;
  min-height: 73px;
  background-color: #eeeeee;

  @media screen and (min-width: ${'80rem'}){
    
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: .625rem ;
  color: #848484;
  font-size: .6875rem;
  ::selection {
    background-color: #f9bb00;
    color: #fff;
  }
@media screen and (min-width: ${'80rem'}){
    font-size: 3.125rem;
  }

  .logo {
    display: flex;
    justify-content: space-between;
    color: #575757;
    font-size: 16px;
  }
  a {
    width: 1rem;
  }
  .creaters + .copyright{
    margin: .1rem;
  }
`;
