import { useCustomMutation } from "../util/useMutation";
import * as S from "./styled";

const Rejoin = () => {
    const { mutate } = useCustomMutation(
        `/users/`,
        `users=`,
        "POST", {
          onSuccess: (result:any) => {
            console.log(result); // 성공한 뒤의 결과 값 출력
            // 추가적인 로직 수행
          }
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
        <a href='/login' className="back">재가입 후 로그인하기</a>
        </S.ErrorText>
    </S.Error>

)}

export default Rejoin;
