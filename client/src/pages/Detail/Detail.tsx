import { Link,useParams } from "react-router-dom";
import * as S from "./styled";
import React, { useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import MapMain from "../../components/Map/MapMain";
import MapSalesLoaction from "../../components/Map/MapSalesLoaction";
import MapLocation from "../../components/Map/MapLocation";

export interface LatLng {
  latitude: any;
  longitude: any;
}

const Detail = () => {
  // const [SalesLocation], setSalesLocation] = useState<LatLng[]>( latitude:"", longitude:"" );

  const [SalesLocation, setSalesLocation] = useState< Array<any> >([]);

  const [value, SetValue] = useState(new Date());

  const { itemId } = useParams();

  const { data, isLoading, error, refetch } = useCustomQuery(
    `/items/${itemId}`,
    `items=${itemId}`
  );


  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const Items = data;

  console.log(Items.location);

  
  // console.log(Items.location.Ma);



  const location: any = Items.location;

  // setSalesLocation(location)

  // setSalesLocation(location);
  // console.log(SalesLocation)
  // const longitude: any = Items.location.Ma;

  return (
    <S.DetailWrap>
      <S.DetailContainer>
        <S.ImageDiv>
          <div className="ProductImg"></div>
        </S.ImageDiv>
        <S.ProductInfoDiv>
          <div className="Product">
            <div className="ProductName">{Items.title}</div>
            <BsHeartFill
              size="20"
              style={{ marginLeft: "10px", color: "#d3d3d3" }}
            ></BsHeartFill>
          </div>
          <div className="ProductPrice">판매가 : {Items.itmePrice}</div>
          <div className="ProductFee">배송비 : {Items.deliveryFee}</div>
          <div className="SalesSchedule">판매일정</div>
          <S.ButtonDiv>
            <S.CartBtn>
              <Link to="/cart">장바구니</Link>
            </S.CartBtn>
            <S.BuyBtn>
              <Link to="/payment">바로 구매</Link>
            </S.BuyBtn>
          </S.ButtonDiv>
        </S.ProductInfoDiv>
      </S.DetailContainer>
      <S.DetailDiv>
        <div className="DetailInfo">상세정보</div>
        <div className="DetailInfoTxt">{Items.itemDatail}</div>
        <div className="DetailLocation">위치</div>
        <MapMain></MapMain>
        {/* <S.StaticMap id="staticMap" /> */}
      </S.DetailDiv>
    </S.DetailWrap>
  );
};

export default Detail;
