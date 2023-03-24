import { Link } from "react-router-dom"
import * as S from "./styled";

const Modal = (props:any) => {
    const {open, close, header} = props;
    
    return (
    <div className={open ? 'openModal modal' : 'modal'}>
    {open ? (
     <S.ModalWrap>
      <S.ModalSection>
        <header className="header">
          {header}
          <button className="closex" onClick={close}>
            &times;
          </button>
        </header>
        <main>{props.children}</main>
        <S.Footer>
          <Link to="/cart">
                장바구니로 이동
          </Link>
          
            <button className="CloseButton" onClick={close}>
                close
            </button>
            
        </S.Footer>
      </S.ModalSection>
  </S.ModalWrap>
  ) : null}
  </div>
   )
}

export default Modal