import * as S from "./styled";
import MapMain from "../../components/Map/MapMain";

const Write = () => {
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
          <S.InputDiv>공구일정</S.InputDiv>
          <S.InputDiv>
            <S.InputLabel> 상세정보</S.InputLabel>
            <S.WriteInput type="text" />
          </S.InputDiv>
          <S.InputDiv>위치</S.InputDiv>
          <MapMain></MapMain>
        </S.WriteForm>
      </S.WriteContainer>
    </S.WriteWrap>
  );
};

export default Write;
