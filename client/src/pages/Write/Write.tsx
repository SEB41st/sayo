import * as S from "./styled";
import MapMain from "../../components/Map/MapMain";
import DatePicker from 'react-datepicker'
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import MapLocation from "../../components/Map/MapLocation";

const Write = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  console.log(startDate, endDate)
  return (
    <S.WriteWrap>
      <S.WriteContainer>
        <S.ImageDiv></S.ImageDiv>
        <S.SubmitBtn>등록하기</S.SubmitBtn>
        <S.WriteForm>
          <S.InputDiv>
            <S.InputLabel> 상품명</S.InputLabel>
            <S.WriteInput type="text" />
          </S.InputDiv>
          <S.InputDiv>
            <S.InputLabel> 가격</S.InputLabel>
            <S.WriteInput type="text" />
          </S.InputDiv>
          <S.InputDiv>
            <S.InputLabel> 배송비</S.InputLabel>
            <S.WriteInput type="text" />
          </S.InputDiv>
          <S.InputDiv> 
            <S.InputLabel>공구시작</S.InputLabel>
            <S.Day>
              <DatePicker
              dateFormat="yyyy-MM-dd"    // 날짜 형식 설정
              className="input-datepicker"    // 클래스 명 지정 css주기 위해
              minDate={new Date()}    // 선택할 수 있는 최소 날짜값 지정 
              closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
              placeholderText="공동구매 시작일 선택"    // placeholder
              selected={startDate}    // value  // 날짜를 선택하였을 때 실행될 함수
              onChange={(date: Date) => setStartDate(date)}
              />
            </S.Day>
            </S.InputDiv>
            <S.InputDiv>
            <S.InputLabel>공구종료</S.InputLabel>
            <S.Day>
              <DatePicker
              dateFormat="yyyy-MM-dd"    // 날짜 형식 설정
              className="input-datepicker"    // 클래스 명 지정 css주기 위해
              minDate={new Date()}    // 선택할 수 있는 최소 날짜값 지정 
              closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
              placeholderText="공동구매 종료일 선택"    // placeholder
              selected={endDate}    // value  // 날짜를 선택하였을 때 실행될 함수
              onChange={(date: Date) => setEndDate(date)}
              />
            </S.Day>
             </S.InputDiv>
          <S.InputDiv>
            <S.InputLabel> 상세정보</S.InputLabel>
            <S.WriteInput type="text" />
          </S.InputDiv>
          <S.InputDiv>
            <S.InputLabel>위치</S.InputLabel>
          </S.InputDiv>
          <MapMain></MapMain> {/*처음에 지도를 랜더링 해줌*/}
          <MapLocation></MapLocation> {/*내 위치로 마커가 변경되고 그 상태에서 마커를 찍을 수 있음*/}
        </S.WriteForm>
      </S.WriteContainer>
    </S.WriteWrap>
  );
};

export default Write;
