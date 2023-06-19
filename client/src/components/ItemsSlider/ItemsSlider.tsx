import { useEffect, useState } from "react";
import Slider from "react-slick";
import * as S from "./styled";
import { Link } from "react-router-dom";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ItemsSlider = (Items:any) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowSize(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.addEventListener('resize', handleResize);
    }
  }, [windowSize]);

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      pauseOnHover: true,
    };

    return (
      <S.Container>
        <Slider
          className="item"
          slidesToShow={
            windowSize >= 1440 
            ? 6 : ( windowSize >= 1320
              ? 5 : ( windowSize >= 1000
                ? 4 : ( windowSize >= 720
                  ? 3 : ( windowSize >= 300
                    ? 2 : null))))
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
          {Items.Items && Items.Items.map ((item:any) => {
              return (
                <Link to={`/detail/${item.itemId}`} key={item.itemId}>
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