import * as S from "./styled";
import { Link, useLocation } from "react-router-dom";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import Modal from "../../components/Modal/Modal";
import { useState } from "react";
import { useCustomMutation } from "../../components/util/useMutate";
import axios from "axios";

const Mypage = () => {
  const [modalOpen, SetModalOpen] = useState<boolean>(false);

  const params = useLocation()
  // const {itemId} = useParams()
  const { data, isLoading, error, refetch } = useCustomQuery(
    `/items`,
    `items`
  )
  if (isLoading) return <Loading/>;
  if (error) return <Error/>;

  const Items = data;
console.log(Items)

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

const deleteGoods = () => {
//   mutate(Items)
//   refetch()
}

// const deleteGoods = async (dataId) => {
//     await axios
//       .delete(
//         `http://localhost:4000${params.pathname}/${dataId}`,
//         {
//           headers: {
//             Authorization: localStorage.getItem("accessToken"),
//           },
//         }
//       )
//       .then((res) => {
//         refetch()
//         // window.location.reload();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

  return (
    <S.MypageWrap>
      <div className="Title">마이페이지</div>
      <S.MypageContainer>
        <S.ImageDiv src="/assets/Github.png"></S.ImageDiv>
        <div className="Nickname">NICKNAME</div>
      </S.MypageContainer>
      <S.Line/>
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
      <S.Line/>
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
              <div>상품명 : 호텔 수건(white)</div>
              <div>구매일 : 2023.03.22</div>
              <div>송장번호 : 381187499238</div>
            </S.ItemName>
          </Link>
        </S.ChoiceList>
      </S.Lists>
      <S.Line/>
      <S.Lists>
        <div className="Name">내가 작성한 공동구매</div>
        <S.ChoiceList>
        <Link to="/detail">
          <S.ItemImg>
              <img src="/assets/goods.png" alt="goods"/>
            </S.ItemImg>
            <S.ItemImg>    
              <S.ItemName>
                <div>목포 쫀드기</div>
                <div>9,900</div>
                <div>구매인원 : 10명</div>                  
              </S.ItemName>
              <button className="XButton" onClick={() => deleteGoods()}>x</button>
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
          <S.ItemImg>
              <img src="/assets/goods.png" alt="goods"/>
            </S.ItemImg>
            <S.ItemImg>    
              <S.ItemName>
                <div>고양이 에코백</div>
                <div>3,900</div>
                <div>구매인원 : 20명</div>                  
              </S.ItemName>
              <button className="XButton" onClick={() => deleteGoods()}>x</button>
            </S.ItemImg>
          </Link>
        </S.ChoiceList>
      </S.Lists>
    </S.MypageWrap>
  );
};

export default Mypage;
