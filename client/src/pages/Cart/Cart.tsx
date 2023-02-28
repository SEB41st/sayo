import * as S from "./styled";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { CartBtn } from "../Detail/styled";
import { Link } from "react-router-dom";

const Payment = () => {
  return (
    <S.PaymentWrap>
      <S.PaymentContainer>
        <div className="Cart">장바구니</div>
        <S.PaymentDiv>
          <S.ProductDiv>
            <S.ProductInfoDiv>
              <S.CheckboxDiv>
                <S.CheckboxInput type="checkbox"></S.CheckboxInput>
              </S.CheckboxDiv>
              <S.ImageDiv></S.ImageDiv>
              <S.ProductInfoDiv2>
                <div className="Name">네임텍 아이렌캐리어</div>
                <div className="ProductFee">배송비 무료</div>
              </S.ProductInfoDiv2>
              <S.CloseBox>X</S.CloseBox>
            </S.ProductInfoDiv>
            <S.ProductInfoDiv3>
              <S.CountDiv>
                <HiMinusSm></HiMinusSm>
                <div className="Sum">1</div>
                <HiPlusSm></HiPlusSm>
              </S.CountDiv>
              <div className="Price">6800원</div>
            </S.ProductInfoDiv3>
          </S.ProductDiv>
        </S.PaymentDiv>
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
