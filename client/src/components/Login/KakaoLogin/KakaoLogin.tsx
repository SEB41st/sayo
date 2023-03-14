import React, { Component } from 'react';
import * as S from "./styled";


interface State {
    data: any;
}

class KakaoSignUp extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: 'kakao'
        }
    }

    responseKaKao = (res: any) => {
        this.setState({
            data: res
        })
        alert(JSON.stringify(this.state.data))
    }

    responseFail = (err:any) => {
        alert(err);
    }

    render() {
        return (
            <>
                <div>
                    <h1>카카오톡 간편 로그인</h1>
                    <h4>로그인 후 더 많은 혜택을 누리세요!</h4>
                    {/* <StKaKaoLogin>
                        <img src={img} alt="a" onClick={this.loginWithKakao} />
                    </StKaKaoLogin> */}
                    <br></br>
                    {/* <KaKaoLogin
                        token={`${process.env.REACT_APP_KAKAO_API_KEY}`}
                        buttonext="KaKao"
                        onSuccess={this.responseKaKao}
                        onFailure={this.responseFail}
                        getProfile={true}
                    /> */}
                    <S.KaKaoBtn
                    token={`${process.env.REACT_APP_KAKAO_API_KEY}`}
                    onSuccess={console.log}
                    onFail={console.error}
                    onLogout={console.info}
                    />


                </div>

            </>
        );
    }
}

export default KakaoSignUp;