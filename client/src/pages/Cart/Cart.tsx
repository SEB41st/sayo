import * as S from "./styled";
import { useState } from "react";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { CartBtn } from "../Detail/styled";
import { Link } from "react-router-dom";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const Payment = () => {

  const { data, isLoading, error, refetch } = useCustomQuery(`/cart`, `cart`);

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const Items = data;

  console.log(Items);

  return (
    <S.PaymentWrap>
      <S.PaymentContainer>
        <div className="Cart">장바구니</div>

        <S.PaymentDiv>
          {Items &&
            Items.map((item: any) => {
              return (
                <S.ProductDiv>
                  <S.ProductInfoDiv>
                    <S.CheckboxDiv>
                      <S.CheckboxInput type="checkbox"></S.CheckboxInput>
                    </S.CheckboxDiv>
                    <S.ImageDiv></S.ImageDiv>
                    <S.ProductInfoDiv2>
                      <div className="Name">{item.title}</div>
                      <div className="ProductFee">{item.deliveryFee}</div>
                    </S.ProductInfoDiv2>
                    <S.CloseBox>X</S.CloseBox>
                  </S.ProductInfoDiv>
                  <S.ProductInfoDiv3>
                    <S.CountDiv>
                      <HiMinusSm></HiMinusSm>
                      <div className="Sum">1</div>
                      <HiPlusSm></HiPlusSm>
                    </S.CountDiv>
                    <div className="Price">{item.itmePrice}</div>
                  </S.ProductInfoDiv3>
                </S.ProductDiv>
              );
            })}
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
