import { Link } from "react-router-dom";
import * as S from "./styled";
import { LogoImg, Line } from "../Main/styled";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { useEffect, useState } from "react";
import axios from "axios";
import EachItem from "../../components/EachItem/EachItem";
import Pagination from "react-js-pagination";

const ItemList = () => {
  const [state, setState] = useState<string>("전체");
  const [category, setCategory] = useState<string[]>([]);
  const [item, setItem] = useState<string[]>([]);
  const [pageinfo, setPageinfo] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalElements, setTotalElements] = useState(100);


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
      .get(`http://sayo.n-e.kr:8080/items/get?page=${page}&size=10`)
      .then((res) => {
        setItem(res.data.data);
        setPage(res.data.pageInfo.page)
        setSize(res.data.pageInfo.size)
        setTotalElements(res.data.pageInfo.totalElements)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  // const { data, isLoading, error, refetch } = useCustomQuery(
  //   `/items/get?page=${page}&size=10`,
  //   `items`
  // );

  // if (isLoading) return <Loading></Loading>;
  // if (error) return <Error></Error>;

  // const { size, totalPages, totalElements } = data.pageInfo;
  // // console.log("page", page);
  // // console.log("size", size);
  // // console.log("totalPages", totalPages);
  // // console.log("totalElements", totalElements);
  // const Items = data.data;

  const ChangeCategory = (e: any) => {
    setState(String(e.target.id));
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    console.log(page);
  };

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
            //Todo : 눌러진 상태 확인할 수 있게 css 수정
            category &&
              category.map((category: any) => {
                return (
                  <S.Category onClick={ChangeCategory} id={category.categoryId}>
                    {" "}
                    {category.categoryName}
                  </S.Category>
                );
              })
          }
        </S.Categorys>

        <S.Tags>
          <S.Tag onClick={ChangeCategory} id="전체">
            전체
          </S.Tag>
          <S.Tag onClick={ChangeCategory} id="ITEM_PROGRESS">
            판매 중
          </S.Tag>
          <S.Tag onClick={ChangeCategory} id="ITEM_END">
            판매 종료
          </S.Tag>
        </S.Tags>
        {/* Todo : pagenation 구현하기 */}
        <S.GoodsList>
          {item &&
            item.map((items: any) => {
              return state === "전체" ? (
                <Link to={`/detail/${items.itemId}`} key={items.itemId}>
                  <EachItem items={items} />
                </Link>
              ) : //Todo : category와 판매 state를 중복으로 선택했을 때 filter체크
              String(items.categoryId) === state ? (
                <Link to={`/detail/${items.itemId}`} key={items.itemId}>
                  <EachItem items={items} page={page}/>
                </Link>
              ) : items.itemStatus === state ? (
                <Link to={`/detail/${items.itemId}`} key={items.itemId}>
                  <EachItem items={items} />
                </Link>
              ) : null;
            })}
             <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={totalElements}
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={handlePageChange}
          />
        </S.GoodsList>
      </S.MainList>
    </S.Main>
  );
};

export default ItemList;
