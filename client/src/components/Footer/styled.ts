import styled from "styled-components";

export const FooterWrap = styled.div`
  min-width: 360px;
  min-height: 73px;
  background-color: #eeeeee;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: .625rem;
  color: #848484;
  font-size: .6875rem;

  @media screen and (min-width: ${"1280px"}) {
    font-size: 18px;
  }

  .logo {
    display: flex;
    justify-content: space-between;
    color: #575757;
    font-size: 16px;

    @media screen and (min-width: ${"1280px"}) {
      margin: 10px;
      font-size: 30px;
    }
  }

  .img {
    width: 1rem;

    @media screen and (min-width: ${"1280px"}) {
      width: 3rem;
    }
  }
  .creaters {
    margin: .1rem;

    @media screen and (min-width: ${"1280px"}) {
      margin: .625rem;
    }
  }

  .copyright {
    margin: .1rem;

    @media screen and (min-width: ${"1280px"}) {
      margin: .625rem;
    }
  }
`;
