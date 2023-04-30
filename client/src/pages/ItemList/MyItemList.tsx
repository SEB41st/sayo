import { Link } from "react-router-dom";
import * as S from "./styled";
import { LogoImg, Line } from "../Main/styled";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import EachItem from "../../components/EachItem/EachItem";

const MyItemList = () => {
  const userId = localStorage.getItem("userId");

  const {data, isLoading, error} = useCustomQuery(
    `/items/get?page=1&size=100`,
    `page=1&size=100`
  )

  const myItem = data.data;

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const hasMyId = myItem.filter((item:any) => item.userId === Number(userId));

  return (
    <S.Main>
      <LogoImg src="/assets/event.png" alt=""></LogoImg>
      <S.MainList>
        <Line />

        <S.Title>내가 작성한 공동구매 상품 목록</S.Title>
        <S.GoodsList>
          {hasMyId &&
            hasMyId.map((items: any) => (
              <Link to={`/detail/${items.itemId}`} key={items.itemId}>
                <EachItem items={items} />
              </Link>
            ))}
        </S.GoodsList>
      </S.MainList>
    </S.Main>
  );
};

export default MyItemList;
