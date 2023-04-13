import * as S from "./Styled"

const EachItem = (item:any) => {
    // console.log(item.item)
    return(
    <S.EachItem>
        {item.item.itemStatus === "ITEM_END" ? 
          <>
          <S.EndImg> 판매 종료 </S.EndImg> 
            <S.Item>
            <img src={item.item.itemPicture} alt="goods"></img>
            </S.Item> 
            <S.Font>
              <div>{item.item.itemName}</div>
              <div>{item.item.itmePrice}</div>
            </S.Font>
          </>
           : 
          <>
          <S.Item>
            <img src={item.item.itemPicture} alt="goods"></img>
          </S.Item> <S.Font>
            <div>{item.item.itemName}</div>
            <div>{item.item.itmePrice}</div>
          </S.Font>
          </>
          }
    </S.EachItem>)

}

export default EachItem;