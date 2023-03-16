import { Link } from "react-router-dom";
import * as S from "./styled";
import { BsPlusCircle, BsSearch } from "react-icons/bs";
import ItemsSlider  from "../../components/ItemsSlider/ItemsSlider";

// Type {
//   Items: Array;
// }

const Main = (props: any) => {

  return (
    <S.Main>
      <S.LogoImg src="/assets/Sayo.png" alt=""></S.LogoImg>
      <S.MainList>
        <S.Line />
        <S.Title>강남구 공동구매 상품</S.Title>
        <S.Menus>
          <h4 className="font">
            전체보기
            <Link to="/itemList">
              <BsPlusCircle className="plusIcon" />
            </Link>
          </h4>
          <S.GoodsList>
            <ItemsSlider/>
          </S.GoodsList>
        </S.Menus>
        <S.Title>
          <div>다른 지역 공동구매 상품 찾기</div>
          <Link to="/map">
            <S.WriteButton>지도로 검색하기</S.WriteButton>
          </Link>
        </S.Title>
        <br />
        <br />
        <S.Title>최근 본 상품</S.Title>
        <S.Menus>
              <S.GoodsList>
                <ItemsSlider/>
              </S.GoodsList>
        </S.Menus>
          <S.Title style={{ marginLeft: 30 }}>
            찾으시는 제품이 없다면?
            <Link to="/write">
              <S.WriteButton>공동구매 제안하기</S.WriteButton>
            </Link>
          </S.Title>
      </S.MainList>
    </S.Main>
  );
};

export default Main;
