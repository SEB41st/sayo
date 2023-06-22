import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import * as S from "./styled";

const Success = () => {
    const Url:any = window.location.href;
    const url = new URL(Url);

    let today = new Date();
    console.log(today)
    let payYear = moment().format('YYYY')
    let payMonth = moment().format('MM')
    let payDay = moment().format('DD')


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
        <h2>{urlParams.get('amount')}원</h2>
        <S.payInfo>
          <span className="title">
            <div>주문 금액</div>
            <div>결제 수단</div>
            <div>결제 일시</div>
          </span>
          <span>
            <div>{urlParams.get('amount')}원</div>
            <div>토스페이/카드</div>
            <div>{payYear}년 {payMonth}월 {payDay}일</div>
          </span>
        </S.payInfo>
            <p>결제가 완료되었습니다</p>
        <a href='/' className="back">HOME</a>
        </S.FailText>
    </S.Fail>

)}

export default Success;