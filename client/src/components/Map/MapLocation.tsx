import { useEffect, useState,useRef } from "react";
import { Maps } from "./styled";
import { MapMarker } from 'react-kakao-maps-sdk';

// kakao 글로벌로 선언
declare global {
  interface Window {
    kakao: any;
  }
}

type Position  = {
  latitude: any; 
  longitude: any;
}


const MapLocation = () => {

  // 마커
  const [marked, setMarked] = useState<Position| null >()
  // 현재 나의 위치
  const [location, setLocation]  = useState<Position| null >()


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

  console.log("marked" , marked);

  return (
    <>
    {location && (
				<Maps 
                  center={{ lat: location.latitude, lng: location.longitude }} 
                  style={{ width: '800px', height: '600px' }} 
                  level={3}
                  onClick={(_t: any, mouseEvent: any) => setMarked({
                    latitude: mouseEvent.latLng.getLat(),
                    longitude: mouseEvent.latLng.getLng(),
                  })}
                >
				{ marked && <MapMarker position={{ lat: marked.latitude, lng: marked.longitude }}

        />}
				</Maps>
			)}
    </>
  
      

  );
};
export default MapLocation;
