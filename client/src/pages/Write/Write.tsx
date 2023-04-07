import * as S from "./styled";
import MapMain from "../../components/Map/MapMain";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import MapLocation from "../../components/Map/MapLocation";
import { useCustomMutation } from "../../components/util/useMutation";
import { useRecoilState } from "recoil";
import { salesLocation } from "../../recoil/atom";
import ModifyImage from "../../components/ModifyImage/ModifyImage";

const Write = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [goodsName, setGoodsName] = useState<string>("");
  const [goodsPrice, setGoodsPrice] = useState<number>(0);
  const [deliveryCharge, setDeliveryCharge] = useState<number>(0);
  const [goodsDetail, setGoodsDetail] = useState<string>("");
  const [markLocation, setMarkLocation] = useRecoilState(salesLocation);
  const [goodsCategoryId, setGoodsCategoryId] = useState<number>(1);

  //카테고리 id 값을 보냄
  const selectChange = (e: any) => {
    setGoodsCategoryId(Number(e.target.value));
  };

  const { mutate } = useCustomMutation(`/items`, `items`, "POST");

  const submitKeyPress = () => {
    mutate({
      itemName: goodsName,
      itemPicture: "https://i.ibb.co/t3vdVB0/goods.png",
      itemPrice: goodsPrice,
      itemDeliveryPrice: deliveryCharge,
      itemDateStart: startDate,
      itemDateEnd: endDate,
      itemBody: goodsDetail,
      location: markLocation,
      categoryId: goodsCategoryId,
    });
  };

  // 이미지 업로드 api
  const submitImage = () => {};

  // console.log(goodsName)
  // console.log(startDate, endDate);
  return (
    <S.WriteWrap>
      <S.WriteContainer>
        {/* <S.ImageDiv> */}
          <ModifyImage />
        {/* </S.ImageDiv> */}
        <S.BtnDiv>
          {/* <S.SubmitBtn onClick={submitImage}>이미지 업로드</S.SubmitBtn> */}
          <S.SubmitBtn onClick={submitKeyPress}>등록하기</S.SubmitBtn>
        </S.BtnDiv>

        <S.WriteForm>
          <S.InputDiv>
            <S.InputLabel> 상품명</S.InputLabel>
            <S.WriteInput
              type="text"
              onChange={(e) => {
                setGoodsName(e.target.value);
              }}
            />
          </S.InputDiv>
          <S.InputDiv>
            <S.InputLabel> 가격</S.InputLabel>
            <S.WriteInput
              type="text"
              onChange={(e) => {
                setGoodsPrice(Number(e.target.value));
              }}
            />
          </S.InputDiv>
          <S.InputDiv>
            <S.InputLabel> 배송비</S.InputLabel>
            <S.WriteInput
              type="text"
              onChange={(e) => {
                setDeliveryCharge(Number(e.target.value));
              }}
            />
          </S.InputDiv>
          <S.InputDiv>
            <S.InputLabel> 카테고리</S.InputLabel>
            <select onChange={selectChange}>
              <option defaultValue="카테고리를 선택해주세요" disabled>
                카테고리를 선택해주세요
              </option>
              <option value="1">의류</option>
              <option value="2">음식</option>
              <option value="3">생활용품</option>
            </select>
          </S.InputDiv>
          <S.InputDiv>
            <S.InputLabel>공구시작</S.InputLabel>
            <S.Day>
              <DatePicker
                dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                className="input-datepicker" // 클래스 명 지정 css주기 위해
                minDate={new Date()} // 선택할 수 있는 최소 날짜값 지정
                closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="공동구매 시작일 선택" // placeholder
                selected={startDate} // value  // 날짜를 선택하였을 때 실행될 함수
                onChange={(date: Date) => setStartDate(date)}
              />
            </S.Day>
          </S.InputDiv>
          <S.InputDiv>
            <S.InputLabel>공구종료</S.InputLabel>
            <S.Day>
              <DatePicker
                dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                className="input-datepicker" // 클래스 명 지정 css주기 위해
                minDate={new Date()} // 선택할 수 있는 최소 날짜값 지정
                closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="공동구매 종료일 선택" // placeholder
                selected={endDate} // value  // 날짜를 선택하였을 때 실행될 함수
                onChange={(date: Date) => setEndDate(date)}
              />
            </S.Day>
          </S.InputDiv>
          <S.InputDiv>
            <S.InputLabel> 상세정보</S.InputLabel>
            <S.WriteInput
              type="text"
              onChange={(e) => {
                setGoodsDetail(e.target.value);
              }}
            />
          </S.InputDiv>
          <S.InputDiv>
            <S.InputLabel>위치</S.InputLabel>
            판매 위치를 아래 지도의 마커로 표시해주세요
          </S.InputDiv>
          <MapLocation />
        </S.WriteForm>
      </S.WriteContainer>
    </S.WriteWrap>
  );
};

export default Write;
