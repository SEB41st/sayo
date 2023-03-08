import { Link } from "react-router-dom";
import * as S from "./styled";
import { LogoImg, Line } from "../Main/styled";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { useState } from "react";

const ItemList = () => {

  const [state, setState] = useState("")
  const { data, isLoading, error, refetch } = useCustomQuery(`/items`, `items`);

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const Items = data;

  // console.log(Items);

  const ChangeCategory = (e:any) => {
    setState(e.target.innerText)
  }
  console.log(state)

  const cartegoryFilterSale =  Items.filter((item:any) => 
    item.state === "판매 중"
  )

  const cartegoryFilterFin =  Items.filter((item:any) => 
    item.state === "판매 종료"
  )

    console.log(cartegoryFilterSale)
    console.log(cartegoryFilterFin)

  return (
    <S.Main>
      <LogoImg src="/assets/neighbors.jpeg" alt=""></LogoImg>
      <S.MainList>
        <Line />

        <S.WriteButton>
          <Link to="/write">공동구매 제안하기</Link>
        </S.WriteButton>

        <S.Tags>
          <S.Tag onClick={ChangeCategory}>전체</S.Tag>
          <S.Tag onClick={ChangeCategory}>판매 중</S.Tag>
          <S.Tag onClick={ChangeCategory}>판매 종료</S.Tag>
        </S.Tags>
        <S.GoodsList>
          {Items &&
            Items.map((item: any) => {
              return (
                state === "전체" ? (
                  <Link to={`/detail/${item.id}`} key={item.id}>
                <S.Item>
                  <img src={item.itemPicture} alt="goods"></img>
                </S.Item>
                <S.Font>
                  <div>{item.title}</div>
                  <div>{item.itmePrice}</div>
                </S.Font>
              </Link>
                ):(
                item.state === state ? (
                <Link to={`/detail/${item.id}`} key={item.id}>
                <S.Item>
                  <img src={item.itemPicture} alt="goods"></img>
                </S.Item>
                <S.Font>
                  <div>{item.title}</div>
                  <div>{item.itmePrice}</div>
                </S.Font>
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
