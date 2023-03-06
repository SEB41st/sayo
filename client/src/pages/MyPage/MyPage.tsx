import * as S from "./styled";
import { LogoImg, Line, Item } from "../Main/styled";
import { Link } from "react-router-dom";

const Mypage = () => {
  return (
    <S.MypageWrap>
      <div className="Title">마이페이지</div>
      <S.MypageContainer>
        <S.ImageDiv></S.ImageDiv>
        <div className="Nickname">NICKNAME</div>
      </S.MypageContainer>
      <S.Line></S.Line>
      <S.Lists>
        <div className="Name">내가 찜한 상품</div>
        <S.ChoiceList>
        <Link to="/detail">
            <Item>
              <img src="/assets/goods.png" alt="goods"></img>
            </Item>
            <div>목포 쫀드기</div>
            <div>9,900원</div>
          </Link>
          <Link to="/detail">
            <Item>
              <img src="/assets/goods.png" alt="goods"></img>
            </Item>
            <div>목포 쫀드기</div>
            <div>9,900원</div>
          </Link>
          <Link to="/detail">
            <Item>
              <img src="/assets/goods.png" alt="goods"></img>
            </Item>
            <div>목포 쫀드기</div>
            <div>9,900원</div>
          </Link>
        </S.ChoiceList>
      </S.Lists>
      <S.Line></S.Line>
      <S.Lists>
        <div className="Name">참여 중인 공동구매</div>
        <S.ChoiceList>
        <Link to="/detail">
            <Item>
              <img src="/assets/goods.png" alt="goods"></img>
            </Item>
            <div>목포 쫀드기</div>
            <div>9,900원</div>
          </Link>
          <Link to="/detail">
            <Item>
              <img src="/assets/goods.png" alt="goods"></img>
            </Item>
            <div>목포 쫀드기</div>
            <div>9,900원</div>
          </Link>
          <Link to="/detail">
            <Item>
              <img src="/assets/goods.png" alt="goods"></img>
            </Item>
            <div>목포 쫀드기</div>
            <div>9,900원</div>
          </Link>
        </S.ChoiceList>
      </S.Lists>
      <S.Line></S.Line>
    </S.MypageWrap>
  );
};

export default Mypage;
