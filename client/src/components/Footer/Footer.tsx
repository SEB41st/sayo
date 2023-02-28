import * as S from "./styled";

const Footer = () => {
  return (
    <S.FooterWrap>
      <S.FooterContainer>
        <span className="logo">
          SAYO
          <a href="https://github.com/SEB41st/sayo">
            <img className="img" src="/assets/Github.png" alt=""></img>
          </a>
        </span>

        <div className="creaters">
          BACKEND : 강신찬, 김희진, 박금비
          <br />
          FRONTEND : 강성심, 장한나
        </div>
        <div className="copyright">
          <span>COPYRIGHT SAYO.ALL RIGHT RESERVED</span>
        </div>
      </S.FooterContainer>
    </S.FooterWrap>
  );
};

export default Footer;
