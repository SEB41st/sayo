import * as S from "./styled";
import { CartBtn } from "../Detail/styled";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import axios from "axios";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    TossPayments: any;
  }
}


const PaymantEachItem = () => {

  const userId = localStorage.getItem("userId")
  const location = useLocation();
  const id = location.state;

  const CommaFormat = (x: any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const { data, isLoading,refetch } = useCustomQuery(
    `/items/get/${id}`,
    `/items/get/=${id}`
  );

  
  const {data:User,isLoading:UserIsLoading, error,refetch:UserRefetch} = useCustomQuery(
    `/users/${userId}/mypage`,
    `/users=${userId}`
    )
    if (isLoading) return <Loading></Loading>;
    if (UserIsLoading) return <Loading></Loading>;
    if (error) return <Error></Error>;
    refetch();
    UserRefetch();
    const item = data.data;
  let totalPrice = 0;
  let totalDeliverPrice = 0;

    totalPrice = totalPrice + item.itemPrice
    totalDeliverPrice = totalDeliverPrice + item.itemDeliveryPrice


    const handlePay = async () => {
    await axios
      (`http://sayo.n-e.kr:8080/payments`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          AutHorization: localStorage.getItem("accessToken"),
        },
        data:{
          amount:totalPrice+totalDeliverPrice,
          payType:"CARD",
          orderName:`${item.itemName}`,
        }
      })
      .then((res) => {
        handleTossPay(res.data.data.orderCode);
      })
      .catch((err) => {
        console.log(err);
      });
  };

    var clientKey = 'test_ck_d26DlbXAaV0YJWbOjvdrqY50Q9RB' // 테스트용 클라이언트 공개 키
        // 2. 결제창 SDK 초기화
        var tossPayments = window.TossPayments(clientKey)

        const handleTossPay  = (orderCode:String) => {
          tossPayments.requestPayment('카드', {
            amount: totalPrice+totalDeliverPrice,
            orderId: orderCode,
            orderName: `${item.itemName}`,
            customerName: '박토스',
            // successUrl: 'http://localhost:3000/successOne',
            // failUrl: 'http://localhost:3000/fail',
            successUrl: 'http://sayo.s3-website.ap-northeast-2.amazonaws.com/successOne',
            failUrl: 'http://sayo.s3-website.ap-northeast-2.amazonaws.com/fail'
          })
        }

  return (
    <S.CartWrap>
      <S.CartContainer>
        <div className="Cart">주문/결제</div>
        {item.length === 0 ?
        <S.PaymentDiv>
          {
            User.data.addressList.length === 0 || 
            User.data.addressList[0].addressUserName === "" || 
            User.data.addressList[0].phoneNumber === ""||
            User.data.addressList[0].roadAddress === "" ?
          <S.UserDiv>
            <h4>주문자 정보</h4>
            <div>상단 프로필 사진 클릭 또는 "내 정보"탭에서 배송 정보를 입력해주세요</div>
          </S.UserDiv>:
          <S.UserDiv>
            <h4>주문자 정보</h4>
            <div>주문자 : {User.data.addressList[0].addressUserName}</div>
            <div>주소지 : {User.data.addressList[0].roadAddress}detailAddress</div>
            <div>연락처 : {User.data.addressList[0].phoneNumber}</div>
          </S.UserDiv> }
         <S.ProductDiv>
          
            <S.ProductInfoDiv>
            <S.ProductInfoDiv2>
              <div className="Name"></div>
              <div className="ProductFee">수량 : 0개</div>
              <div className="Price">제품 가격 : 0원</div>
            </S.ProductInfoDiv2>
          </S.ProductInfoDiv>
        
        </S.ProductDiv>

        <S.TotalDiv>결제 예정 금액</S.TotalDiv>
        
        <S.TotalPriceDiv>
          <S.TotalPriceDiv2>
            <S.TotalPriceDiv3>상품금액</S.TotalPriceDiv3>
            <S.TotalPriceDiv3>0원</S.TotalPriceDiv3>
          </S.TotalPriceDiv2>
          <S.TotalPriceDiv2>
            <S.TotalPriceDiv3>배송비</S.TotalPriceDiv3>
            <S.TotalPriceDiv3>0원</S.TotalPriceDiv3>
          </S.TotalPriceDiv2>
          <S.TotalPriceDiv2>
            <S.TotalPriceDiv3>결제 예정 금액</S.TotalPriceDiv3>
            <S.TotalPriceDiv3>0원</S.TotalPriceDiv3>
          </S.TotalPriceDiv2>
        </S.TotalPriceDiv>
        
        <S.ButtonDiv2>
        <CartBtn style={{"color":"gray"}}>결제하기</CartBtn>
        </S.ButtonDiv2>
        </S.PaymentDiv> : <S.PaymentDiv>
        {User.data.addressList.length === 0 || 
        User.data.addressList[0].addressUserName === "" || 
        User.data.addressList[0].phoneNumber === ""||
        User.data.addressList[0].roadAddress === "" ?
        <S.UserDiv>
        <h4>주문자 정보</h4>
        <div>상단 프로필 사진 클릭 또는 "내 정보"탭에서 배송 정보를 입력해주세요</div>
      </S.UserDiv>:
        <S.UserDiv>
            <h4>주문자 정보</h4>
            <span><strong>주문자</strong>: {User.data.addressList[0].addressUserName}</span>
            <span><strong>주소지</strong> : {User.data.addressList[0].roadAddress} {User.data.addressList[0].detailAddress}</span>
            <span><strong>연락처</strong> : {User.data.addressList[0].phoneNumber}</span>
          </S.UserDiv>}
         <S.ProductDiv>
            <S.ProductInfoDiv>
              <div>
                <S.ImageDiv src={item.itemPicture}/>
              </div>
            <S.ProductInfoDiv2>
              <div className="Name">{item.itemName}</div>
              <div className="ProductFee">수량 : 1개</div>
              <div className="Price">제품 가격 : {CommaFormat(item.itemPrice)}원</div>
            </S.ProductInfoDiv2>
          </S.ProductInfoDiv>
        </S.ProductDiv>

        <S.TotalDiv>결제 예정 금액</S.TotalDiv>
        
        <S.TotalPriceDiv>
          <S.TotalPriceDiv2>
            <S.TotalPriceDiv3>상품금액</S.TotalPriceDiv3>
            <S.TotalPriceDiv3>{CommaFormat(totalPrice)}원</S.TotalPriceDiv3>
          </S.TotalPriceDiv2>
          <S.TotalPriceDiv2>
            <S.TotalPriceDiv3>배송비</S.TotalPriceDiv3>
            <S.TotalPriceDiv3>{CommaFormat(totalDeliverPrice)}원</S.TotalPriceDiv3>
          </S.TotalPriceDiv2>
          <S.TotalPriceDiv2>
            <S.TotalPriceDiv3>결제 예정 금액</S.TotalPriceDiv3>
            <S.TotalPriceDiv3>{CommaFormat(totalPrice+totalDeliverPrice)}원</S.TotalPriceDiv3>
          </S.TotalPriceDiv2>
        </S.TotalPriceDiv>
        {User.data.addressList.length !== 0 &&
        User.data.addressList[0].addressUserName !== "" &&
        User.data.addressList[0].phoneNumber !== "" &&
        User.data.addressList[0].roadAddress !== "" ?
        <S.ButtonDiv2>
          <CartBtn onClick={handlePay}>결제하기</CartBtn>
        </S.ButtonDiv2> : <S.ButtonDiv2>
          <CartBtn style={{"color":"gray"}}>결제하기</CartBtn>
        </S.ButtonDiv2>}
        </S.PaymentDiv>
        }
      </S.CartContainer>
    </S.CartWrap>
  );
};

export default PaymantEachItem;