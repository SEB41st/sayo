import { Link } from "react-router-dom";
import * as S from "./styled";
import { LogoImg, Line } from "../Main/styled";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { useState } from "react";

const ItemList = () => {
  const [state, setState] = useState("전체");

  const { data, isLoading, error, refetch } = useCustomQuery(
    `/items/get?page=1&size=10`,
    `items`
  );

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const Items = data.data;

  console.log("Items", Items);

  const ChangeCategory = (e: any) => {
    setState(e.target.id);
  };
  console.log("state", state);

  // const cartegoryFilterSale = Items.filter(
  //   (item: any) => item.itemStatus === "ITEM_PROGRESS"
  // );

  // const cartegoryFilterFin = Items.filter(
  //   (item: any) => item.itemStatus === "ITEM_END"
  // );


  return (
    <S.Main>
      <LogoImg src="/assets/event.png" alt=""></LogoImg>
      <S.MainList>
        <Line />

        <S.WriteButton>
          <Link to="/write">공동구매 제안하기</Link>
        </S.WriteButton>

        <S.Tags>
          <S.Tag id="전체" onClick={ChangeCategory}>
            전체
          </S.Tag>
          <S.Tag id="ITEM_PROGRESS" onClick={ChangeCategory}>
            판매 중
          </S.Tag>
          <S.Tag id="ITEM_END" onClick={ChangeCategory}>
            판매 종료
          </S.Tag>
        </S.Tags>
        <S.GoodsList>
          {Items &&
            Items.map((item: any) => {
              return state === "전체" ? (
                <Link to={`/detail/${item.itemId}`} key={item.itemId}>
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
              ) : item.itemStatus === state ? (
                <Link to={`/detail/${item.itemId}`} key={item.itemId}>
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
              ) : null;
            })}
        </S.GoodsList>
      </S.MainList>
    </S.Main>
  );
};

export default ItemList;
