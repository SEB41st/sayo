import * as S from "./styled";

const KakaoSignUp =() => {
    const kakaoClientId = `${process.env.REACT_APP_KAKAO_LOGIN_API_KEY}`// 발급 받은 Client ID 입력 
	const kakaoRedirectURL = `${process.env.REACT_APP_KAKAO_API_URL}`
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectURL}&response_type=code&prompt=login`;

//  로그인 페이지 해당 코드

    return (
            <S.StKaKaoLogin>
                <S.KaKaoBtn to={KAKAO_AUTH_URL}>
                    <div>카카오로 로그인하기</div>
                </S.KaKaoBtn>
            </S.StKaKaoLogin>
        );
}
export default KakaoSignUp;