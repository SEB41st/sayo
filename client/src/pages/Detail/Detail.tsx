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

export interface LatLng {
  latitude: any;
  longitude: any;
}

const Detail = () => {
  // const [SalesLocation], setSalesLocation] = useState<LatLng[]>( latitude:"", longitude:"" );

  // const [SalesLocation, setSalesLocation] = useState< Array<any> >([]);
  const [modalOpen, SetModalOpen] = useState<boolean>(false);
  const [like, setLike] = useRecoilState(likeState)

  const { itemId } = useParams();

  const { data, isLoading, error, refetch } = useCustomQuery(
    `/items/${itemId}`,
    `items=${itemId}`
  );

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const Items = data;

  // console.log(Items);

  const location: any = Items.location;
  // console.log(location);

  // setSalesLocation(location)
  // const longitude: any = Items.location.Ma;

  const openModal = () => {
    SetModalOpen(true);
  };
  const closeModal = () => {
    SetModalOpen(false);
  };

  const handleLikeBtn = () => {
    setLike(!like)
    console.log(like)
  }

  return (
    <S.DetailWrap>
      <S.DetailContainer>
        <S.ImageDiv>
          <div className="ProductImg"></div>
        </S.ImageDiv>
        <S.ProductInfoDiv>
          <div className="Product">
            <div className="ProductName">{Items.title}</div>
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
          <div className="ProductPrice">판매가 : {Items.itmePrice}</div>
          <div className="ProductFee">배송비 : {Items.deliveryFee}</div>
          <div className="SalesSchedule">판매일정 : {Items.startDate} ~ {Items.endDate}
            {/* <Calendar/> */}
          </div>
          <S.ButtonDiv>
            <S.CartBtn onClick={openModal}>장바구니</S.CartBtn>
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
        <div className="DetailInfoTxt">{Items.itemDatail}</div>
        <div className="DetailLocation">위치</div>
        <Maps
          center={{
            lat: location.Ma,
            lng: location.La,
          }}
          isPanto={true}
        >
          {location && (
            <MapMarker position={{ lat: location.Ma, lng: location.La }} />
          )}
        </Maps>
      </S.DetailDiv>
    </S.DetailWrap>
  );
};

export default Detail;
