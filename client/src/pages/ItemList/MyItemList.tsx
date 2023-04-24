import { Link } from "react-router-dom";
import * as S from "./styled";
import { LogoImg, Line } from "../Main/styled";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { useEffect, useState } from "react";
import axios from "axios";
import EachItem from "../../components/EachItem/EachItem";

const MyItemList = () => {
  const [state, setState] = useState<string>("전체");
  const [category, setCategory] = useState<string[]>([]);
  const [myItem, setMyItem] = useState([]);
  const userId = localStorage.getItem("userId");

  

  useEffect(() => {
    axios(`http://sayo.n-e.kr:8080/items/get?page=1&size=100`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((res: any) => {
        setMyItem(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const hasMyId = myItem.filter((item) => item.userId === Number(userId));

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
