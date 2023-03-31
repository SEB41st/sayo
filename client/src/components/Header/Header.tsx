import * as S from "./styled";
import { Link } from "react-router-dom";
import { RxHamburgerMenu,RxPerson } from 'react-icons/rx';
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
    let userId = localStorage.getItem("userId")
    const [img, setImg] = useState()

    useEffect(()=> {
        axios
        .get(`http://sayo.n-e.kr:8080/users/${userId}/mypage`,
        {
          headers: {
            Authorization : localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          console.log(res.data.data.profile[0].image)
          setImg(res.data.data.profile[0].image)
        })
        .catch((error) => {
          console.log(error);
        });
      },[])

    return (
    <S.HeaderMain>
        <Link to ="/">
            <S.LogoImg src="/assets/Logo.png" alt ="" ></S.LogoImg>
        </Link>
        <S.HeaderLogo>
            {userId? 
                <S.Login to='/myinfo'>
                    <img src={img} alt="" />
                </S.Login>:
                <S.Login to='/login'>
                    <RxPerson className="personIcon"/>
                </S.Login>
            }
            <Link to="/sidebar">
                <RxHamburgerMenu className="hambergerbar"/>
            </Link>
        </S.HeaderLogo>
    </S.HeaderMain>
    )
}
export default Header;