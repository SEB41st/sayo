import * as S from "./styled";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleAuthLogin = () => {
  // 전체 로직
  // 1. 프론트 : oauth 로그인 요청
  // 2. 구글 서버에서 인가 코드 발행 -> access token
  // 3. 받은 인가 코드 백엔드로 전달
  // 4. 인가 코드 이용하여 구글 서버에 사용자의 정보 요청
  // 5. 올바른 인가 코드를 받은 구글 서버는 해당 사용자의 정보를 제공

  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&response_type=token&redirect_uri=http://sayo.n-e.kr:8080/oauth2/authorization/google`;
  // const googleLoginUrl = "http://sayo.n-e.kr:8080/oauth2/authorization/google"
  // <a href="http://sayo.n-e.kr:8080/oauth2/authorization/google%22%3EGoogle로 로그인</a>

  // 백엔드 서버 배포시 적용할 코드
  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: (TokenResponse) => {
      console.log(TokenResponse);
      console.log(TokenResponse.access_token);
    },
    onError: (errorResponse) => console.log(errorResponse),
    scope: "email profile openid",
  });

  // const googleLoginHandler = () => {
  //   window.location.href = googleLoginUrl;
  // }

  const googleLoginHandler = () => {
    axios
      .post(googleLoginUrl, {
        headers: { "content-type": "application/json" },
      })
      .then((el) => {
        return el.data.access_token;
      })
      .catch((err) => {
        console.log("err=", err);
      });
  };

  // const authorizationCode = url.searchParams.get("code");

  // const handleGetAccessToken = () => {
  //    await axios.post(
  //       "http://localhost:80/sign/google", // 구글 소셜 로그인 엔드포인트
  //       {
  //         authorizationCode: authorizationCode,
  //       },
  //       {
  //         headers: { accept: `application/json` },
  //       },
  //     );

  return (
    <>
      <S.GoogleLoginWrapper onClick={() => googleLogin()}>
        {/* <button className="lin-google" onClick={() => googleLoginHandler()}> */}
        <div className="social_login_image_box">
          <img className="logo" src="/assets/google.png" alt="google_login" />
        </div>
        <div className="social_login_text_box">구글로 로그인하기</div>
        <div className="social_login_blank_box"> </div>
      </S.GoogleLoginWrapper>

      {/* <GoogleLogin
        onSuccess={(res: any) => {
          console.log("res", res);
          console.log("res");
        }}
        onError={() => {
          console.log("Login 실패");
        }}
        width={"300px"}
        useOneTap
      /> */}
    </>
  );
};

export default GoogleAuthLogin;
