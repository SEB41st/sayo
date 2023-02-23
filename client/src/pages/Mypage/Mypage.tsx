import * as S from "./styled";

const Mypage = () => {
  return (
    <S.MypageWrap>
      <S.MypageContainer>
        <S.ImageDiv></S.ImageDiv>
        <S.MypageDiv>
          <span className="Name">이름</span>
          <span className="UserName">장한나</span>
        </S.MypageDiv>
      </S.MypageContainer>
      <S.ButtonDiv>
        <S.LogoutBtn>로그아웃</S.LogoutBtn>
        <S.LogoutBtn>회원탈퇴</S.LogoutBtn>
      </S.ButtonDiv>
    </S.MypageWrap>
  );
};

export default Mypage;
