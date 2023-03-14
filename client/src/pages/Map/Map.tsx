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

  return (
    <div>
      {location && (
        <Maps
          center={{ lat: location.latitude, lng: location.longitude }}
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
