import * as S from "./styled";
import { useState } from "react";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { useCustomQuery } from "../util/useCustomQuery";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { useRecoilState, useSetRecoilState } from "recoil";
import { countState, countSelector } from "../../recoil/atom";

const CartItem = () => {

    // 상품 개수
    const [Count, setCount] = useRecoilState(countState);
    // 상품개수 수정
    const pulsCount = useSetRecoilState(countSelector);


  const { data, isLoading, error, refetch } = useCustomQuery(`/cart`, `cart`);

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const Items = data;

  console.log(Items);

  return (
    <S.PaymentDiv>
      {Items &&
        Items.map((item: any) => {
          return (
            <S.ProductDiv>
              <S.ProductInfoDiv>
                <S.CheckboxDiv>
                  <S.CheckboxInput type="checkbox"></S.CheckboxInput>
                </S.CheckboxDiv>
                <S.ImageDiv>
                  <img className="itemPicture" src={item.itemPicture}></img>
                </S.ImageDiv>
                <S.ProductInfoDiv2>
                  <div className="Name">{item.title}</div>
                  <div className="ProductFee">배송비 {item.deliveryFee}</div>
                </S.ProductInfoDiv2>
                <S.CloseBox>X</S.CloseBox>
              </S.ProductInfoDiv>
              <S.ProductInfoDiv3>
                <S.CountDiv>
                  <HiMinusSm></HiMinusSm>
                  <div className="Sum">{Count}</div>
                  <HiPlusSm ></HiPlusSm>
                </S.CountDiv>
                <div className="Price">{item.itmePrice}</div>
              </S.ProductInfoDiv3>
            </S.ProductDiv>
          );
        })}
    </S.PaymentDiv>
  );
};
export default CartItem;
