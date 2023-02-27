import { Link } from 'react-router-dom';
import * as S from './styled';
import { LogoImg, Line, Item} from '../Main/styled';

const ItemList = () => {
  return (
    <S.Main>
      <LogoImg src="/assets/neighbors.jpeg" alt ="" ></LogoImg>
      <S.MainList>
        <Line/>
        <Link to = "/write">
          <S.WriteButton>공동구매 제안하기</S.WriteButton>
        </Link>
        <S.Tags>
          <S.Tag>전체</S.Tag>
          <S.Tag>판매 중</S.Tag>
          <S.Tag>판매 종료</S.Tag>
        </S.Tags>
            <S.GoodsList>
              <Link to = '/detail'>
                <Item/>
                <S.Font>
                  <div>목포 쫀드기</div>
                  <div>9,900원</div>
                </S.Font>
              </Link>
              <Link to = '/detail'>
                <Item/>
                <S.Font>
                  <div>목포 쫀드기</div>
                  <div>9,900원</div>
                </S.Font>
              </Link>
              <Link to = '/detail'>
                <Item/>
                <S.Font>
                  <div>목포 쫀드기</div>
                  <div>9,900원</div>
                </S.Font>
              </Link>
              <Link to = '/detail'>
                <Item/>
                <S.Font>
                  <div>목포 쫀드기</div>
                  <div>9,900원</div>
                </S.Font>
              </Link>
              <Link to = '/detail'>
                <Item/>
                <S.Font>
                  <div>목포 쫀드기</div>
                  <div>9,900원</div>
                </S.Font>
              </Link>
              <Link to = '/detail'>
                <Item/>
                <S.Font>
                  <div>목포 쫀드기</div>
                  <div>9,900원</div>
                </S.Font>
              </Link>
              <Link to = '/detail'>
                <Item/>
                <S.Font>
                  <div>목포 쫀드기</div>
                  <div>9,900원</div>
                </S.Font>
              </Link>
              <Link to = '/detail'>
                <Item/>
                <S.Font>
                  <div>목포 쫀드기</div>
                  <div>9,900원</div>
                </S.Font>
              </Link> 
            </S.GoodsList>
      </S.MainList>
    </S.Main>
  )
}

export default ItemList;