import { useEffect, useState } from "react";
import { Maps } from "./styled";
import { useRecoilState } from "recoil";
import { salesLocation } from "../../recoil/atom";
import { MapMarker } from "react-kakao-maps-sdk";

const MapSalesLoaction = () => {
  // const location = SalesLocation;

  // console.log(SalesLocation)

  // 현재 마커 저장할 state
  const [position, setPosition] = useState();
  // 판매위치
  const [markLocation, setMarkLocation] = useRecoilState(salesLocation);

  console.log("markLocation", markLocation);

  return (
    <>
      <Maps
        center={{
          lat: markLocation.latitude,
          lng: markLocation.longitude,
        }}
        isPanto={true}
      >
        {markLocation && (
          <MapMarker
            position={{
              lat: markLocation.latitude,
              lng: markLocation.longitude,
            }}
          />
        )}
      </Maps>
    </>
  );
};

export default MapSalesLoaction;
