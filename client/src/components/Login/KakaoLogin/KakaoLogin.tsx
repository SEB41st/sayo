import React, { Component, useRef } from 'react';
import * as S from "./styled";
import KaKaoLogin from 'react-kakao-login';


interface State {
    data: any;
}


// const {Kakao} = window;
// const loginWithKakao = () =>{
//   console.log("hello");
//   window.Kakao.Auth.authorize({
//     redirectUri: 'http://localhost:3000/Login'
//   })
// }

// const KakaoSignUp = () => {
//   return (
//     <div>
//       <a id="custom-login-btn" onClick={loginWithKakao}>
//         <img
//           src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
//           width="222"
//         />
//       </a>
//     </div>
//   );
// };

const KakaoSignUp =() => {

    // const kakaoRef = useRef()
    // const handleNaverLogin = () => {
    //     console.log(kakaoRef.current)
    //     // kakaoRef.current.children[0].click()
    // }

    return (
            <S.StKaKaoLogin>
                {/* <S.KaKaoBtn onClick={handleNaverLogin}> */}
                    <KaKaoLogin
                    className='KakaoBtn'
                    token={`${process.env.REACT_APP_KAKAO_API_KEY}`}
                    onSuccess={console.log}
                    onFail={console.error}
                    onLogout={console.info}
                    ><div>카카오로 로그인하기</div></KaKaoLogin>
                {/* </S.KaKaoBtn> */}
            </S.StKaKaoLogin>
        );
}

// class KakaoSignUp extends Component<any, State> {
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             data: 'kakao'
//         }
//     }

//     responseKaKao = (res: any) => {
//         this.setState({
//             data: res
//         })
//         alert(JSON.stringify(this.state.data))
//     }

//     responseFail = (err:any) => {
//         alert(err);
//     }

//     render() {
//         return (
//             <S.StKaKaoLogin>
//                     {/* <StKaKaoLogin>
//                         <img src={img} alt="a" onClick={this.loginWithKakao} />
//                     </StKaKaoLogin> */}
//                     {/* <br></br> */}
//                     {/* <KaKaoLogin
//                         token={`${process.env.REACT_APP_KAKAO_API_KEY}`}
//                         buttonext="KaKao"
//                         onSuccess={this.responseKaKao}
//                         onFailure={this.responseFail}
//                         getProfile={true}
//                     /> */}
//                     {/* <S.KaKaoBtn
//                     token={`${process.env.REACT_APP_KAKAO_API_KEY}`}
//                     onSuccess={console.log}
//                     onFail={console.error}
//                     onLogout={console.info}
//                     /> */}
//                     <KaKaoLogin
//                     className='KakaoBtn'
//                     token={`${process.env.REACT_APP_KAKAO_API_KEY}`}
//                     onSuccess={console.log}
//                     onFail={console.error}
//                     onLogout={console.info}
//                     >카카오로 로그인하기</KaKaoLogin>
//             </S.StKaKaoLogin>
//         );
//     }
// }
export default KakaoSignUp;