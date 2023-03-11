import { atom } from "recoil";

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


