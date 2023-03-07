import { Link } from "react-router-dom";
import * as S from "./styled";
import { LogoImg, Line } from "../Main/styled";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const ItemList = () => {
  const { data, isLoading, error, refetch } = useCustomQuery(`/items`, `items`);

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const Items = data;

  console.log(Items);

  return (
    <S.Main>
      <LogoImg src="/assets/neighbors.jpeg" alt=""></LogoImg>
      <S.MainList>
        <Line />

        <S.WriteButton>
          <Link to="/write">공동구매 제안하기</Link>
        </S.WriteButton>

        <S.Tags>
          <S.Tag>전체</S.Tag>
          <S.Tag>판매 중</S.Tag>
          <S.Tag>판매 종료</S.Tag>
        </S.Tags>
        <S.GoodsList>
          {Items &&
            Items.map((item: any) => {
              return (
                <Link to={`/detail/${item.id}`} key={item.id}>
                  <S.Item>
                    <img src={item.itemPicture} alt="goods"></img>
                  </S.Item>
                  <S.Font>
                    <div>{item.title}</div>
                    <div>{item.itmePrice}</div>
                  </S.Font>
                </Link>
              );
            })}
        </S.GoodsList>
      </S.MainList>
    </S.Main>
  );
};

export default ItemList;
