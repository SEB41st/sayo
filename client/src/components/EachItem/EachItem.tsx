import * as S from "./Styled";

const EachItem = (items: any) => {
  return (
    <S.EachItem>
      {items.items.itemStatus === "ITEM_END" ? (
        <>
          <S.EndImg> 판매 종료 </S.EndImg>
          <S.Item>
            <img src={items.items.itemPicture} alt="goods"></img>
          </S.Item>
          <S.Font>
            <div>{items.items.itemName}</div>
            <div>{items.items.itmePrice}</div>
          </S.Font>
        </>
      ) : (
        <>
          <S.Item>
            <img src={items.items.itemPicture} alt="goods"></img>
          </S.Item>{" "}
          <S.Font>
            <div>{items.items.itemName}</div>
            <div>{items.items.itmePrice}</div>
          </S.Font>
        </>
      )}
    </S.EachItem>
  );
};

export default EachItem;
