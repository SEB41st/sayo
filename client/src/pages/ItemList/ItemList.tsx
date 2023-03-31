import { Link } from "react-router-dom";
import * as S from "./styled";
import { LogoImg, Line } from "../Main/styled";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { useState } from "react";


const ItemList = () => {

  const [state, setState] = useState("전체")
  const { data, isLoading, error, refetch } = useCustomQuery(`/items/get?page=1&size=10`, `items`);

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const Items = data.data;

  console.log(Items);

  const ChangeCategory = (e:any) => {
    console.log(e.target.id)
    setState(e.target.id)
  }
  console.log(Items)

  const cartegoryFilterSale =  Items.filter((item:any) => 
    item.itemStatus === "ITEM_PROGRESS"
  )

  const cartegoryFilterFin =  Items.filter((item:any) => 
    item.itemStatus === "ITEM_END"
  )

    console.log(cartegoryFilterSale)
    console.log(cartegoryFilterFin)

  return (
    <S.Main>
      <LogoImg src="/assets/event.png" alt=""></LogoImg>
      <S.MainList>
        <Line />

        <S.WriteButton>
          <Link to="/write">공동구매 제안하기</Link>
        </S.WriteButton>

        <S.Categorys>
          <S.Category onClick={ChangeCategory}>전체</S.Category>
          <S.Category onClick={ChangeCategory}>음식</S.Category>
          <S.Category onClick={ChangeCategory}>의류</S.Category>
          <S.Category onClick={ChangeCategory}>생활용품</S.Category>
        </S.Categorys>

        <S.Tags>
          <S.Tag onClick={ChangeCategory} id="전체">전체</S.Tag>
          <S.Tag onClick={ChangeCategory} id="ITEM_PROGRESS">판매 중</S.Tag>
          <S.Tag onClick={ChangeCategory} id="ITEM_END">판매 종료</S.Tag>
        </S.Tags>
        <S.GoodsList>
          {Items &&
            Items.map((item: any) => {
              return (
                state === "전체" ? (
                <Link to={`/detail/${item.id}`} key={item.id}>
                  <S.EachItem>
                    <S.Item>
                      <img src={item.itemPicture} alt="goods"></img>
                    </S.Item>
                    <S.Font>
                      <div>{item.itemName}</div>
                      <div>{item.itmePrice}</div>
                    </S.Font>
                  </S.EachItem>
                </Link>
                ):(
                item.itemStatus === state ? (
                <Link to={`/detail/${item.id}`} key={item.id}>
                  <S.EachItem>
                    <S.Item>
                      <img src={item.itemPicture} alt="goods"></img>
                    </S.Item>
                    <S.Font>
                      <div>{item.itemName}</div>
                      <div>{item.itmePrice}</div>
                    </S.Font>
                  </S.EachItem>
                </Link>
              ):(
                null
              )));
            })}
        </S.GoodsList>
      </S.MainList>
    </S.Main>
  );
};

export default ItemList;
