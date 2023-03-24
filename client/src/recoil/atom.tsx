import { atom, selector } from "recoil";

type Location = {
  latitude: any;
  longitude: any;
};

// 판매위치
export const salesLocation = atom<Location>({
  key: "MarkLocation",
  default: {
    latitude: "",
    longitude: "",
  },
});

// 검색어
export const searchValue = atom({
  key: "searchValue",
  default: "",
});

// 장바구니 목록
export const CartItemList = atom({
  key: "CartItemList",
  default: [],
});

export const selectOption = atom({
  key: "select",
  default: 0,
});

// 상품 개수
export const countState = atom({
  key: "countState",
  default: 1,
});

// 상품 개수 변화 시키는 selector
export const countSelector = selector<number>({
  key: "countSelector",
  get: ({ get }): number => {
    const count = get(countState);
    return count + 1;
  },
  set: ({ set }, newValue) => {
    set(countState, newValue); 
  },
});

export const totalPriceState = selector({
  key: "totalPrice",
  get: ({ get }) =>
    get(CartItemList)
      .map(({ totalPrice }) => totalPrice)
      .reduce((prev: number, current: number) => prev + current, 0),
});

//찜하기 상태
export const likeState = atom({
  key:"like",
  default:false,
});