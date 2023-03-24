import { useParams } from "react-router";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import * as S from "./styled";

const MyInfo = () => {

  // const {userId} = useParams()
  
  // const {data, isLoading, error} = useCustomQuery(
  //   `/users/${userId}`,
  //   `users=${userId}`
  // )

  // if (isLoading) return <Loading/>;
  // if (error) return <Error/>;

  // const users = data;
  // console.log(users)

    return (
        <S.MypageWrap>
        <S.MypageContainer>
          <S.ImageDiv src="/assets/Github.png"></S.ImageDiv>
          <S.MypageDiv>
            <span className="Name">이름</span>
            <span className="UserName">장한나</span>
          </S.MypageDiv>
          <S.MypageDiv>
            <span className="Name">핸드폰 번호</span>
            <span className="address">010-2345-1234 </span>
          </S.MypageDiv>
          <S.MypageDiv>
            <span className="Name">주소</span>
            <span className="address">서울특별시 영등포구 0000로 00길 0000아파트 101동 101호 </span>
          </S.MypageDiv>
          <S.LogoutBtn>주소수정</S.LogoutBtn>
        </S.MypageContainer>
        <S.ButtonDiv>
          <S.LogoutBtn>로그아웃</S.LogoutBtn>
          <S.LogoutBtn>회원탈퇴</S.LogoutBtn>
        </S.ButtonDiv>
      </S.MypageWrap>
    )
}
export default MyInfo;