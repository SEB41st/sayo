import * as S from "./styled";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";


const GoogleAuthLogin = () => {


  // 백엔드 서버 배포시 적용할 코드
const googleLogin = useGoogleLogin({
  flow: 'auth-code',
  onSuccess: (TokenResponse) => {
      console.log(TokenResponse);
  },
  onError: errorResponse => console.log(errorResponse),
});

  return (
    <>
      <S.googleLoginBtn onClick={() => googleLogin()}>
        <div className="social_login_image_box" style={{ width: "300px" }}>
          <img
            src="/assets/btn_google_signin_light_normal_web@2x.png"
            alt="google_login"
          />
        </div>
        <div className="social_login_blank_box"> </div>
        {/* <img src="/assets/btn_google_light_normal_ios.svg" style={{"width":"30px"}}/>
            <span>Continue with Google</span> */}
      </S.googleLoginBtn>

      <GoogleLogin
        onSuccess={(res: any) => {
          console.log(res);
        }}
        onError={() => {
          console.log("Login 실패");
        }}
        width={"300px"}
        useOneTap
      />
    </>
  );
};

export default GoogleAuthLogin;
