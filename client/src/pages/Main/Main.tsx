import { Link } from 'react-router-dom';
import * as S from './styled';
import { BsPlusCircle, BsSearch } from 'react-icons/bs';

const Main = () => {
  return (
    <S.Main>
      <S.LogoImg src="/assets/Sayo.png" alt ="" ></S.LogoImg>
      <S.MainList>
        <S.Line/>
        <S.Title>강남구 공동구매 상품</S.Title>
          <S.Menus>
            <h4 className='font'>전체보기
              <Link to='/itemList' ><BsPlusCircle className='plusIcon'/></Link>
            </h4>
            <S.GoodsList>
              <Link to = '/detail'><S.Item></S.Item></Link>
              <Link to = '/detail'><S.Item></S.Item></Link>
              <Link to = '/detail'><S.Item></S.Item></Link>
              
            </S.GoodsList>
          </S.Menus>
        <S.Title>지역 공동구매 상품 찾기</S.Title>
        <S.Menus>
          <S.SearchBar>
          <input
          className='Search'
          type="text"
          placeholder='검색하실 지역을 입력해주세요'
          ></input>
          <Link to = '/map'>
          <BsSearch style={{"marginLeft":"10px"}}/>
          </Link>
          </S.SearchBar>
        </S.Menus>
            <S.Title>최근 본 상품</S.Title>
        <S.Menus>
          <S.GoodsList>
            <Link to = '/detail'><S.Item src="/assets/goods.png"/></Link>
            <Link to = '/detail'><S.Item src="/assets/goods.png"/></Link>
            <Link to = '/detail'><S.Item src="/assets/goods.png"/></Link>
          </S.GoodsList>
        </S.Menus>
        <S.Menus>
          <S.Title style={{margin:0}}>
            찾으시는 제품이 없다면?
            <Link to = "/write">
              <S.WriteButton>공동구매 제안하기</S.WriteButton>
            </Link> 
          </S.Title>
        </S.Menus>
      </S.MainList>
    </S.Main>
  )
}

export default Main;