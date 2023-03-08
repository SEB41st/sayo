import { atom } from "recoil";

// 현재 위치에 대한 정보
export const MarkLocation = atom({
  key: 'MarkLocation',
  default: {
    lat: 37.5668872688006,
    lng: 126.97863243245928
  },
})

// 현재 위치에 대한 정보
export const searchValue = atom({
  key: 'searchValue',
  default: '',
})

//
export const placesAll = atom({
  key: 'placesAll',
  default: [],
})