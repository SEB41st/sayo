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
import { useCartCustomMutation } from "../util/useCartMutation";

type ItemProps = {
  item: ItemType; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

const CartItem = (Items:any) => {
  //{ item }:ItemProps

  const [products, setProducts] = useRecoilState(CartItemList);
  // const [shoppingCartId, setShoppingCart] = useState(localStorage.getItem("shoppingCartId"))
  // console.log(shoppingCartId)

  function CommaFormat(x:any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // const { data, isLoading, error, refetch } = useCustomQuery(`/shoppingCarts/user/${userId}/shoppingCart`, `shoppingCarts`);

  // const { mutate } = useCustomMutation(
  //   `/shoppingCarts/user/${userId}/shoppingCart`,
  //   `/cart`,
  //   "POST"
  // );

  // if (isLoading ) return <Loading/>;
  // if (error) return <Error/>;

  // const Items = data.data;

  console.log(Items.Items);
  // useEffect(() => { 
  //   axios.get(`http://sayo.n-e.kr:8080/shoppingCarts`)
  //   .then(res => {
  //     setProducts(res.data)
  //   })
  // },[])

  // const { data, isLoading, error, refetch } = useCustomQuery(`/cart`, `cart`);

  // if (isLoading) return <Loading></Loading>;
  // if (error) return <Error></Error>;

  // 상품 개수 추가
  const handleAddCount = (ItemId : any) => {
   axios(`http://sayo.n-e.kr:8080/shoppingCarts/items/add/${ItemId}`, {
     method:'post',
     headers:{
      Authorization: localStorage.getItem("accessToken"),
     },   
   })
   .then((res: any) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
    // const addQty = products.map((item: any) => {
    //   if(ItemId === item.id && item.amount < 10 ){
    //     return {...item, amount: item.amount + 1};
    //    } else return item;
    // });
    // setProducts(addQty)
  };

  // 상품 개수 삭제
  const handleDeleteCount = (ItemId : any) => {
    axios(`http://sayo.n-e.kr:8080/shoppingCarts/items/minus/${ItemId}`, {
     method:'post',
     headers:{
      Authorization: localStorage.getItem("accessToken"),
     },   
   })
   .then((res: any) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

    const addQty = products.map((item: any) => {
      if(ItemId === item.id && item.amount > 1 ){
        return {...item, amount: item.amount - 1};
       } else return item;
    });
    setProducts(addQty)
  };
  // const query1 = useCustomMutation(
  //   `/shoppingCarts/items/minus/${ItemId}`,
  //   `/minus/${ItemId}`,
  //   "POST"
  // );
  // const { mutate:CheckCartMutation } = useCustomMutation(
  //   `/shoppingCarts/${shoppingCartId}`,
  //   `/shoppingCarts=${shoppingCartId}`,
  //    "POST",
  //    (res:any) => {
  //     console.log(res)
  //    });
  const handleCheckbox = (shoppingCartId:any) => {
    
    // setShoppingCart(shoppingCartId)
    // CheckCartMutation(shoppingCartId)
    axios(`http://sayo.n-e.kr:8080/shoppingCarts/${shoppingCartId}`, {
     method:'post',
     headers:{
      Authorization: localStorage.getItem("accessToken"),
     },   
   })
   .then((res: any) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
  }
  // const { mutate:deleteCartMutation } = useCartCustomMutation(
  //   `/shoppingCarts`,
  //   `/shoppingCarts`,
  //   `${shoppingCartId}`,
  //    "DELETE",
  //    (res:any) => {
  //     console.log(res)
  //    });
  const deleteCart = (shoppingCartId:any) => {
    localStorage.setItem("shoppingCartId", shoppingCartId);
    console.log(shoppingCartId)
    // deleteCartMutation(shoppingCartId)
    
    axios(`http://sayo.n-e.kr:8080/shoppingCarts/${shoppingCartId}`, {
     method:'delete',
     headers:{
      Authorization: localStorage.getItem("accessToken"),
     },   
   })
   .then((res: any) => {
    console.log(res);
    // setCount(count+1)
  })
  .catch((err) => {
    console.log(err);
  });
  }


  return (
    <S.PaymentDiv>
      {Items.Items &&
        Items.Items.map((item: any) => (
          <S.ProductDiv key={item.id} >
            <S.ProductInfoDiv>
              <S.CheckboxDiv>
                <S.CheckboxInput type="checkbox" 
                  onClick={() => handleCheckbox(item.shoppingCartId)}
                  checked={item.orderCheck}/>
              </S.CheckboxDiv>

              <S.ImageDiv>
                <img className="itemPicture" src={item.itemPicture} alt="goods"></img>
              </S.ImageDiv>
              <S.ProductInfoDiv2>
                <div className="Name">{item.itemName}</div>
                <div className="ProductFee">가격 : {CommaFormat(item.itemPrice)}원</div>
                <div className="ProductFee">배송비 : {CommaFormat(item.itemDeliveryPrice)}원</div>
              </S.ProductInfoDiv2>
              <S.CloseBox onClick={() => deleteCart(item.shoppingCartId)}>X</S.CloseBox>
            </S.ProductInfoDiv>
            <S.ProductInfoDiv3>
              <S.CountDiv>
                <TfiMinus
                  onClick={() => { handleDeleteCount(item.itemId)}}
                ></TfiMinus>
                <div className="Sum">{item.itemCount}</div>
                <TfiPlus
                  onClick={() => { handleAddCount(item.itemId)}}
                ></TfiPlus>
              </S.CountDiv>
              <div className="Price">{CommaFormat(item.itemCount*(item.itemPrice)+(item.itemDeliveryPrice))}원</div>
            </S.ProductInfoDiv3>
          </S.ProductDiv>
          )
        )}
    </S.PaymentDiv>
  );
};
export default CartItem;
