import * as S from "./styled";
import { useEffect, useState } from "react";
import { Map, MapMarker } from 'react-kakao-maps-sdk';


// kakao 글로벌로 선언
declare global {
  interface Window {
    kakao: any;
  }
}

interface Position {
  lat: number;
  lng: number;
}


const MapMain = () => {
  // 현재 마커 저장할 state
  const [position, setPosition] = useState<Position[]>([]);


  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map") as HTMLElement;
    let options = {
      center: new kakao.maps.LatLng(37.5668872688006, 126.97863243245928),
      level: 5,
    };
    //map
    const map = new kakao.maps.Map(container, options);

    let marker = new kakao.maps.Marker({ 
      // 지도 중심좌표에 마커를 생성합니다 
      position: map.getCenter() 
  }); 
  // 지도에 마커를 표시합니다
  marker.setMap(map);

  kakao.maps.event.addListener(map, 'click', function(mouseEvent: any) {        
    
    // 클릭한 위도, 경도 정보를 가져옵니다 
    let latlng = mouseEvent.latLng; 
    console.log(latlng)
    // 현재 위치 저장
    setPosition(latlng);
    
    // 마커 위치를 클릭한 위치로 옮깁니다
    marker.setPosition(latlng);
    
    let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
    message += '경도는 ' + latlng.getLng() + ' 입니다';
    

    
});
  };



  return (
    <div id="map" style={{ width: '550px', height: '400px' }}>
      {/* <Map center={{ lat: position.lat, lng: position.lng }}>
      {markers.map((marker, index) => (
        <MapMarker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
      ))}
      </Map> */}
    </div>
  );
};
export default MapMain;







