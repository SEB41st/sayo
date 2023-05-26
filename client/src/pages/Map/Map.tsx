import React, { useEffect, useState } from "react";
import * as S from "./styled";
import { BsSearch } from "react-icons/bs";
import MapLocation from "../../components/Map/MapLocation";
import { Position } from "../../components/Map/MapLocation";
import { Maps } from "../../components/Map/styled";
import { MapMarker } from "react-kakao-maps-sdk";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { useCustomQuery } from "../../components/util/useCustomQuery";

export type Location = {
  lat: any;
  lng: any;
};

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

  const [info, setInfo] = useState([]);
  const [markers, setMarkers] = useState<Array<Marker>>([]);
  const [map, setMap] = useState<Map | undefined>();

  useEffect(() => {
    console.log(1);
    // if (!map) return;
    // const mapContainer = document.getElementById("map"), // 지도를 표시할 div
    //   mapOption = {
    //     center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    //     level: 3, // 지도의 확대 레벨
    //   };
    //   console.log(2);  

    //   const map = new kakao.maps.Map(mapContainer, mapOption);
    // console.log(mapContainer);  
    const geocoder = new kakao.maps.services.Geocoder();
    

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(searchvalue, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(
          Number(result[0].y),
          Number(result[0].x)
        );
      

        // map.setCenter(coords);
        setInfo(result);
      }
    });
  }, [searchvalue]);

  // 지도 리스트 불러오기
  const { data, isLoading, error, refetch } = useCustomQuery(
    `/items/get?page=1&size=100`,
    `items/list`
  );

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const Items = data.data;
  console.log(Items);
  console.log(info);

  return (
    <div>
      {info.length === 0 ? (
        location && (
          <Maps
            center={{ lat: location.latitude, lng: location.longitude }}
            level={3}
          >
            {Items &&
              Items.map((item: any) => {
                return (
                  <MapMarker
                    position={{ lat: item.latitude, lng: item.longitude }}
                    title={item.itemName}
                  >
                    <div
                      style={{ width: "50px", padding: "5px", color: "#000" }}
                    >
                      {item.itemName}
                    </div>
                  </MapMarker>
                );
              })}
          </Maps>
        )
      ) : searchvalue ? (
        info && (
          <Maps
            center={{ lat: Number(info[0].y), lng: Number(info[0].x) }}
            level={3}
          >
            {Items &&
              Items.map((item: any) => {
                return (
                  <MapMarker
                    position={{ lat: item.latitude, lng: item.longitude }}
                    title={item.itemName}
                  >
                    <div
                      style={{ width: "50px", padding: "5px", color: "#000" }}
                    >
                      {item.itemName}
                    </div>
                  </MapMarker>
                );
              })}
          </Maps>
        )
      ) : (
        <Loading></Loading>
      )}
      <S.SearchBar>
        <input
          className="Search"
          type="text"
          placeholder="원하는 장소의 주소를 입력해주세요"
          onChange={searchResult}
          onKeyPress={onKeyPressEnter}
        ></input>
        <BsSearch style={{ marginLeft: "10px" }} onClick={search} />
      </S.SearchBar>
    </div>
  );
};

export default MapContainer;