import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import * as S from "./styled";


const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [info, setInfo] = useState<{email:string, password:string}>({email:"",password:""})



  const accessToken = searchParams.get("access_token") || null;
  const refreshToken = searchParams.get("refresh_token") || null;
  const userId = searchParams.get("id") || null;

  console.log(searchParams.get("refresh_token"))

  useEffect(() => {
    if (accessToken && userId) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", userId);
      // navigate("/");
      alert("로그인 성공")
    }
  }, []);

 
  const handleNaverOauthLogin = () => {
    window.location.href = `${process.env.REACT_APP_LOGIN_URL}oauth2/authorization/naver`;
  };

  const handleGoogleOauthLogin = () => {
    window.location.href = `${process.env.REACT_APP_LOGIN_URL}oauth2/authorization/google`;
  };

  const handleKakaoOauthLogin = () => {
    window.location.href = `${process.env.REACT_APP_LOGIN_URL}oauth2/authorization/kakao`;
  }

  const handleLogin = async (e:any) => {
    const jsonData = JSON.stringify(info);
    console.log(info)

    if (info.email === "" || info.password === "") {
      alert("이메일이나 패스워드를 확인하세요");
      return;
    }

    await axios
      .post("http://sayo.n-e.kr:8080/users/login", jsonData)
      .then((res) => {
        // console.log("accessToken", res.headers.authorization);
        // console.log("refreshToken", res.headers.refresh);
        localStorage.setItem("accessToken", res.headers.authorization);
        localStorage.setItem("refreshToken", res.headers.refresh);
        // console.log("userId", res.data.data.id);
        localStorage.setItem("userId", res.data.data.id);
        if (res.status === 200) {
          alert("로그인이 완료되었습니다!");
          navigate("/");
        }
      })
      .catch((err) => {
        alert("입력하신 정보를 다시 확인해주세요!");
        console.log(err);
      });
  };

  const handleKeypress = (e:any) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
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
          type="text"
          className="ID"
          placeholder="ID"
          onChange={(e)=> {
            setInfo({
              ...info,
              email:e.target.value,
            })
          }}>
          </input> 
          <input
          type="password"
          className="PW"
          placeholder="PW"
          onChange={(e)=> {
            setInfo({
              ...info,
              password:e.target.value,
            })
          }}
          // onChange={(e) => console.log(e.target.value)}
          onKeyPress={handleKeypress}>
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
