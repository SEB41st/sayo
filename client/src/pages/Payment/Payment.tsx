import * as S from "./styled";
import { CartBtn } from "../Detail/styled";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const Cart = () => {

  const userId = localStorage.getItem("userId")

  const {data, isLoading, error} = useCustomQuery(
    `/users/${userId}/mypage`,
    `users=${userId}/mypage`
  )
  // console.log(data.data)

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;


  return (
    <S.CartWrap>
      <S.CartContainer>
        <div className="Cart">주문/결제</div>
        <S.PaymentDiv>

  
        <S.OrderDiv>
          <div>주문자 정보</div>
          {data.data.addressList.length === 0 ? <S.OrderInfoDiv>나의 정보에서 주소를 입력해주세요</S.OrderInfoDiv> 
          : 
          <S.OrderInfoDiv>
            <div className="orderDetail">회원 이름 : {data.data.addressList[0].addressUserName}</div>
            <div className="orderDetail">휴대폰 번호 : {data.data.addressList[0].phoneNumber}</div>
            <span>주문 주소 : {data.data.addressList[0].postcode}, {data.data.addressList[0].roadAddress} {data.data.addressList[0].detailAddress}</span>
          </S.OrderInfoDiv>
          }
          
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
