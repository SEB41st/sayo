import { Link } from "react-router-dom";
import * as S from "./styled";
import { LogoImg, Line } from "../Main/styled";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { useEffect, useState } from "react";
import axios from "axios";
import EachItem from "../../components/EachItem/EachItem";


const ItemList = () => {
  const [state, setState] = useState<string>("전체");
  const [category, setCategory] = useState<string[]>([]);
  const [clicked, setclick] = useState<boolean>(false)

    useEffect(()=> {
        axios
        .get(`http://sayo.n-e.kr:8080/categories`)
        .then((res) => {
          setCategory(res.data.data)
          console.log(category)
        })
        .catch((error) => {
          console.log(error);
        });
    },[])

  const { data, isLoading, error, refetch } = useCustomQuery(`/items/get?page=1&size=50`, `items`);

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const Items = data.data;

  const ChangeCategory = (e:any) => {
    setState(String(e.target.id))
    setclick(!clicked)
  }
  console.log(state)
  console.log(category)

  return (
    <S.Main>
      <LogoImg src="/assets/event.png" alt=""></LogoImg>
      <S.MainList>
        <Line />

        <S.WriteButton>
          <Link to="/write">공동구매 제안하기</Link>
        </S.WriteButton>

        <S.Categorys>
          <S.Category onClick={ChangeCategory} id="전체">전체</S.Category>
          {
            //Todo : 눌러진 상태 확인할 수 있게 css 수정
          category && category.map((category:any)=>{
            return <S.Category onClick={ChangeCategory} className={state === String(category.categoryId)? "Clicked":"unclicked"} id={category.categoryId}> {category.categoryName}</S.Category>
          })}
        </S.Categorys>

        <S.Tags>
          <S.Tag onClick={ChangeCategory} id="전체">전체</S.Tag>
          <S.Tag onClick={ChangeCategory} className={state === 'ITEM_PROGRESS'? "Clicked":"unclicked"} id="ITEM_PROGRESS">판매 중</S.Tag>
          <S.Tag onClick={ChangeCategory} className={state === 'ITEM_END'? "Clicked":"unclicked"} id="ITEM_END">판매 종료</S.Tag>
        </S.Tags>
        {/* Todo : pagenation 구현하기 */}
        <S.GoodsList>
          {Items &&
            Items.map((item: any) => {
              return state === "전체" ? (
                <Link to={`/detail/${item.itemId}`} key={item.itemId}>
                  <EachItem item={item}/>
                </Link>
                //Todo : category와 판매 state를 중복으로 선택했을 때 filter체크
              ) : String(item.categoryId) === state ? (
                <Link to={`/detail/${item.itemId}`} key={item.itemId}>
                  <EachItem item={item}/>
                </Link>
              ) : item.itemStatus === state ? (
                <Link to={`/detail/${item.itemId}`} key={item.itemId}>
                  <EachItem item={item}/>
                </Link>)
              : null;
            })}
        </S.GoodsList>
      </S.MainList>
    </S.Main>
  );
};

export default ItemList;
