import { useEffect, useRef } from "react";
import * as S from "./styled";

const Login = () => {
  const handleNaverOauthLogin = () => {
    window.location.href = `${process.env.REACT_APP_LOGIN_URL}/oauth2/authorization/naver`;
  };

  const handleGoogleOauthLogin = () => {
    window.location.href = `${process.env.REACT_APP_LOGIN_URL}/oauth2/authorization/google`;
  };

  const handleKakaoOauthLogin = () => {
    window.location.href = `${process.env.REACT_APP_LOGIN_URL}/oauth2/authorization/kakao`;
  }
  return (
    <S.Login>
      <S.LoginTitle>
        <span className="title">로그인</span>
        <span className="subtitle">
          로그인 후 다양한 상품들을 구매해보세요 !
        </span>
      </S.LoginTitle>
      <div className="buttons">
        {/* 구글로그인 */}
        <S.GoogleLoginWrapper onClick={() => handleGoogleOauthLogin()}>
          {/* <button className="lin-google" onClick={() => googleLoginHandler()}> */}
          <div className="social_login_image_box">
            <img className="logo" src="/assets/google.png" alt="google_login" />
          </div>
          <div className="social_login_text_box">구글로 로그인하기</div>
          <div className="social_login_blank_box"> </div>
        </S.GoogleLoginWrapper>

        {/* 네이버 로그인 */}
        <S.NaverLoginBtn onClick={handleNaverOauthLogin}>
          <S.NaverIcon />
          <S.NaverLoginTitle>네이버로 로그인하기</S.NaverLoginTitle>
        </S.NaverLoginBtn>

        {/* 카카오로그인 */}
        <S.StKaKaoLogin onClick={handleKakaoOauthLogin}>
          <div className="kakaoTitle">카카오로 로그인하기</div>
        </S.StKaKaoLogin>
      </div>
    </S.Login>
  );
};

export default Login;
