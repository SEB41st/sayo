import { Link } from "react-router-dom";
import * as S from "./styled";
import { LogoImg, Line } from "../Main/styled";
import { useEffect, useState } from "react";
import axios from "axios";
import EachItem from "../../components/EachItem/EachItem";
import Pagination from "react-js-pagination";

const ItemList = () => {
  const [state, setState] = useState<string>("전체");
  const [category, setCategory] = useState<string[]>([]);
  const [item, setItem] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalElements, setTotalElements] = useState(100);
  const [clicked, setclick] = useState<boolean>(false)

  console.log(page)
  useEffect(() => {
    axios
      .get(`http://sayo.n-e.kr:8080/categories`)
      .then((res) => {
        setCategory(res.data.data);
        console.log(category);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://sayo.n-e.kr:8080/items/get?page=${page}&size=900`)
      .then((res) => {
        setItem(res.data.data);
        setPage(res.data.pageInfo.page);
        setSize(res.data.pageInfo.size);
        setTotalElements(res.data.pageInfo.totalElements);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const [activePage, setActivePage] = useState(1); // 현재 활성화된 페이지
  const filteredItems = item.filter((item)=> String(item.categoryId) === state);
  const progressAllItem = item.filter((item)=> "전체" === state) // 조건에 따라 필터링
  const progressItem = item.filter((item)=> item.itemStatus === state)
  const combinedItems = [...progressAllItem, ...filteredItems, ...progressItem];
  const totalItemCount = combinedItems.length; // 필터링된 아이템 개수
  const pageCount = Math.ceil(totalItemCount / 9); // 전체 페이지 개수
  const startIndex = (activePage - 1) * 9; // 현재 페이지의 첫번째 아이템 인덱스
  const pagedItems = combinedItems.slice(startIndex, startIndex + 9); // 현재 페이지의 아이템

  const handlePageChange = (pageNumber:any) => {
    setActivePage(pageNumber); // 페이지 변경 시 현재 페이지 업데이트
  };

  const ChangeCategory = (e:any) => {
    setState(String(e.target.id))
    console.log(e.target.id)
    setclick(!clicked)
  }

  return (
    <S.Main>
      <LogoImg src="/assets/event.png" alt=""></LogoImg>
      <S.MainList>
        <Line />

        <S.WriteButton>
          <Link to="/write">공동구매 제안하기</Link>
        </S.WriteButton>

        <S.Categorys>
          <S.Category onClick={ChangeCategory} id="전체">
            전체
          </S.Category>
          {
          category && category.map((category:any)=>{
            return <S.Category onClick={ChangeCategory} className={state === String(category.categoryId)? "Clicked":"unclicked"} id={category.categoryId}> {category.categoryName}</S.Category>
          })}
        </S.Categorys>

        <S.Tags>
          <S.Tag onClick={ChangeCategory} id="전체">전체</S.Tag>
          <S.Tag onClick={ChangeCategory} className={state === 'ITEM_PROGRESS'? "Clicked":"unclicked"} id="ITEM_PROGRESS">판매 중</S.Tag>
          <S.Tag onClick={ChangeCategory} className={state === 'ITEM_END'? "Clicked":"unclicked"} id="ITEM_END">판매 종료</S.Tag>
        </S.Tags>
        <S.GoodsList>
          <>
            { pagedItems.map((items)=> {
            return (
            <Link to={`/detail/${items.itemId}`} key={items.itemId}>
              <EachItem items={items} />
            </Link>)})}
          </>
            
          </S.GoodsList>
          <Pagination
        activePage={activePage}
        itemsCountPerPage={9}
        totalItemsCount={totalItemCount}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />

      </S.MainList>
    </S.Main>
  );
};

export default ItemList;