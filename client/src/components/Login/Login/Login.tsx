import { useEffect, useRef } from "react";
import * as S from "./styled";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import GoogleAuthLogin from "../Google/GoogleAuthLogin";

const Login = () => {
  const naverRef = useRef<any>();
  const { naver } = window as any;
  const NAVER_CLIENT_ID = `${process.env.REACT_APP_NAVER_CLIENT_ID}`; // 발급 받은 Client ID 입력
  const NAVER_CALLBACK_URL = `${process.env.REACT_APP_NAVER_CALLBACK_URL}`; // 작성했던 Callback URL 입력

  // console.log(`${process.env.REACT_APP_NAVER_CLIENT_ID}`)
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      // 팝업창으로 로그인을 진행할 것인지?
      isPopup: false,
      // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
      loginButton: { color: "green", type: 3, height: 10 },
      callbackHandle: true,
    });
    naverLogin.init();

    // 선언된 naverLogin 을 이용하여 유저 (사용자) 정보를 불러오는데
    // 함수 내부에서 naverLogin을 선언하였기에 지역변수처리가 되어
    // userinfo 정보를 추출하는 것은 지역변수와 같은 함수에서 진행주어야한다.

    // 아래와 같이 로그인한 유저 ( 사용자 ) 정보를 직접 접근하여 추출가능하다.
    // 이때, 데이터는 첫 연동시 정보 동의한 데이터만 추출 가능하다.

    // 백엔드 개발자가 정보를 전달해준다면 아래 요기! 라고 작성된 부분까지는
    // 코드 생략이 가능하다.

    naverLogin.getLoginStatus(async function (status: any) {
      if (status) {
        // 아래처럼 선택하여 추출이 가능하고,
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();

        console.log("naver로그인", naverLogin);
        // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
        //   setUserInfo(naverLogin.user)
      }
    });
    // 요기!
  };
  // 네이버 소셜 로그인 (네아로) 는 URL 에 엑세스 토큰이 붙어서 전달된다.
  // 우선 아래와 같이 토큰을 추출 할 수 있으며,
  // 3부에 작성 될 Redirect 페이지를 통해 빠르고, 깨끗하게 처리가 가능하다.

  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split("=")[1].split("&")[0];
    // console.log, alert 창을 통해 토큰이 잘 추출 되는지 확인하자!
    console.log(token);
    // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!
    // localStorage.setItem('access_token', token)
    // setGetToken(token)
  };
  // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
  }, []);
  {
    /* 구현할 위치에 아래와 같이 코드를 입력해주어야 한다. 
         태그에 id="naverIdLogin" 를 해주지 않으면 오류가 발생한다! */
  }

  const handleNaverLogin = () => {
    console.log(naverRef.current.children[0]);
    naverRef.current.children[0].click();
  };

  //     const REST_API_KEY = `${process.env.REACT_APP_KAKAO_API_KEY}`
  //     // console.log(REST_API_KEY)
  // const REDIRECT_URI = "http://localhost:3000/Login"
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (TokenResponse) => {
      console.log(TokenResponse);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <S.Login>
      <S.LoginTitle>
        <span className="title">로그인</span>
        <span className="subtitle">
          로그인 후 다양한 상품들을 구매해보세요 !
        </span>
      </S.LoginTitle>
      <div>
        {/* <S.NaverBtn id="naverIdLogin"/> */}
        <S.NaverIdLogin id="naverIdLogin" ref={naverRef} />
        <S.NaverLoginBtn onClick={handleNaverLogin}>
          <S.NaverIcon />
          <S.NaverLoginTitle>네이버로 로그인하기</S.NaverLoginTitle>
        </S.NaverLoginBtn>
        <S.KaKaoBtn
          token={`${process.env.REACT_APP_KAKAO_API_KEY}`}
          onSuccess={console.log}
          onFail={console.error}
          onLogout={console.info}
        />
        <S.KakaoLoginBtn>
          <S.KakaoIcon />
          {/* <a href={KAKAO_AUTH_URL}>카카오로 로그인하기</a> */}
          {/* <S.NaverLoginTitle>카카오로 로그인하기</S.NaverLoginTitle> */}
        </S.KakaoLoginBtn>
        <GoogleAuthLogin/>
         
      </div>
    </S.Login>
  );
};

export default Login;
