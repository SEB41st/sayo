import * as S from "./styled";
import { useEffect, useState } from "react";
import { TfiMinus, TfiPlus } from "react-icons/tfi";
import { useCustomQuery } from "../util/useCustomQuery";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CartItemList, countState, countSelector, totalPriceState } from "../../recoil/atom";
import { ItemType } from "../../pages/Cart/Cart";
import axios from "axios";
import { useCustomMutation } from "../util/useMutation";
import { useParams } from "react-router-dom";

type ItemProps = {
  item: ItemType; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

const CartItem = () => {
  //{ item }:ItemProps

  const [products, setProducts] = useRecoilState(CartItemList);
  const [count, setCount] = useRecoilState(countSelector);

  let userId = localStorage.getItem("userId")

  function CommaFormat(x:any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // const { userId } = useParams();

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
  // useEffect(() => { 
  //   axios.get(`http://sayo.n-e.kr:8080/shoppingCarts`)
  //   .then(res => {
  //     setProducts(res.data)
  //   })
  // },[])

  // console.log(products)


  

  // console.log(products[0].itmePrice)
  // const { data, isLoading, error, refetch } = useCustomQuery(`/cart`, `cart`);

  // if (isLoading) return <Loading></Loading>;
  // if (error) return <Error></Error>;

  // 상품 개수 추가
  const handleAddCount = (ItemId : any) => {
    const addQty = products.map((item: any) => {
      if(ItemId === item.id && item.amount < 10 ){
        return {...item, amount: item.amount + 1};
       } else return item;
    });
    setProducts(addQty)
  };

  // 상품 개수 삭제
  const handleDeleteCount = (ItemId : any) => {
    const addQty = products.map((item: any) => {
      if(ItemId === item.id && item.amount > 1 ){
        return {...item, amount: item.amount - 1};
       } else return item;
    });
    setProducts(addQty)
  };
 

  return (
    <S.PaymentDiv>
      {Items &&
        Items.map((item: any) => (
          <S.ProductDiv key={item.id} >
            <S.ProductInfoDiv>
              <S.CheckboxDiv>
                <S.CheckboxInput type="checkbox"></S.CheckboxInput>
              </S.CheckboxDiv>

              <S.ImageDiv>
                <img className="itemPicture" src={item.itemPicture} alt="goods"></img>
              </S.ImageDiv>
              <S.ProductInfoDiv2>
                <div className="Name">{item.itemName}</div>
                <div className="ProductFee">가격 : {CommaFormat(item.itemPrice)}원</div>
                <div className="ProductFee">배송비 : {CommaFormat(item.itemDeliveryPrice)}원</div>
              </S.ProductInfoDiv2>
              <S.CloseBox>X</S.CloseBox>
            </S.ProductInfoDiv>
            <S.ProductInfoDiv3>
              <S.CountDiv>
                <TfiMinus
                  onClick={() => { handleDeleteCount(item.id)}}
                ></TfiMinus>
                <div className="Sum">{item.amount}</div>
                <TfiPlus
                  onClick={() => { handleAddCount(item.id)}}
                ></TfiPlus>
              </S.CountDiv>
              {/* <div className="Price">{item.amount * item.itemPrice}</div> */}
              <div className="Price">{CommaFormat(item.itemPrice+(item.itemDeliveryPrice))}원</div>
            </S.ProductInfoDiv3>
          </S.ProductDiv>
          )
        )}
    </S.PaymentDiv>
  );
};
export default CartItem;
