import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import * as S from "./styled";
import { useCustomQuery } from "../util/useCustomQuery";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { Link } from "react-router-dom";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


// interface sliderProps {
//   /** 슬라이더 아이템 요소 */
//   children: React.ReactNode;
//   /** 커스텀 클래스 */
//   className?: string;
//   /** 자동재생 (속도 설정시 number 타입으로) */
//   autoplay?: boolean | number;
//   /** 슬라이더 속도 */
//   speed?: number;
//   /** 반복 여부 */
//   loop?: boolean;
// }

const ItemsSlider = () => {

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.addEventListener('resize', handleResize);
    }
  }, []);

  const { data, isLoading, error, refetch } = useCustomQuery(`/items`, `items`);

  if (isLoading ) return <Loading/>;
  if (error) return <Error/>;
  
  const Items = data;

  
    const settings = {
      dots: true,
      // fade: true,
      infinite: true,
      speed: 500,
      // autoplay: true,
      slidesToShow: 5,
      slidesToScroll: 3,
      pauseOnHover: true
    };
    return (
      <S.Container>
        <Slider
          className="item"
          // slidesToShow={
          //   windowSize >= 1440 
          //   ? 5 : ( windowSize >= 1320
          //     ? 4 : ( windowSize >= 1000
          //       ? 3 : ( windowSize >= 720
          //         ? 2 : ( windowSize >= 300
          //           ? 1 : null))))
          // }
          {...settings}
        >
          {Items && Items.map ((item:any) => {
              return (
                <Link to={`/detail/${item.id}`} key={item.id}>
                  <S.Item >
                    <img
                      src={item.itemPicture}
                      alt="상품 이미지"
                      className='itempicture'
                    ></img>
                  </S.Item>
                </Link>
                )})}
        </Slider>
      </S.Container>
    );
  }

export default ItemsSlider;