import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import * as S from "./styled";
import { nickname } from "../../recoil/atom";
import { useRecoilState } from "recoil";

const MyInfo = () => {

  // const {userId} = useParams()
  const userId = localStorage.getItem("userId");
  const [getNickname, setNickname] = useRecoilState(nickname)
  const navigate = useNavigate()

  // const {data, isLoading, error} = useCustomQuery(
  //   `/users/${userId}`,
  //   `users=${userId}`
  // )

  // if (isLoading) return <Loading/>;
  // if (error) return <Error/>;

  // const users = data;
  // console.log(users)


  useEffect(()=> {
    axios
    .get(`http://sayo.n-e.kr:8080/users/${userId}/mypage`,
    {
      headers: {
        // "Content-Type": "application/json;charset=UTF-8",
        // Accept: "application/json",
        Authorization : localStorage.getItem("Authorization"),
      },
    })
    .then((res) => {
      console.log(res.data.data.profile[0])
      setNickname(res.data.data.profile[0].nickname)
    })
    .catch((error) => {
      console.log(error);
    });
  },[])

  const handleLogout = () => {
      axios
      .post(
        `http://sayo.n-e.kr:8080/users/logout`,
        {
          Authorization : `Bearer ${localStorage.getItem("Authorization")}`,
          // refreshToken : localStorage.getItem("refreshToken")
        },
      )
      .then((res) => {
        // localStorage.clear();
        // navigate("/");
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
        navigate("/");
      });
  };
    return (
        <S.MypageWrap>
        <S.MypageContainer>
          <S.ImageDiv src="/assets/Github.png"></S.ImageDiv>
          <S.MypageDiv>
            <span className="Name">이름</span>
            <span className="UserName">{getNickname}</span>
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
          <S.LogoutBtn onClick={handleLogout}>로그아웃</S.LogoutBtn>
          <S.LogoutBtn>회원탈퇴</S.LogoutBtn>
        </S.ButtonDiv>
      </S.MypageWrap>
    )
}
export default MyInfo;