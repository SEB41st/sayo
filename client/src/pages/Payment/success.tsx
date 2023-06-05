import * as S from "./styled";

const Success = () => {

return (
    <S.Fail>
        <S.FailText>
        <span>결제 완료</span>
            <p>결제가 완료되었습니다</p>
        <a href='/' className="back">홈으로 돌아가기</a>
        </S.FailText>
    </S.Fail>

)}

export default Success;