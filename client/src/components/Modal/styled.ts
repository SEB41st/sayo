import styled from "styled-components";

export const ModalWrap = styled.div`
    position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

export const ModalSection = styled.div`
  width: 50%;
  height: 15%;
  align-items: center;
  border-radius: 15px;
  background-color: #fff;
  border: 1px solid #f9bb00;
  position: absolute;
  font-size: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .header{
      margin: 10px;
  }
  
`;

export const Footer=styled.div`
    margin: 10px;
    .CloseButton{
        float: right;
        width: 70px;
        height: 40px;
        margin: 10px;
        font-size: 10px;
    
        cursor: pointer;
        i {
            color: #5d5d5d;
            font-size: 30px;
    }
    }
`;
export const CloseButton = styled.div`
  float: right;
  width: 40px;
  height: 40px;
  margin: 20px;
  cursor: pointer;
  i {
    color: #5d5d5d;
    font-size: 30px;
  }
`;