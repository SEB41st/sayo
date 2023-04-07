import { Link } from "react-router-dom";
import * as S from "./styled";
import { LogoImg, Line } from "../Main/styled";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { useEffect, useState } from "react";
import { Item } from "../../components/ItemsSlider/styled";
import axios from "axios";


const ItemList = () => {
  const [state, setState] = useState<string>("전체");
  const [category, setCategory] = useState<string[]>([]);

    useEffect(()=> {
        axios
        .get(`http://sayo.n-e.kr:8080/categories`,
        {
          headers: {
            Authorization : localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          setCategory(res.data.data)
          console.log(category)
        })
        .catch((error) => {
          console.log(error);
        });
    },[])

  const { data, isLoading, error, refetch } = useCustomQuery(`/items/get?page=1&size=10`, `items`);

  if (isLoading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  const Items = data.data;

  // console.log(Items);

  const ChangeCategory = (e:any) => {
    setState(String(e.target.id))
  }
  // console.log(Items)

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
            return <S.Category onClick={ChangeCategory} id={category.categoryId}> {category.categoryName}</S.Category>
          })}
        </S.Categorys>

        <S.Tags>
          <S.Tag onClick={ChangeCategory} id="전체">전체</S.Tag>
          <S.Tag onClick={ChangeCategory} id="ITEM_PROGRESS">판매 중</S.Tag>
          <S.Tag onClick={ChangeCategory} id="ITEM_END">판매 종료</S.Tag>
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
                //Todo : category와 판매 state를 중복으로 선택했을 때 filter체크
              ) : String(item.categoryId) === state ? (
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
                </Link>)
              : null;
            })}
        </S.GoodsList>
      </S.MainList>
    </S.Main>
  );
};

export default ItemList;
