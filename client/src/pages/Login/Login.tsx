import axios from "axios";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import * as S from "./styled";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {

  const access_token = new URL(window.location.href).searchParams.get("access_token");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const Authorization = searchParams.get(access_token);
  useEffect(() => {
    if (Authorization) {
      localStorage.setItem("Authorization", Authorization);
    console.log("Authorization")
      // navigate("/");
      // window.location.reload();
    }
  }, []);

  // const handleNaverOauthLogin = () => {

  //   // e.preventDefault();

  // axios
  //     .get(`${process.env.REACT_APP_LOGIN_URL}oauth2/authorization/naver`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res)
  //       localStorage.setItem("accessToken", res.headers.authorization);
  //       localStorage.setItem("refreshToken", res.headers.refreshtoken);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleNaverOauthLogin = () => {
    window.location.href = `${process.env.REACT_APP_LOGIN_URL}oauth2/authorization/naver`;
  };

  const handleGoogleOauthLogin = () => {
    window.location.href = `${process.env.REACT_APP_LOGIN_URL}oauth2/authorization/google`;
  };

  const handleKakaoOauthLogin = () => {
    window.location.href = `${process.env.REACT_APP_LOGIN_URL}oauth2/authorization/kakao`;

  }

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const Authorization = searchParams.get("access_token") || null;
  const Id = searchParams.get("id") || null;

  useEffect(() => {
    if (Authorization) {
      localStorage.setItem("Authorization", Authorization);
      localStorage.setItem("id", Id);
      navigate("/");
      // window.location.reload();
    }
  }, []);

  const handleLogin = () => {
  };

  return (
    <S.Login>
      <S.LoginTitle>
        <span className="title">로그인</span>
        <span className="subtitle">
          로그인 후 다양한 상품들을 구매해보세요 !
        </span>
      </S.LoginTitle>
      <S.JwtLogin>
        <div className="jwtLogin">
          <input
          className="ID"
          placeholder="ID">
          </input> 
          <input
          className="PW"
          placeholder="PW">
          </input>
        <S.JwtLoginBtn
          onClick={handleLogin}>로그인</S.JwtLoginBtn>
        <S.Line/>
        </div>
        
      <S.SocialLogin>
        {/* 구글로그인 */}
        <S.GoogleLoginWrapper onClick={() => handleGoogleOauthLogin()}>
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
      </S.SocialLogin>
      </S.JwtLogin>
    </S.Login>
  );
};

export default Login;
