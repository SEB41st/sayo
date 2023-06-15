import { useEffect, useState,useRef } from "react";
import { Maps } from "./styled";
import { MapMarker } from 'react-kakao-maps-sdk';
import { useRecoilState } from "recoil";
import { salesLocation } from "../../recoil/atom";


// kakao 글로벌로 선언
declare global {
  interface Window {
    kakao: any;
  }
}

export type Position  = {
  latitude: any; 
  longitude: any;
}


const MapLocation = () => {

  
  // 현재 나의 위치
  const [location, setLocation]  = useState<Position| null >()
  // 판매위치 
  const [markLocation, setMarkLocation] = useRecoilState(salesLocation);


  //getMyGps를 찍어줌
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
				<Maps 
                  center={{ lat: location.latitude, lng: location.longitude }} 
                  level={3}
                  onClick={(_t: any, mouseEvent: any) => setMarkLocation({
                    latitude: mouseEvent.latLng.getLat(),
                    longitude: mouseEvent.latLng.getLng(),
                  })}
                >
				{ markLocation && <MapMarker position={{ lat: markLocation.latitude, lng: markLocation.longitude }}
        />}
				</Maps>
			)}
    </>
  
      

  );
};

export default MapLocation;

