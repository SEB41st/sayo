import { Link } from "react-router-dom";
import * as S from "./styled";
import { LogoImg, Line } from "../Main/styled";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { useEffect, useState } from "react";
import axios from "axios";
import EachItem from "../../components/EachItem/EachItem";


const MypageItemList = () => {
  const [state, setState] = useState<string>("전체");
  const [category, setCategory] = useState<string[]>([]);
  const userId = localStorage.getItem("userId");


    const { data, isLoading, error, refetch } = useCustomQuery(
      `/wishes/user/${userId}/wish`,
      `wishes/user/${userId}/wish`
    );

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const Items = data.data;



  return (
    <S.Main>
      <LogoImg src="/assets/event.png" alt=""></LogoImg>
      <S.MainList>
        <Line />
  
        <S.Title>찜한 상품 목록</S.Title>
        <S.GoodsList>
        
          {Items &&
            Items.map((items: any) => (
                <Link to={`/detail/${items.itemId}`} key={items.itemId}>
                  <EachItem items={items}/>
                </Link>
            ))}
        </S.GoodsList>
      </S.MainList>
    </S.Main>
  );
};

export default MypageItemList;
