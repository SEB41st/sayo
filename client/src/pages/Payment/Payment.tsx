import * as S from "./styled";
import { CartBtn } from "../Detail/styled";

const Cart = () => {
  return (
    <S.CartWrap>
      <S.CartContainer>
        <div className="Cart">주문/결제</div>
        <S.PaymentDiv>

  
        <S.OrderDiv>
          <div>주문자 정보</div>
          <S.OrderInfoDiv>
            <div>이름</div>
            <div>휴대폰 번호 010-0000-0000</div>
          </S.OrderInfoDiv>
        </S.OrderDiv>
        <S.ProductDiv>
          <S.ProductInfoDiv>
            <S.ImageDiv></S.ImageDiv>
            <S.ProductInfoDiv2>
              <div className="Name">네임텍 아이렌캐리어</div>
              <div className="ProductFee">수량 : 1개</div>
              <div className="Price">6800원</div>
            </S.ProductInfoDiv2>
          </S.ProductInfoDiv>
          <S.ProductInfoDiv>
            <S.ImageDiv></S.ImageDiv>
            <S.ProductInfoDiv2>
              <div className="Name">네임텍 아이렌캐리어</div>
              <div className="ProductFee">수량 : 1개</div>
              <div className="Price">6800원</div>
            </S.ProductInfoDiv2>
          </S.ProductInfoDiv>
        </S.ProductDiv>

        <S.TotalDiv>결제 예정 금액</S.TotalDiv>
        <S.TotalPriceDiv>
          <S.TotalPriceDiv2>
            <S.TotalPriceDiv3>상품금액</S.TotalPriceDiv3>
            <S.TotalPriceDiv3>16,700원</S.TotalPriceDiv3>
          </S.TotalPriceDiv2>
          <S.TotalPriceDiv2>
            <S.TotalPriceDiv3>배송비</S.TotalPriceDiv3>
            <S.TotalPriceDiv3>0원</S.TotalPriceDiv3>
          </S.TotalPriceDiv2>
          <S.TotalPriceDiv2>
            <S.TotalPriceDiv3>결제 예정 금액</S.TotalPriceDiv3>
            <S.TotalPriceDiv3>16,700원</S.TotalPriceDiv3>
          </S.TotalPriceDiv2>
        </S.TotalPriceDiv>
        <S.ButtonDiv2>
          <CartBtn>결제하기</CartBtn>
        </S.ButtonDiv2>
        </S.PaymentDiv>
      </S.CartContainer>
    </S.CartWrap>
  );
};

export default Cart;
