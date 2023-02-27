import * as S from "./styled";
import { LogoImg, GoodsList, Item} from '../Main/styled';
import { Link } from "react-router-dom";

const Mypage = () => {
  return (
    <S.MypageWrap>
      <S.MypageContainer>
        <div className="Title">마이페이지</div>
        <S.ImageDiv></S.ImageDiv>
        <div>NICKNAME</div>
      </S.MypageContainer>
      <S.Lists>
          <div>내가 찜한 상품</div>
        <S.ChoiceList>
            <Link to = '/detail'><Item/></Link>
            <Link to = '/detail'><Item/></Link>
            <Link to = '/detail'><Item/></Link>
        </S.ChoiceList>
          <div>참여 중인 공동구매</div>
        <S.ChoiceList>
            <Link to = '/detail'><Item/></Link>
            <Link to = '/detail'><Item/></Link>
            <Link to = '/detail'><Item/></Link>
          </S.ChoiceList>
      </S.Lists>
    </S.MypageWrap>
  );
};

export default Mypage;


