import * as S from "./styled";
import DatePicker from "react-datepicker";
import React, { useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import MapLocation from "../../components/Map/MapLocation";
import { useCustomMutation } from "../../components/util/useMutation";
import { useRecoilState } from "recoil";
import { salesLocation } from "../../recoil/atom";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Write = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [goodsName, setGoodsName] = useState<string>("");
  const [goodsPrice, setGoodsPrice] = useState<number>(0);
  const [deliveryCharge, setDeliveryCharge] = useState<number>(0);
  const [goodsDetail, setGoodsDetail] = useState<string>("");
  const [markLocation, setMarkLocation] = useRecoilState(salesLocation);
  const [goodsCategoryId, setGoodsCategoryId] = useState<number>(3);

  const navigate = useNavigate()


  //카테고리 id 값을 보냄
  const selectChange = (e: any) => {
    setGoodsCategoryId(Number(e.target.value));
  };

  const { mutate, isLoading } = useCustomMutation(`/items`, `items`, "POST", {
    onSuccess: (result:any) => {
      console.log(result); // 성공한 뒤의 결과 값 출력
      // 추가적인 로직 수행
    }
  });

  const submitKeyPress = () => {
    console.log(uploadedFile)
    mutate({
      itemName: goodsName,
      itemPicture: uploadedFile,
      itemPrice: goodsPrice,
      itemDeliveryPrice: deliveryCharge,
      itemDateStart: startDate,
      itemDateEnd: endDate,
      itemBody: goodsDetail,
      location: markLocation,
      categoryId: goodsCategoryId,
    })
    toast.success("등록이 완료되었습니다")
    navigate('/')
  };

  const [imgFile, setImgFile]: any = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  // 이미지 업로드 api
  const submitImage = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append("itemPicture", uploadFile);
      console.log(formData.getAll("itemPicture"));

      axios
        .post(`http://sayo.n-e.kr:8080/items/upload`, formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          const presignedUrl = res.data.data;
          setImgFile(res.data.data);
          uploadImageToS3(presignedUrl, uploadFile)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function uploadImageToS3(presignedUrl: string, uploadFile: File) {
    setUploadedFile(uploadFile.name)
    console.log(uploadedFile) // 업로드할 파일 확인
  
    axios
      .put(presignedUrl, uploadFile, {
        headers: {
          'Content-Type': 'image/png', // 업로드할 파일의 콘텐츠 유형 지정
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }

  if (isLoading) return <Loading />;

  return (
    <S.WriteWrap>
      <S.WriteContainer>
        <img
          src={imageUrl === null ? <S.Image /> : imageUrl}
          alt="이미지를 선택해 주세요"
          style={{ width: "40%", borderRadius: "20px" }}
        />
        <input
          type="file"
          accept="image/*"
          name="goods_img"
          id="productImg"
          onChange={submitImage}
          ref={imgRef}
        />
        <label htmlFor="productImg">
          {/* <div className="upLoad">이미지 업로드</div> */}
        </label>
        {/* <ModifyImage /> */}
        {/* </S.ImageDiv> */}
        <S.BtnDiv>
          {/* <S.SubmitBtn onClick={uploadImageToS3}>이미지 업로드</S.SubmitBtn> */}
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
              placeholder="숫자로만 입력해주세요 (ex.1000)"
              onChange={(e) => {
                setGoodsPrice(Number(e.target.value));
              }}
            />
          </S.InputDiv>
          <S.InputDiv>
            <S.InputLabel> 배송비</S.InputLabel>
            <S.WriteInput
              type="text"
              placeholder="숫자로만 입력해주세요 (ex.1000)"
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
              <option value="3">생활용품</option>
              <option value="9">식품</option>
              <option value="10">건강식품</option>
              <option value="12">화장품</option>
              <option value="13">스포츠용품</option>
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
