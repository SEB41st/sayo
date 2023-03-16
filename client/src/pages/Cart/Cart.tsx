import * as S from "./styled";

import { CartBtn } from "../Detail/styled";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";


const Payment = () => {


  return (
    <S.PaymentWrap>
      <S.PaymentContainer>
        <div className="Cart">장바구니</div>
        
        <CartItem></CartItem>

        
        <S.PaymentDiv>
          <S.TotalPriceDiv>
            <div>상품금액</div>
            <div>16,700원</div>
          </S.TotalPriceDiv>
          <S.ButtonDiv2>
            <CartBtn>
              <Link to="/payment">구매하기</Link>
            </CartBtn>
          </S.ButtonDiv2>
        </S.PaymentDiv>
      </S.PaymentContainer>
    </S.PaymentWrap>
  );
};

export default Payment;
