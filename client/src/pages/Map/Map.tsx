import React, { useEffect, useState } from "react";
import * as S from "./styled";
import { BsSearch } from "react-icons/bs";
import MapLocation from "../../components/Map/MapLocation";
import { Position } from "../../components/Map/MapLocation";
import { Maps } from "../../components/Map/styled";
import { MapMarker } from "react-kakao-maps-sdk";

export type Location  = {
  lat: any; 
  lng: any;
}

const MapContainer = () => {
  const [value, setValue] = useState<string>("");
  const [searchvalue, setSearchValue] = useState<string>("");

  // 현재 나의 위치
  const [location, setLocation] = useState<Position | null>();

  const searchResult = (e: any) => {
    // console.log(e.target.value)
    setValue(e.target.value);
  };

  const onKeyPressEnter = (e: any) => {
    if (e.key === "Enter") {
      search();
      setValue("");
    }
  };
  const search = () => {
    console.log(value);
    setSearchValue(value);
  };

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

   console.log("location", location);

   
   interface Marker {
     position: {
       lat: any;
       lng: any;
     };
     content: string;
   }
   
   interface Map {
     setBounds: (bounds: any) => void;
   }
   
   const [info, setInfo] = useState<any>();
   const [markers, setMarkers] = useState<Array<Marker>>([]);
   const [map, setMap] = useState<Map | undefined>();
   
   useEffect(() => {
     if (!map) return;
   
     const ps = new kakao.maps.services.Places();
     ps.keywordSearch(
       searchvalue,
       (data: any, status, _pagination) => {
         if (status === kakao.maps.services.Status.OK) {
           const bounds = new kakao.maps.LatLngBounds();
          //  const markers: Array<Marker> = [];
   
           for (let i = 0; i < data.length; i++) {
             markers.push({
               position: {
                 lat: data[i].y,
                 lng: data[i].x,
                
               },
               content: data[i].place_name,
             });
             bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            
           }
           setMarkers(markers);
       
           map.setBounds(bounds);
         }
       }
     );
     console.log("markers", markers)
     
   }, [searchvalue]);

   
   


  // useEffect(() => {
  //   // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
  //   let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  //   // console.log(infowindow)
  //   let container = document.getElementById("map") as HTMLElement; //지도를 담을 영역의 DOM 레퍼런스
  //   // console.log(container)
  //   let options = {
  //     //지도를 생성할 때 필요한 기본 옵션
  //     center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  //     level: 4, //지도의 레벨(확대, 축소 정도)
  //   };
  //   // 이미 만들어진 청사진 (kakao.maps.Map)을 가지고 새로운 객체를 만든 것이(new)map임
  //   // class의 파라미터가 container, options을 가지고 있음
  //   let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  //   // console.log(map)

  //   if (!map) return console.log("fine");
  //   if (searchvalue === "") return console.log("값이 없음");

  //   const ps = new kakao.maps.services.Places();
  //   console.log(ps);
  //   ps.keywordSearch(
  //     searchvalue,
  //     (data: any, status: any, _pagination: any) => {
  //       if (status === kakao.maps.services.Status.OK) {
  //         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //         // LatLngBounds 객체에 좌표를 추가합니다
  //         const bounds = new kakao.maps.LatLngBounds();

  //         for (var i = 0; i < data.length; i++) {
  //           displayMarker(data[i]);

  //           bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
  //         }

  //         // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //         // 저거는 무조건 null이 아니다 라는 것을 알려주는 것 mmm!
  //         map!.setBounds(bounds);
  //       }
  //     }
  //   );

  //   // 지도에 마커를 표시하는 함수입니다
  //   function displayMarker(place: any) {
  //     // 마커를 생성하고 지도에 표시합니다
  //     let marker = new kakao.maps.Marker({
  //       map: map,
  //       position: new kakao.maps.LatLng(place.y, place.x),
  //     });

  //     // 마커에 클릭이벤트를 등록합니다
  //     kakao.maps.event.addListener(marker, "click", function () {
  //       // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
  //       infowindow.setContent(
  //         '<div style="padding:5px;font-size:12px;">' +
  //           place.place_name +
  //           "</div>"
  //       );
  //       infowindow.open(map, marker);
  //     });
  //   }
  // }, [searchvalue]);

  return (
    <div>
      {location && (
        <Maps
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{ width: "800px", height: "600px" }}
          level={3}
        >
          {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info &&info.content === marker.content && (
            <div style={{color:"#000"}}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
        </Maps>
      )}
      <S.SearchBar>
        <input
          className="Search"
          type="text"
          placeholder="원하는 제품을 입력해주세요"
          onChange={searchResult}
          onKeyPress={onKeyPressEnter}
        ></input>
        <BsSearch style={{ marginLeft: "10px" }} onClick={search} />
      </S.SearchBar>
    </div>
  );
};

export default MapContainer;
