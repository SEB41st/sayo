import { Link,useParams } from "react-router-dom";
import * as S from "./styled";
import React, { useEffect, useState } from 'react';
import { BsHeartFill } from "react-icons/bs";
import Error from "../../components/Error/Error";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";

const Detail = () => {

  // const [value, SetValue] = useState(new Date());

  const {id} = useParams(); 

  // useEffect(() => {

  //   let markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 
    
  //   // 이미지 지도에 표시할 마커입니다
  //   // 이미지 지도에 표시할 마커는 Object 형태입니다
  //   let marker = {
  //     position: markerPosition
  //   };
    
  //   let staticMapContainer  = document.getElementById('staticMap') as HTMLElement, // 이미지 지도를 표시할 div  
  //   staticMapOption = { 
  //     center: new kakao.maps.LatLng(33.450701, 126.570667), // 이미지 지도의 중심좌표
  //     level: 3, // 이미지 지도의 확대 레벨
  //     marker: marker // 이미지 지도에 표시할 마커 
  //   };    
    
  //   // 이미지 지도를 생성합니다
  //   let staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
    
  // },[])

  const { data, isLoading, error } = useCustomQuery(`/items`,`items=${id}`);

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  const items = data;
  console.log(items)


  return (
    <S.DetailWrap>
      <S.DetailContainer>
        <S.ImageDiv>
          <div className="ProductImg"></div>
        </S.ImageDiv>
        <S.ProductInfoDiv>
          <div className="Product">
            <div className="ProductName">{items.title}</div>
            <BsHeartFill size="20" style={{marginLeft: "10px", color:"#d3d3d3"}}></BsHeartFill>
          </div>
          <div className="ProductPrice">판매가 : {items.itmePrice}원</div>
          <div className="ProductFee">배송비 : {items.deliveryFee}</div>
          <div className="SalesSchedule">
              판매일정</div>
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
        <div className="DetailInfoTxt">
          깜찍한 아이렌 캐릭터 러기지 네임텍 입니다 설레는 여행을 함께 할 귀여운
          아이렌 형태의 러기지 네임텍 입니다!
        </div>
        <div className="DetailLocation">위치</div>
        {/* <S.StaticMap id='staticMap'/> */}
      </S.DetailDiv>
    </S.DetailWrap>
  );
};

export default Detail;
