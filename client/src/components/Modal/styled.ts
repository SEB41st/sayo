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
      font-size: 20px;
      display: flex;
      justify-content: space-between;
  }
  main{
    margin: 20px 20px 0 20px;
  }
  
`;

export const Footer=styled.div`
    margin: 10px;
    float: right;
      width: 160px;
      height: 40px;
      margin: 30px 10px 10px 20px;
      font-size: 10px;
      cursor: pointer;
    .CloseButton{
      margin: 0 0px 0px 20px;
    }
`;
export const CloseButton = styled.div`
  float: right;
  width: 40px;
  height: 40px;
  margin: 20px;
  cursor: pointer;
`;