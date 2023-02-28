import { useEffect, useState } from "react";
import * as S from "./styled";
import { Map,MapMarker } from "react-kakao-maps-sdk";

const KaKaoMap = () => {
    const [state, setState] = useState({
        // 지도의 초기 위치
        center: { lat: 37.49676871972202, lng: 127.02474726969814 },
        // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
        isPanto: true,
      });
      const [searchAddress, SetSearchAddress] = useState();

//     useEffect(() => {
//         let container = document.getElementById("map");
//         let options = {
//           center: new window.kakao.maps.LatLng(
//             37.558090961074825,
//             126.99847210567884
//           ),
//           level: 3,
//         };
    
//         let map = new window.kakao.maps.Map(container, options);
    
//     // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
// var infowindow = new window.kakao.maps.InfoWindow({zIndex:1});

// var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
//     mapOption = {
//         center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
//         level: 3 // 지도의 확대 레벨
//     };  

// 지도를 생성합니다    
// var map = new window.kakao.maps.Map(mapContainer, mapOption); 

// //장소 검색 객체를 생성합니다
// var ps = new window.kakao.maps.services.Places(); 

// // 키워드로 장소를 검색합니다
// ps.keywordSearch('이태원', placesSearchCB); 

// // // 키워드 검색 완료 시 호출되는 콜백함수 입니다
// function placesSearchCB (data:any, status:any, pagination:any) {
//     if (status === window.kakao.maps.services.Status.OK) {

//         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//         // LatLngBounds 객체에 좌표를 추가합니다
//         var bounds = new window.kakao.maps.LatLngBounds();

        // for (var i=0; i<data.length; i++) {
        //     displayMarker(data[i]);    
        //     bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        // }       

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    //     map.setBounds(bounds);
    // } 
// }

// // 지도에 마커를 표시하는 함수입니다
// function displayMarker(place:any) {
    
//     // 마커를 생성하고 지도에 표시합니다
//     var marker = new window.kakao.maps.Marker({
//         map: map,
//         position: new window.kakao.maps.LatLng(place.y, place.x) 
//     });

//     // 마커에 클릭이벤트를 등록합니다
//     window.kakao.maps.event.addListener(marker, 'click', function() {
//         // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
//         infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
//         infowindow.open(map, marker);
//     });
// }
// }, []);

    return (
        <S.Main>
            <Map
      center={{ lat: 37.558090961074825, lng: 126.99847210567884 }}
      id ="map"
    >
    </Map>
        </S.Main>
    )
}

export default KaKaoMap;