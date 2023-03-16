import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import * as S from "./styled";
import { useCustomQuery } from "../util/useCustomQuery";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { Link } from "react-router-dom";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ItemsSlider = () => {

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowSize(window.innerWidth);
  }
  console.log(windowSize,window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.addEventListener('resize', handleResize);
    }
  }, [windowSize]);

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
      pauseOnHover: true,
      dotsClass: "dots_custom"
    };

    return (
      <S.Container>
        <Slider
          className="item"
          slidesToShow={
            windowSize >= 1440 
            ? 5 : ( windowSize >= 1320
              ? 4 : ( windowSize >= 1000
                ? 3 : ( windowSize >= 720
                  ? 2 : ( windowSize >= 300
                    ? 1 : null))))
          }

          slidesToScroll={
            windowSize >= 1440 
            ? 5 : ( windowSize >= 1320
              ? 4 : ( windowSize >= 1000
                ? 3 : ( windowSize >= 720
                  ? 2 : ( windowSize >= 300
                    ? 1 : null))))
          }

          {...settings}
        >
          {Items && Items.map ((item:any) => {
              return (
                <Link to={`/detail/${item.id}`} key={item.id}>
                  <S.Item>
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