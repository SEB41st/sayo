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
import Calendar from "../../components/Calendar/Calendar";
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

const Detail = () => {

  const [modalOpen, SetModalOpen] = useState<boolean>(false);
  const [like, setLike] = useRecoilState(likeState)

  const { itemId } = useParams();

  // useEffect(() => {
  //   axios
  //     .get(`http://whatu1.kro.kr:8080/wishes/${wishId}`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json;charset=UTF-8",
  //         Accept: "application/json",
  //         "AutHorization" : localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((res) => {

  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   }, []);

  const { data, isLoading, error, refetch } = useCustomQuery(
    `/items/get/${itemId}`,
    `/items/get/=${itemId}`
  );

  const { mutate } = useCustomMutation(`/wishes/${itemId}`, `/wishes/${itemId}`, "POST");
  // const { mutate } = useCustomMutation(`/shoppingCarts/items/${itemId}`, `/shoppingCarts/items/${itemId}`, "POST");

  const PostCart = async () => {
    
    await axios
      .post(`http://sayo.n-e.kr:8080/shoppingCarts/items/${itemId}`, 
      {
        headers: {
          "Content-Type": "application/json",
          AutHorization: localStorage.getItem("accessToken"),
        },
      }
      )
      .then((res) => {
        console.log(res);
        // toast.success("선택하신 내용이 삭제되었습니다");
        // refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const Items = data.data;

  const openModal = () => {
    SetModalOpen(true);
  };
  const closeModal = () => {
    SetModalOpen(false);
  };

  const handleLikeBtn = () => {
    setLike(!like)
    mutate(like)
  }

  // const handlePostCart = () => {
  //   // setLike(!like)
  //   mutate(openModal)
  // }



//   const handleLikeBtn =  () => {
//     // if (!isLogin) return navigate("/login");
// axios
//       .post(
//         `http://sayo.n-e.kr:8080/wishes/${itemId}`, {
//           headers: {
//             Authorization: accessToken.split('Bearer ' )[1]
//         }
//   })
//       .then((res) => {
//         console.log(res)
//         // setDeprecate(!deprecate);
//         // refetch();
//         // toast.success("비추천이 완료되었습니다");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

  return (
    <S.DetailWrap>
      <S.DetailContainer>
        <S.ImageDiv>
          <div className="ProductImg" >
           <img src={Items.itemPicture} alt="goods"></img> 
          </div>
        </S.ImageDiv>
        <S.ProductInfoDiv>
          <div className="Product">
            <div className="ProductName">{Items.itemName}</div>
            {like ? <BsHeartFill
              onClick={handleLikeBtn}
              size="20"
              style={{ marginLeft: "10px", color: "#d3d3d3" }}
            />:<BsHeartFill
            size="20"
            onClick={handleLikeBtn}
            style={{ marginLeft: "10px", color: "#eb1717" }}
          />}
          </div>
          <div className="ProductPrice">판매가 : {Items.itemPrice}원</div>
          <div className="ProductFee">배송비 : {Items.itemDeliveryPrice}원</div>
          <div className="SalesSchedule">판매일정 : {Items.itemDateStart} ~ {Items.itemDateEnd}
            {/* <Calendar/> */}
          </div>
          <S.ButtonDiv>
            <S.CartBtn onClick={PostCart}>장바구니</S.CartBtn>
            <S.BuyBtn>
              <Link to="/payment">바로 구매</Link>
            </S.BuyBtn>
          </S.ButtonDiv>
        </S.ProductInfoDiv>
      </S.DetailContainer>
      <Modal
        open={modalOpen}
        close={closeModal}
        header="장바구니에 상품이 성공적으로 담겼습니다."
      >
        <div>장바구니로 이동하시겠습니까?</div>
      </Modal>
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
            <MapMarker position={{ lat: Items.latitude, lng: Items.longitude }} />
          )}
        </Maps>
      </S.DetailDiv>
    </S.DetailWrap>
  );
};

export default Detail;
