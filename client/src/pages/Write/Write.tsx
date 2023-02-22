import * as S from "./styled";

const Write = () => {
  return (
    <S.WriteWrap>
      <S.WriteContainer>
        <S.Imeage></S.Imeage>
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
          <S.InputDivs>공구일정</S.InputDivs>
          <S.InputDiv>
            <S.InputLabel> 상세정보</S.InputLabel>
            <S.WriteInput type="text" />
          </S.InputDiv>
          <S.InputDivs>위치</S.InputDivs>
        </S.WriteForm>
      </S.WriteContainer>
    </S.WriteWrap>
  );
};

export default Write;
