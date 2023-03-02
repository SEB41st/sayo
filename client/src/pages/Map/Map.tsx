import React, { useEffect, useState } from 'react';
import * as S from "./styled";
import { BsSearch } from 'react-icons/bs';

const MapContainer = () => {
  const [value, setValue] = useState("")

    useEffect(() => {
    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    let infowindow = new kakao.maps.InfoWindow({zIndex:1});
    // console.log(infowindow)
    let container = document.getElementById('map') as HTMLElement; //지도를 담을 영역의 DOM 레퍼런스
    // console.log(container)
    let options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 2 //지도의 레벨(확대, 축소 정도)
    };
    // 이미 만들어진 청사진 (kakao.maps.Map)을 가지고 새로운 객체를 만든 것이(new)map임
    // class의 파라미터가 container, options을 가지고 있음
    let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    // console.log(map)

        if (!map) return console.log("fine")

        const ps = new kakao.maps.services.Places()
        ps.keywordSearch("영등포 맛집", (data : any, status: any, _pagination: any) => {
            if (status === kakao.maps.services.Status.OK) {
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
              // LatLngBounds 객체에 좌표를 추가합니다
              const bounds = new kakao.maps.LatLngBounds()
      
              for (var i = 0; i < data.length; i++) {
                displayMarker(data[i])

                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
              }
      
              // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
              // 저거는 무조건 null이 아니다 라는 것을 알려주는 것 mmm!
              map!.setBounds(bounds)
            }
          })
     
    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place : any) {
        // 마커를 생성하고 지도에 표시합니다
        let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }
    }, [])
    const searchResult = (e:any) => {
     setValue(e.target.value)

    }
    const search = () => {
      console.log(value)

    }
    return (
      <div>
        <div id="map" style={{ width: "90%", height: "80vh" }} />
        <S.SearchBar>
          <input
          className='Search'
          type="text"
          placeholder='검색하실 지역을 입력해주세요'
          onChange={searchResult}
          ></input>
          <BsSearch
            style={{"marginLeft":"10px"}}
            onClick={search}
            />
        </S.SearchBar>
      </div>
    );
}

export default MapContainer; 