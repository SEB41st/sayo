import { Link, useNavigate, useParams } from "react-router-dom";
import * as S from "./styled";
import  {  useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import Modal from "../../components/Modal/Modal";
import DataCalendar from "../../components/Calendar/Calendar";
import { Maps } from "../../components/Map/styled";
import { MapMarker } from "react-kakao-maps-sdk";
import { useCustomMutation } from "../../components/util/useMutation";
import { toast } from "react-toastify";


export interface LatLng {
  latitude: any;
  longitude: any;
}

export interface WishItem {
  createdAt: string;
  itemId: number;
  itemName: string;
  itemPicture: string;
  itemPrice: number;
  modifiedAt: string;
  userId: number;
  wishId: number;
  wishSelected: boolean;
  Id: number;
}

const Detail = () => {
  const [modalOpen, SetModalOpen] = useState<boolean>(false);
  const [addCart, setAddCart] = useState<boolean>(false);

  const [like, setLike] = useState<boolean>(false);
  const navigate = useNavigate();

  const { Id } = useParams();
  const userId = localStorage.getItem("userId")

  const { data:getWish, isLoading:wishLoadig, error, refetch } = useCustomQuery(
    userId === null ? '' : `/wishes/user/${userId}/wish`,
    userId === null ? '' : `/wishes/user=${userId}`
  );

  const { data, isLoading } = useCustomQuery(
    `/items/get/${Id}`,
    `/items/get/=${Id}`
  );

  const { mutate:mutateLike} = useCustomMutation(
    `/wishes/${Id}`,
    `/wishes/=${Id}`,
    "POST",
      (res:any) => {
        setLike(res.data.data.wishSelected);
        // 추가적인 로직 수행
      }

  );
  const { mutate:cartPost } = useCustomMutation(
    `/shoppingCarts/items/${Id}`,
    `/shoppingCarts/items/=${Id}`,
     "POST",
     (res:any) => {
      console.log(res)
      setAddCart(!addCart)
      openModal()
     });

  const PostCart = () => {
    cartPost({})
};

const { mutate:paymentPost } = useCustomMutation(
  `/payments/item/${Id}`,
  `/payments/item/=${Id}`,
   "POST",
   (res:any) => {
    console.log(res)
    navigate("/paymentEachItem", { state:Id });
   });

const buyItem = () => {
  paymentPost({})
};

  if (wishLoadig) return <Loading></Loading>;
  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const Items = data.data;
  
  // wish에 해당 item이 포함되어 있는지 확인하는 함수
  const hasItemId = userId === null ? null : findItemById(getWish.data);
  function findItemById(items:any) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].itemId === Number(Id)) {
        return items[i];
      }
    }
    return null;
  }
  
  const openModal = () => {
    SetModalOpen(true);
  };
  const closeModal = () => {
    SetModalOpen(false);
  };

  const handleLikeBtn = () => {
    mutateLike({})
      refetch();
};

const haveToLogin = () => {
    toast.info("로그인 후 눌러주세요")
};

  const CommaFormat = (x:any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <S.DetailWrap>
      <S.DetailContainer>
        <S.ImageDiv>
          <div className="ProductImg">
            <img src={Items.itemPicture} alt="goods"></img>
          </div>
        </S.ImageDiv>
        <S.ProductInfoDiv>
          <div className="Product">
            <div className="ProductName">{Items.itemName}</div>
            {userId === null ? (
              <BsHeartFill
                onClick={haveToLogin}
                size="20"
                style={{ marginLeft: "10px", color: "#d3d3d3" }}
              />
            ) : (
            hasItemId !== null ? (
              <BsHeartFill
                onClick={handleLikeBtn}
                size="20"
                style={{ marginLeft: "10px", color: "#eb1717" }}
              />
            ) : (
              <BsHeartFill
                size="20"
                onClick={handleLikeBtn}
                style={{ marginLeft: "10px", color: "#d3d3d3" }}
              />
            )
            )}
          </div>
          <S.goodsDetail>
            <div className="ProductPrice">판매가 : {CommaFormat(Items.itemPrice)}원</div>
            <div className="ProductPrice">배송비 : {CommaFormat(Items.itemDeliveryPrice)}원</div>
            <div className="SalesSchedule">
              판매 일정 :</div>
              <DataCalendar itemDateStart={Items.itemDateStart} itemDateEnd = {Items.itemDateEnd}/>
          </S.goodsDetail>
          <S.ButtonDiv>
            {Items.itemStatus === "ITEM_END" ? <div>판매가 종료된 상품입니다.</div> : userId === null? <S.CartBtn onClick={haveToLogin}>장바구니</S.CartBtn> : <S.CartBtn onClick={PostCart}>장바구니</S.CartBtn>}
            {Items.itemStatus === "ITEM_END" ? null : userId === null? <S.CartBtn onClick={haveToLogin}>바로 구매</S.CartBtn> :(
            <S.BuyBtn onClick={buyItem}>바로 구매</S.BuyBtn>
            )}
          </S.ButtonDiv>
        </S.ProductInfoDiv>
      </S.DetailContainer> 
      <Modal
        open={modalOpen}
        close={closeModal}
        header="장바구니에 상품이 성공적으로 담겼습니다."
      ><div>장바구니로 이동하시겠습니까?</div></Modal>
      <S.DetailDiv>
        <div className="DetailInfo">상세정보</div>
        <div className="DetailInfoTxt">{Items.itemBody}</div>
        <div className="DetailLocation">위치</div>
        <Maps
          center={{
            lat: Items.latitude,
            lng: Items.longitude,
          }}
          isPanto={true}
        >
          {Items && (
            <MapMarker
              position={{ lat: Items.latitude, lng: Items.longitude }}
            />
          )}
        </Maps>
      </S.DetailDiv>
    </S.DetailWrap>
  );
};

export default Detail;
