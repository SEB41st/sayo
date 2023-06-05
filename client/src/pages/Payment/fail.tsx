import * as S from "./styled";

const Fail = () => {

return (
    <S.Fail>
        <S.FailText>
        <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="fail"/>
        <span>결제 취소</span>
            <p>결제가 취소되었습니다</p>
        <a href='/cart' className="back">장바구니로 돌아가기</a>
        </S.FailText>
    </S.Fail>

)}

export default Fail;