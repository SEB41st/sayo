import { Link } from "react-router-dom";
import * as S from "./styled";
import { BsPlusCircle } from "react-icons/bs";
import ItemsSlider  from "../../components/ItemsSlider/ItemsSlider";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
const Main = () => {

  const { data, isLoading, error, refetch } = useCustomQuery(`/items/get?page=1&size=10`, `items`);

  if (isLoading ) return <Loading/>;
  if (error) return <Error/>;
  
  const Items = data.data;
  console.log(Items)
  let userId = localStorage.getItem("userId")

  let sortItems = [...Items]
  sortItems.sort((a:any,b:any)=> {
    if(a.modifiedAt > b.modifiedAt) return -1;
    if(a.modifiedAt < b.modifiedAt) return 1;
    return 0  
  })

  let sortFavoritItems = [...Items]
  sortFavoritItems.sort((a:any,b:any)=> {
    if(a.wishCount > b.wishCount) return -1;
    if(a.wishCount < b.wishCount) return 1;
    return 0  
  })
  console.log(sortItems.slice(0,5))

  return (
    <S.Main>
      <S.LogoImg src="/assets/Sayo.png" alt=""></S.LogoImg>
      <S.MainList>
        <S.Line />
        <S.Title>최신 공동구매 상품</S.Title>
        <S.Menus>
          <h4 className="font">
        <div>더 많은 상품을 보고 싶다면 ?</div>
            전체 상품 보기
            <Link to="/itemList">
              <BsPlusCircle className="plusIcon" />
            </Link>
          </h4>
          <S.GoodsList>
          <ItemsSlider Items={sortItems.slice(0,6)}/>
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
        <S.Title>인기 상품 (TOP 6)</S.Title>
        <S.Menus>
              <S.GoodsList>
                <ItemsSlider Items= {sortFavoritItems.slice(0,6)}/>
              </S.GoodsList>
        </S.Menus>
          <S.Title style={{ marginLeft: 30 }}>
            찾으시는 제품이 없다면?
            {userId? <Link to="/write">
              <S.WriteButton>공동구매 제안하기</S.WriteButton>
            </Link> : <Link to="/login">
              <S.WriteButton>로그인 하고<br/> 공동구매 제안하기</S.WriteButton>
            </Link>}
          </S.Title>
      </S.MainList>
    </S.Main>
  );
};

export default Main;
