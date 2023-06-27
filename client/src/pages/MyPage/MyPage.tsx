import * as S from "./styled";
import { Link, useLocation } from "react-router-dom";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { useState, useEffect } from "react";
import { useCustomMutation } from "../../components/util/useMutation";
import axios from "axios";
import { BsPlusCircle, BsSearch } from "react-icons/bs";
import {EndImg} from "../../components/EachItem/Styled"

const Mypage = () => {
  const [nickName, setNickName] = useState("");
  const [imgae, setImgae] = useState("");
  // const [myItem, setMyItem] = useState([]);

  const params = useLocation();
  const userId = localStorage.getItem("userId");

  const { data:wish, isLoading:userLoading, error:userError } = useCustomQuery(
    `/wishes/user/${userId}/wish`,
    `wishes/user/${userId}/wish`
  );
  const { data:myItemList, isLoading, error, refetch } = useCustomQuery(
    `/items/get?page=1&size=100`,
    `items/get?page=1&size=100`
  );
  // console.log(myItemList.data)

  useEffect(() => {
    axios(`http://sayo.n-e.kr:8080/users/${userId}/mypage`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((res: any) => {
        setNickName(res.data.data.profile[0].nickname);
        setImgae(res.data.data.profile[0].image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;
  if (userLoading) return <Loading></Loading>;
  if (userError) return <Error></Error>;
  refetch();

  const wishItems = wish.data;
  console.log(wishItems)
  const myItem = myItemList.data;
  console.log(myItem)


  const hasMyId = myItem.filter((item:any) => item.userId === Number(userId));

  const CommaFormat = (x: any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


  const closeItem = async (itemId: any) => {
    await axios
      .delete(`http://sayo.n-e.kr:8080/items/${itemId}`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <S.MypageWrap>
      <div className="Title">마이페이지</div>
      <S.MypageContainer>
        <S.ImageDiv src={imgae}></S.ImageDiv>
        <div className="Nickname">{nickName}</div>
      </S.MypageContainer>
      <S.Line />
      <S.ProductListName>내가 찜한 상품</S.ProductListName>
      {wishItems.length === 0 ? null :
        <S.ProductList>
          전체보기
          <Link to="/mywishList">
            <BsPlusCircle className="plusIcon" />
          </Link>
        </S.ProductList>
      }
      <S.Lists>
        {wishItems.length === 0 ? (
          <div className="nullItem">원하는 상품을 찜해주세요 !</div>
        ) : (
          wishItems &&
          wishItems.map((item: any) => (
            <S.ChoiceList>
              <Link to={`/detail/${item.itemId}`}>
                <S.ItemImg>
                  <img src={item.itemPicture} alt="goods"></img>
                </S.ItemImg>
                <S.ItemName>
                  <div>{item.itemName}</div>
                  <div>{CommaFormat(item.itemPrice)}원</div>
                </S.ItemName>
              </Link>
            </S.ChoiceList>
          ))
        )}
      </S.Lists>
      <S.Line />
      <S.ProductListName>참여 중인 공동구매
      <div>결제 취소를 원하시면 관리자에게 문의하세요 !</div></S.ProductListName>
      <S.Lists>
        <S.ChoiceList>
          <Link to="/detail">
            <S.ItemImg>
              <img src="/assets/goods.png" alt="goods"></img>
            </S.ItemImg>
            <S.ItemName>
              <span>상품명</span>
              <span> 목포 쫀드기</span>
              <span>구매일</span>
              <span> 2023.02.03</span>
              {/* <span>송장번호</span>
              <span> 3827498379238</span> */}
            </S.ItemName>

          </Link>
          <Link to="/detail">

          </Link>
        </S.ChoiceList>
      </S.Lists>
      <S.Line />
      <S.ProductListName>내가 작성한 공동구매
      <div>'x'버튼을 누르면 판매 종료 처리가 됩니다. 상품 완전 삭제는 관리자에게 문의하세요!</div></S.ProductListName>
      {wishItems.length === 0 ? null :
        <S.ProductList>
          전체보기
          <Link to="/myList">
            <BsPlusCircle className="plusIcon" />
          </Link>
        </S.ProductList>
      }
      <S.Lists>
        {hasMyId.length === 0 ? (
          <div className="nullItem">공동구매 상품을 제안해주세요 !</div>
        ) : (
          hasMyId.slice(0, 4) &&
          hasMyId.slice(0, 4).map((item: any) => (
            item.itemStatus === "ITEM_PROGRESS" ? (
            <S.ChoiceList>
              <Link to={`/detail/${item.itemId}`}>
                <S.ItemImg>
                  <img src={item.itemPicture} alt="goods"></img>
                </S.ItemImg>
                <S.ItemName>
                  <div>{item.itemName}</div>
                  <div>{CommaFormat(item.itemPrice)}원</div>
                </S.ItemName>
              </Link>
                <button onClick={() => closeItem(item.itemId)}>x</button>
            </S.ChoiceList>
          ) : <S.ChoiceList>
          <Link to={`/detail/${item.itemId}`}>
            <S.ItemImg>
            <S.EndItemImg> 판매 종료 </S.EndItemImg>
              <img src={item.itemPicture} alt="goods"></img>
            </S.ItemImg>
            <S.ItemName>
            <div>{item.itemName}</div>
                  <div>{CommaFormat(item.itemPrice)}원</div>
            </S.ItemName>
          </Link>
        </S.ChoiceList>))
        )}
      </S.Lists>
    </S.MypageWrap>
  );
};

export default Mypage;
