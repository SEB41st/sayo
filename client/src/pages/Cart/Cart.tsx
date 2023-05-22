import * as S from "./styled";

import { CartBtn } from "../Detail/styled";
import { Link } from "react-router-dom";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import CartItem from "../../components/CartItem/CartItem";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { useCustomMutation } from "../../components/util/useMutation";
import { Item } from "../Main/styled";

export type ItemType = {
  id : number;
  title: string;
  itemPicture: string;
  deliveryFee: string;
  isChecked: boolean;
  amount: number;
  itmePrice: number;
};

const Payment = () => {

  let userId = localStorage.getItem("userId")
  let totalPrice = 0;
  function CommaFormat(x:any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const { data, isLoading, error, refetch } = useCustomQuery(`/shoppingCarts/user/${userId}/shoppingCart`, `shoppingCarts`);

  const { mutate } = useCustomMutation(
    `/shoppingCarts/user/${userId}/shoppingCart`,
    `/cart`,
    "POST"
  );

  if (isLoading ) return <Loading/>;
  if (error) return <Error/>;
  const Items = data.data;

  console.log(Items);
  return (
    <S.PaymentWrap>
      <S.PaymentContainer>
        <div className="Cart">장바구니</div>
        <CartItem Items={Items}/>

        <S.PaymentDiv>
          <S.TotalPriceDiv>
            <div>상품금액</div>
            {/* <div>{Items.}</div> */}
        {Items &&
          Items.map((item: any) => {
            totalPrice = item.orderCheck ? totalPrice + item.itemCount*(item.itemPrice)+(item.itemDeliveryPrice) : totalPrice
          })}
          <div>{CommaFormat(totalPrice)}</div>
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
