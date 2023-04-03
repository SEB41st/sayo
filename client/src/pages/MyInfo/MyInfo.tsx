import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import * as S from "./styled";
import DaumPostcode from 'react-daum-postcode';
import { useCustomMutation } from "../../components/util/useMutation";

const MyInfo = () => {

  // const {userId} = useParams()
  const userId = localStorage.getItem("userId");
  const [change, setChange] = useState<boolean>(false)
  const [isOpenPost, setIsOpenPost] = useState<boolean>(false);
  const [addressCode, setAddressCode] = useState(''); // 주소
  const [address, setAddress] = useState(''); // 주소
  const [addressDetail, setAddressDetail] = useState(''); // 상세주소
  const [phoneNum, setPhoneNumber] = useState('')
  // const [getNickname, setNickname] = useRecoilState(nickname)
  const navigate = useNavigate()

  const {data, isLoading, error} = useCustomQuery(
    `/users/${userId}/mypage`,
    `users=${userId}/mypage`
  )

  const { mutate } = useCustomMutation(
    `/addresses`,
    `addresses`,
    "POST"
  );


  if (isLoading) return <Loading/>;
  if (error) return <Error/>;

  const users = data.data;
  // console.log(users)

  

  const handleLogout = () => {
      axios
      .post(
        `http://sayo.n-e.kr:8080/users/logout`,
        {
          Authorization : localStorage.getItem("accessToken"),
          refreshToken : localStorage.getItem("refreshToken")
        },
      )
      .then((res) => {
        localStorage.clear();
        navigate("/");
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
        navigate("/");
        window.location.reload()
      });
  };

  

  const changeAddressConform = () => {
      mutate({
        addressName:"주소명칭",
        addressUserName:"회원이름",
        phoneNumber:phoneNum,
        postcode: addressCode,
        roadAddress: addressDetail,
        detailAddress:address})
      console.log(phoneNum,addressCode,addressDetail,address)
      alert("수정이 완료되었습니다");
      // refetch();
  };


  const changeAddress = () => {
    setChange(!change);
    // console.log(phoneNum)
  }

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data:any) => {
    let fullAddr = data.address;
    console.log(data.address)
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setAddressCode(data.zonecode);
    console.log(data.zonecode)
    setAddressDetail(fullAddr);
    setIsOpenPost(false);
  };

  const PhoneNumChange = (e:any) => {
    console.log(e.target.value)
    setPhoneNumber(e.target.value)
  }

  const addressChange = (e:any) => {
    console.log(e.target.value)
    setAddress(e.target.value)
  }

    return (
        <S.MypageWrap>
        <S.MypageContainer>
          <S.ImageDiv src={users.profile[0].image}></S.ImageDiv>
          <S.MypageDiv>
            <span className="Name">이름</span>
            <span className="UserName">{users.profile[0].nickname}</span>
          </S.MypageDiv>
          {change ? (
          <>
            <S.PostCode>
              <span className="Name">핸드폰 번호</span>
              <input
              type="text"
              className="input"
              placeholder="'-'형태로 입력해주세요"
              onChange={PhoneNumChange}
              >
              </input>

            </S.PostCode>
            <S.MypageDiv>
              {/* <span >주소</span> */}
              <button className="Name" onClick={onChangeOpenPost}>우편번호</button>
              {isOpenPost  ? (
            <S.PostCode><DaumPostcode className="PostCodeStyle" autoClose onComplete={onCompletePost} /></S.PostCode>
          ) : null}{addressCode}
            <br/><div>{addressDetail}</div>
            </S.MypageDiv>
            <S.MypageDiv>
              <span className="Name">세부 주소</span>
              <input
              type="text"
              placeholder="나머지 주소를 입력해주세요"
              onChange={addressChange}
              >
              </input>
            </S.MypageDiv>
            <S.LogoutBtn onClick={changeAddressConform}>확인</S.LogoutBtn>
          </>
          ) : (
          <>
            <S.MypageDiv>
              <span className="Name">핸드폰 번호</span>
              {users.addressList.length === 0 ? null:( <span className="address">{users.addressList[0].phoneNumber} </span>)}
            </S.MypageDiv>
            <S.MypageDiv>
              <span className="Name">주소</span>
              {users.addressList.length === 0 ? null : (<span className="address">{users.addressList[0].roadAddress}, {users.addressList[0].detailAddress} </span>)}

            </S.MypageDiv>
            <S.LogoutBtn onClick={changeAddress}>주소수정</S.LogoutBtn>
          </>
          )}
        </S.MypageContainer>
        <S.ButtonDiv>
          <S.LogoutBtn onClick={handleLogout}>로그아웃</S.LogoutBtn>
          <S.LogoutBtn>회원탈퇴</S.LogoutBtn>
        </S.ButtonDiv>
      </S.MypageWrap>
    )
}
export default MyInfo;