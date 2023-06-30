import * as S from "./styled";
import { useRecoilState } from "recoil";
import { salesLocation } from "../../recoil/atom";
import { Location } from "../../pages/Map/Map";
import { Position } from "./MapLocation";

import { useEffect, useState } from "react";
// kakao 글로벌로 선언
declare global {
  interface Window {
    kakao: any;
  }
}


const MapMain = () => {
 
  // 현재 마커 저장할 state
  const [position, setPosition] = useState()
  const [clickPoint, setClickPoint] = useRecoilState(salesLocation);

  const [location, setLocation] = useState<Position | null>();
  
  useEffect(() => {
    getMyGps();
  }, []);

  // 현재 위치를 불러오는 함수
  const getMyGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position: any) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    function error() {
      setLocation({
        latitude: 37.5668872688006,
        longitude: 126.97863243245928,
      });
      console.log("위치 받기 실패");
    }
  };


  return (
    <>
      {location && (
      <S.Maps
   center={{ lat: location.latitude, lng: location.longitude }}
   style={{ width: "800px", height: "600px" }}
   level={3}
 >
      </S.Maps>
      )}
    </>
  );
};
export default MapMain;
