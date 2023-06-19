import axios from "axios";
import { useEffect } from "react";
import * as S from "./styled";

const Success = () => {
    const Url:any = window.location.href;
    const url = new URL(Url);

const urlParams = url.searchParams;
    useEffect(() => {
        console.log(urlParams.get('paymentKey'))
        axios
          (`http://sayo.n-e.kr:8080/payments/success`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              AutHorization: localStorage.getItem("accessToken"),
            },
            data:{
              paymentKey:urlParams.get('paymentKey'),
              amount:urlParams.get('amount'),
              orderId:urlParams.get('orderId'),
            }
          })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
    },[])
    
  
return (
    <S.Fail>
        <S.FailText>
        <span>결제 완료</span>
            <p>결제가 완료되었습니다</p>
        <a href='/' className="back">홈으로 돌아가기</a>
        </S.FailText>
    </S.Fail>

)}

export default Success;