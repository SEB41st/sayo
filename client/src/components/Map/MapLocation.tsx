import { useEffect, useState, } from "react";

// kakao 글로벌로 선언
declare global {
  interface Window {
    kakao: any;
  }
}

interface Position {
  // lat: number;
  // lng: number;
  latlng: any;
}


const MapLocation = () => {

  // 현재 마커 저장할 state
  // const [marked, setMarked] = useState<{ latitude: number; longitude: number } | Array<any> >([]);
  const [marked, setMarked] = useState<Position[]>([]);

  // 현재 나의 위치
  const [location, setLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

  //getMyGps를 찍어줌
  useEffect(() => {
    getMyGps();
  }, []);

  // 현재 위치인 상태로 지도를 랜더링 해줌
  useEffect(() => {
    if (location && typeof location !== "string") {
      mapDrawer();
    }
  }, [location]);

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
        latitude: 37.483034,
        longitude: 126.902435,
      });
      console.log("위치 받기 실패");
    }
  };

  const mapDrawer = () => {

    if (typeof location !== "string") {
      const container = document.getElementById("map") as HTMLElement;
      const options = {
        center: new kakao.maps.LatLng(location.latitude, location.longitude),
        level: 2,
        // isLoading: true,
      };

      let map = new kakao.maps.Map(container, options);
      let marker = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다
        position: map.getCenter(),
      });
      // 지도에 마커를 표시합니다
      marker.setMap(map);
  

      kakao.maps.event.addListener(map, "click", function (mouseEvent: any) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        let latlng = mouseEvent.latLng;

        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latlng);

        // 현재 위치 저장 // 값이 변하지 않음
        setMarked(latlng);

        // 현재 위치 값을 담고 있는 변수
        const Mylocation = latlng;
               
        console.log("marked", marked); // 변화가 없음
        console.log("Mylocation", Mylocation); // 변화가 없음

  
      });
      
    }
  };

  return (
    <div id="map" style={{ width: "0px", height: "0px" }}>
      {/* <Map center={{ lat: position.lat, lng: position.lng }}>
        {markers.map((marker, index) => (
          <MapMarker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
        </Map> */}
    </div>
  );
};
export default MapLocation;
