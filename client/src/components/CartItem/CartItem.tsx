import * as S from "./styled";
import { useEffect, useState } from "react";
import { TfiMinus, TfiPlus } from "react-icons/tfi";
import { useCustomQuery } from "../util/useCustomQuery";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { useRecoilState, useSetRecoilState } from "recoil";
import { countState, countSelector, totalPriceState } from "../../recoil/atom";
import { ItemType } from "../../pages/Cart/Cart";
import axios from "axios";

type ItemProps = {
  item: ItemType; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

const CartItem = () => {
  //{ item }:ItemProps

  const [products, setProducts] = useState([]);


  useEffect(() => { 
    axios(`http://localhost:4000/cart`)
    .then(res => {
      setProducts(res.data)
      console.log(res.data)
    })
  },[])

  console.log(products)
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
      {products &&
        products.map((item: any) => (
          <S.ProductDiv key={item.id} >
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
                <TfiMinus
                  onClick={() => { handleDeleteCount(item.id)}}
                ></TfiMinus>
                <div className="Sum">{item.amount}</div>
                <TfiPlus
                  onClick={() => { handleAddCount(item.id)}}
                ></TfiPlus>
              </S.CountDiv>
              <div className="Price">{item.itmePrice}</div>
            </S.ProductInfoDiv3>
          </S.ProductDiv>
          )
        )}
    </S.PaymentDiv>
  );
};
export default CartItem;
