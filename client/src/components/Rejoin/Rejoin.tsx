import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCustomMutation } from "../util/useMutation";
import * as S from "./styled";


const Rejoin = () => {
  const Url:any = window.location.href;
  const url = new URL(Url);
  const urlParams = url.searchParams;
  const userId = urlParams.get("userId")
  const navigate = useNavigate()

  const handleRejoin = () => {
    mutate({})
};
    const { mutate } = useCustomMutation(
        `/users/${userId}`,
        `users=${userId}`,
        "POST", 
        (res:any) => {
          toast("재가입이 완료되었습니다");
          navigate("/login");
        }
      );

return (
    <S.Error>
        <S.ErrorText>
        <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404"/>
        <span>탈퇴된 계정입니다</span>
        <p className="p-a">): Whoops </p>
        <p className="p-b">탈퇴된 계정입니다.</p>
        <a href='/' className="back">HOME</a>
        <button onClick={handleRejoin} className="back">재가입 후 로그인하기</button>
        </S.ErrorText>
    </S.Error>

)}

export default Rejoin;
