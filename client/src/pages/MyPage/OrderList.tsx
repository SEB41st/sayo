import { Link } from "react-router-dom";
import { Lists, ChoiceList, ItemImg, ItemName, OrderDateStyled } from "./styled";


const OrderList = (item: any) => {
  console.log(item);
  const CommaFormat = (x:any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  return (
      <Lists>
        {item.item.itemList.map((items: any, index: number) => (
          <ChoiceList key={index}>
            {index === 0 && (
              <span>
                <OrderDateStyled>{items.order.createDate.slice(0, 10)} 구매</OrderDateStyled>
              </span>
            )}
            <Link to={`/detail/${items.itemId}`}>
              <ItemImg>
                <img src={items.itemPicture} alt="goods" />
              </ItemImg>
              <ItemName>
                <span> {items.itemName}</span>
                <span>{CommaFormat(items.itemPrice)}원</span>
              </ItemName>
            </Link>
          </ChoiceList>
        ))}
      </Lists>
  );
}

export default OrderList;
