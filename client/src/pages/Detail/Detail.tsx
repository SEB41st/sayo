import { Link, useParams } from "react-router-dom";
import * as S from "./styled";
import React, { useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
// import MapMain from "../../components/Map/MapMain";
// import MapSalesLoaction from "../../components/Map/MapSalesLoaction";
// import MapLocation from "../../components/Map/MapLocation";
import Modal from "../../components/Modal/Modal";
import DataCalendar from "../../components/Calendar/Calendar";
import { Maps } from "../../components/Map/styled";
import { MapMarker } from "react-kakao-maps-sdk";
import { likeState } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useCustomMutation } from "../../components/util/useMutation";


export interface LatLng {
  latitude: any;
  longitude: any;
}

interface WishItem {
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

const apiCall = async (url: any) => {
  return await axios
    .get(`http://sayo.n-e.kr:8080${url}`, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        AutHorization: localStorage.getItem("accessToken"),
      },
    })
    .then((res) => res.data.data)
    .catch((error) => {
      if (error) return false;
    });
};

const Detail = () => {
  const [modalOpen, SetModalOpen] = useState<boolean>(false);
  // const [like, setLike] = useRecoilState(likeState);
  const [addCart, setAddCart] = useState<boolean>(false);
  // const [wish, setwishId] = useState<number>(0)
  // // const userId = localStorage.getItem("userId")

  // const { itemId } = useParams();

  // useEffect(() => {
  //   axios
  //     .get(`http://sayo.n-e.kr:8080/wishes/${wish}`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json;charset=UTF-8",
  //         Accept: "application/json",
  //         "AutHorization" : localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   }, [wish]);
  const [like, setLike] = useState<boolean>(false);
  // const [like, setLike] = useRecoilState(likeState);
  const [item, setItem] = useState<WishItem[]>([]);
  const [wish, setWish] = useState<WishItem[]>([]);

  const { Id } = useParams();
  console.log(Id)
  const userId = localStorage.getItem("userId")

    useEffect(() => {
      axios
      (`http://sayo.n-e.kr:8080/wishes/user/${userId}/wish`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res: any) => {
        setWish(res.data.data);
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const hasItemId = wish.some(item => item.itemId === Number(Id));
  console.log("hasItemId", hasItemId)
  console.log("wish", wish)
  

  const { data, isLoading, error, refetch } = useCustomQuery(
    `/items/get/${Id}`,
    `/items/get/=${Id}`
  );

  // const { mutate } = useCustomMutation(
  //   `/wishes/${itemId}`,
  //   `/wishes/${itemId}`,
  //   "POST"
  // );
  const { mutate } = useCustomMutation(
    `/wishes/${Id}`,
    `/wishes/${Id}`,
    "POST"
  );
  // const { mutate } = useCustomMutation(`/shoppingCarts/items/${itemId}`, `/shoppingCarts/items/${itemId}`, "POST");

  const PostCart = async () => {
    await axios
      (`http://sayo.n-e.kr:8080/shoppingCarts/items/${Id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          AutHorization: localStorage.getItem("accessToken"),
        }
      })
      .then((res) => {
        console.log(res);
        SetModalOpen(true);
        setAddCart(!addCart)
        // toast.success("선택하신 내용이 삭제되었습니다");
        // refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLikeBtn = () => {
    // if (!isLogin) return navigate("/login");
    axios
      (`http://sayo.n-e.kr:8080/wishes/${Id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setLike(!res.data.data.wishSelected);
        // window.location.reload();
        // refetch();
        // console.log(res.data.data.wishSelected);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const Items = data.data;

  // const location: any = Items.location;
  // console.log(location);

  // setSalesLocation(location)
  // const longitude: any = Items.location.Ma;

  const openModal = () => {
    SetModalOpen(true);
  };
  const closeModal = () => {
    SetModalOpen(false);
  };

  // const handleLikeBtn = () => {
  //   setLike(!like);
  //   mutate(like);
  //   // window.location.reload();
  //   refetch();
  // };

  

 

  // const handleLikeBtn = () => {
  //   // if (!isLogin) return navigate("/login");
  //   axios
  //     (`http://sayo.n-e.kr:8080/wishes/${itemId}`, {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((res) => {
  //       setLike(!like);
  //       setwishId(res.data.data.wishId)
  //       refetch()
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  function CommaFormat(x:any) {
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
            
            { hasItemId ? (
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
            )}
          </div>
          <S.goodsDetail>
            <div className="ProductPrice">판매가 : {CommaFormat(Items.itemPrice)}원</div>
            <div className="ProductFee">배송비 : {CommaFormat(Items.itemDeliveryPrice)}원</div>
            <div className="SalesSchedule">
              {/* 판매일정 : {Items.itemDateStart} ~ {Items.itemDateEnd} */}
              판매 일정 :</div>
              <DataCalendar itemDateStart={Items.itemDateStart} itemDateEnd = {Items.itemDateEnd}/>
          </S.goodsDetail>
          <S.ButtonDiv>
            <S.CartBtn onClick={PostCart}>장바구니</S.CartBtn>
            <S.BuyBtn>
              <Link to="/payment">바로 구매</Link>
            </S.BuyBtn>
          </S.ButtonDiv>
        </S.ProductInfoDiv>
      </S.DetailContainer>
      {addCart ? <Modal
        open={modalOpen}
        close={closeModal}
        header="장바구니에 상품이 정상적으로 삭제되었습니다."
      ><div>장바구니에 담으시려면 장바구니 버튼을 한번 더 눌러주세요</div></Modal>
      : <Modal
        open={modalOpen}
        close={closeModal}
        header="장바구니에 상품이 성공적으로 담겼습니다."
      ><div>장바구니로 이동하시겠습니까?</div></Modal>}
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
