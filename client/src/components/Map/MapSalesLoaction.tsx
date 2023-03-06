import { useEffect, useState, } from "react";

// interface Props {
//   SalesLocation: React.Dispatch<React.SetStateAction<Array<>>>;
// }

const MapSalesLoaction = () => {

  // const location = SalesLocation;
  
  // console.log(SalesLocation)

useEffect(() => {

  

  // const Map = () => {                          

    let markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

    // 이미지 지도에 표시할 마커입니다
    // 이미지 지도에 표시할 마커는 Object 형태입니다
    let marker = {
      position: markerPosition,
    };

    let staticMapContainer = document.getElementById(
        "staticMap"
      ) as HTMLElement, // 이미지 지도를 표시할 div
      staticMapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 이미지 지도의 중심좌표
        level: 3, // 이미지 지도의 확대 레벨
        marker: marker, // 이미지 지도에 표시할 마커
      };

    // 이미지 지도를 생성합니다
    let staticMap = new kakao.maps.StaticMap(
      staticMapContainer,
      staticMapOption
    );
    }, []);
  // };

  return (
    <>
      <div id="staticMap" style={{ width: "0px", height: "0px" }}></div>
    </>
  )

};

export default MapSalesLoaction;
