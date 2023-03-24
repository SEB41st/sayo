import * as S from "./styled";

import { CartBtn } from "../Detail/styled";
import { Link } from "react-router-dom";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import CartItem from "../../components/CartItem/CartItem";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

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
  // const { data, isLoading, error, refetch } = useCustomQuery(`/cart`, `cart`);

  // if (isLoading) return <Loading></Loading>;
  // if (error) return <Error></Error>;

  // const Items = data;

  // console.log(Items);


  return (
    <S.PaymentWrap>
      <S.PaymentContainer>
        <div className="Cart">장바구니</div>
        {/* {Items &&
          Items.map((item: any) => {
            return <CartItem key={item.id} item={item} />;
          })} */}
        <CartItem />

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
