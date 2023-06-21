import * as S from "./styled";
import { TfiMinus, TfiPlus } from "react-icons/tfi";
import { useCustomQuery } from "../util/useCustomQuery";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CartItemList, countState, countSelector, totalPriceState } from "../../recoil/atom";
import axios from "axios";
import { useCustomMutation } from "../util/useMutation";


const CartItem = () => {
  
  let userId = localStorage.getItem("userId")
  const [products, setProducts] = useRecoilState(CartItemList);

  function CommaFormat(x:any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  
  const { data, isLoading, error, refetch } = useCustomQuery(`/shoppingCarts/user/${userId}/shoppingCart`, `shoppingCarts`);
  
  if (isLoading ) return <Loading/>;
  if (error) return <Error/>;
  refetch();
  
  console.log(data.data);

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
    refetch();
  })
  .catch((err) => {
    console.log(err);
  });
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
    refetch()

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

  const handleCheckbox = (shoppingCartId:any) => {
    axios(`http://sayo.n-e.kr:8080/shoppingCarts/${shoppingCartId}`, {
     method:'post',
     headers:{
      Authorization: localStorage.getItem("accessToken"),
     },   
   })
   .then((res: any) => {
    console.log(res);
    refetch()
  })
  .catch((err) => {
    console.log(err);
  });
  }

  const deleteCart = (shoppingCartId:any) => {
    localStorage.setItem("shoppingCartId", shoppingCartId);
    console.log(shoppingCartId)
    
    axios(`http://sayo.n-e.kr:8080/shoppingCarts/${shoppingCartId}`, {
     method:'delete',
     headers:{
      Authorization: localStorage.getItem("accessToken"),
     },   
   })
   .then((res: any) => {
    console.log(res);
    refetch()

  })
  .catch((err) => {
    console.log(err);
  });
  }


  return (
    <S.PaymentDiv>
      {data.data &&
        data.data.map((item: any) => (
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
