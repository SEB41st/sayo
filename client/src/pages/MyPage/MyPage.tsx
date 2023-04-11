import * as S from "./styled";
import { Link, useLocation } from "react-router-dom";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import Modal from "../../components/Modal/Modal";
import { useState, useEffect } from "react";
import { useCustomMutation } from "../../components/util/useMutation";
import axios from "axios";


const Mypage = () => {
  const [modalOpen, SetModalOpen] = useState<boolean>(false);
  const [nickName, setNickName] = useState("");

  const params = useLocation();
  const userId = localStorage.getItem("userId");


  const { data, isLoading, error, refetch } = useCustomQuery(
    `/users/${userId}/mypage`,
    `userId=${userId}`
  );
  // useEffect(() => {
  //   axios
  //     .get(`http://sayo.n-e.kr:8080/users/${userId}/mypage`, {
  //       headers: {
  //         Authorization: localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((res) => {
  //       setNickName(res.data.data.profile[0].nickname);
  //       console.log(res.data.data.profile[0].nickname);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  // const { data, isLoading, error, refetch } = useCustomQuery(`/items/get?page=1&size=10`, `items`);
  // if (isLoading) return <Loading />;
  // if (error) return <Error />;

  const Items = data.data;
  console.log(Items);

  const openModal = () => {
    SetModalOpen(true);
  };
  const closeModal = () => {
    SetModalOpen(false);
  };

  // let {mutate} = useCustomMutation(
  //   `items`,
  //   `items`,
  //   "DELETE"
  // )

  // const deleteGoods = () => {
  //     mutate(Items)
  //     refetch()
  // };

  const deleteGoods = async (itemId:any) => {
      await axios
        .delete(
          `http://sayo.n-e.kr:8080/items/${itemId}`,
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          console.log(res)
          // refetch()
          // window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    };

  return (
    <S.MypageWrap>
      <div className="Title">마이페이지</div>
      <S.MypageContainer>
        <S.ImageDiv src={Items.profile[0].image}></S.ImageDiv>
        <div className="Nickname">{Items.profile[0].nickname}</div>
      </S.MypageContainer>
      <S.Line />
      <S.Lists>
        <div className="Name">내가 찜한 상품</div>
        <S.ChoiceList>
          <Link to="/detail">
            <S.ItemImg>
              <img src="/assets/goods.png" alt="goods"></img>
            </S.ItemImg>
            <S.ItemName>
              <div>목포 쫀드기</div>
              <div>9,900원</div>
            </S.ItemName>
          </Link>
          <Link to="/detail">
            <S.ItemImg>
              <img src="/assets/goods.png" alt="goods"></img>
            </S.ItemImg>
            <S.ItemName>
              <div>목포 쫀드기</div>
              <div>9,900원</div>
            </S.ItemName>
          </Link>
          <Link to="/detail">
            <S.ItemImg>
              <img src="/assets/goods.png" alt="goods"></img>
            </S.ItemImg>
            <S.ItemName>
              <div>목포 쫀드기</div>
              <div>9,900원</div>
            </S.ItemName>
          </Link>
        </S.ChoiceList>
      </S.Lists>
      <S.Line />
      <S.Lists>
        <div className="Name">참여 중인 공동구매</div>
        <S.ChoiceList>
          <Link to="/detail">
            <S.ItemImg>
              <img src="/assets/goods.png" alt="goods"></img>
            </S.ItemImg>
            <S.ItemName>
              <div>상품명 : 목포 쫀드기</div>
              <div>구매일 : 2023.02.03</div>
              <div>송장번호 : 3827498379238</div>
            </S.ItemName>
            {/* <Modal
                open={openModal}
                close={closeModal} 
            >
            <S.ItemName>
               <div>상품명 : 목포 쫀드기</div>
               <div>구매일 : 2023.02.03</div>
               <div>송장번호 : 3827498379238</div>                      
            </S.ItemName>
            </Modal> */}
          </Link>
          <Link to="/detail">
            <S.ItemImg>
              <img src="/assets/goods.png" alt="goods"></img>
            </S.ItemImg>
            <S.ItemName>
              <div>목포 쫀드기</div>
              <div>9,900원</div>
            </S.ItemName>
          </Link>
        </S.ChoiceList>
      </S.Lists>
      <S.Line />
      <S.Lists>
        <div className="Name">내가 작성한 공동구매</div>
        <S.ChoiceList>
          <Link to="/detail">
            <S.ItemImg>
              <img src="/assets/goods.png" alt="goods" />
            </S.ItemImg>
            <S.ItemImg>
              <S.ItemName>
                <div>목포 쫀드기</div>
                <div>9,900</div>
                <div>구매인원 : 10명</div>
              </S.ItemName>
              {/* <button onClick={() => deleteGoods()}>x</button> */}
            </S.ItemImg>
            {/* <Modal
                open={openModal}
                close={closeModal} 
            >
            <S.ItemName>
               <div>상품명 : 목포 쫀드기</div>
               <div>구매일 : 2023.02.03</div>
               <div>송장번호 : 3827498379238</div>                      
            </S.ItemName>
            </Modal> */}
          </Link>
          <Link to="/detail">
            <S.Item>
              <img src="/assets/goods.png" alt="goods"></img>
            </S.Item>
            <S.ItemName>
              <div>목포 쫀드기</div>
              <div>9,900원</div>
            </S.ItemName>
          </Link>
        </S.ChoiceList>
      </S.Lists>
    </S.MypageWrap>
  );
};

export default Mypage;
