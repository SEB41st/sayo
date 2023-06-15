import * as S from "./styled";
import { CartBtn } from "../Detail/styled";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import axios from "axios";
import { useEffect, useState } from "react";

// interface item {
//   createdAt : string;
//   itemCount: number;
// itemDeliveryPrice:number;
// itemId:number;
// itemName:string;
// itemPicture:string;
// itemPrice:number;
// itemTotalCount:number;
// modifiedAt: string;
// orderCheck: boolean;
// shoppingCartId: number;
// shoppingCartSelected: boolean;
// userId: number;
// }

declare global {
  interface Window {
    TossPayments: any;
  }
}


const Cart = () => {
  const [user, setUser] = useState()
  const [orderId, setOrderId] = useState('');

  console.log(orderId)
  console.log(user)
  // console.log(items)
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    axios(`http://sayo.n-e.kr:8080/users/${userId}/mypage`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((res: any) => {
        console.log(res.data.data)
        setUser(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const CommaFormat = (x: any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const {data, isLoading, error} = useCustomQuery(
    `/shoppingCarts/order/user/${userId}`,
    `/shoppingCarts/order/user/${userId}`
  )
  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;
  const Items = data.data;
  console.log(Items[0].itemName)
  let totalPrice = 0;
  let totalDeliverPrice = 0;

  Items && Items.map((item:any) => (
    totalPrice = totalPrice + item.itemCount*(item.itemPrice)
  ))
  Items && Items.map((item:any) => (
    totalDeliverPrice = totalDeliverPrice + item.itemCount*item.itemDeliveryPrice
  ))


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
          orderName:`${Items[0].itemName} 외 ${Items.length}건`,
        }
      })
      .then((res) => {
        setOrderId(res.data.data.orderId)
        handleTossPay();
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

    var clientKey = 'test_ck_d26DlbXAaV0YJWbOjvdrqY50Q9RB' // 테스트용 클라이언트 공개 키
        // 2. 결제창 SDK 초기화
        var tossPayments = window.TossPayments(clientKey)

        const handleTossPay  = () => {
          tossPayments.requestPayment('카드', {
            amount: totalPrice+totalDeliverPrice,
            orderId: orderId,
            orderName: `${Items[0].itemName} 외 ${Items.length}건`,
            customerName: '박토스',
            // successUrl: 'http://localhost:3000/success',
            // failUrl: 'http://localhost:3000/fail',
            successUrl: 'http://sayo.s3-website.ap-northeast-2.amazonaws.com/success',
            failUrl: 'http://sayo.s3-website.ap-northeast-2.amazonaws.com/fail'
          })
        }


  return (
    <S.CartWrap>
      <S.CartContainer>
        <div className="Cart">주문/결제</div>
        <S.PaymentDiv>
        <S.ProductDiv>
          {Items && Items.map((item:any) => (
            <S.ProductInfoDiv>
              <div>
                <S.ImageDiv src={item.itemPicture}/>
              </div>
            <S.ProductInfoDiv2>
              <div className="Name">{item.itemName}</div>
              <div className="ProductFee">수량 : {item.itemCount}개</div>
              <div className="Price">제품 가격 : {CommaFormat(item.itemPrice*item.itemCount)}원</div>
            </S.ProductInfoDiv2>
          </S.ProductInfoDiv>
          ))}
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
        
        <S.ButtonDiv2>
          <CartBtn onClick={handlePay}>결제하기</CartBtn>
        </S.ButtonDiv2>
        </S.PaymentDiv>
      </S.CartContainer>
    </S.CartWrap>
  );
};

export default Cart;
