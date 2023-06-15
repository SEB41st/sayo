import styled from "styled-components";

export const WriteWrap = styled.div`
  width: 100%;
  height: 100%;
`;

export const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageDiv = styled.div`
  min-width: 50%;
  min-height: 100px;
  background-color: #fffdfd;
  border: 0.1008px solid #d2cdcd;
  border-radius: 10px;
  margin: 1.875rem;

  @media screen and (min-width: ${"80rem"}) {
    width: 18.75rem;
    height: 12.5rem;
  }
`;

export const BtnDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25%;

  @media screen and (min-width: ${"80rem"}) {
    margin-left: 32%;
  }
`;

export const SubmitBtn = styled.button`
  width: 70px;
  height: 20px;
  margin: 0 0 10px 10px;
  color: #ffffff;
  font-size: 0.625rem;
  background-color: #f9bb00;
  border-radius: 5px;
  cursor: pointer;

  @media screen and (min-width: ${"80rem"}) {
    width: 6.25rem;
    height: 2.1875rem;
    margin: 0 0 60px 70px;
    font-size: 0.9375rem;
  }
`;

export const WriteForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.75rem;
  width: 100%;

  @media screen and (min-width: ${"80rem"}) {
    font-size: 1.0625rem;
  }
`;

export const InputDiv = styled.div`
  display: flex;
  margin: 0 0 20px 20px;
  .input-datepicker {
    margin-left: 18px;
  }
  @media screen and (min-width: ${"80rem"}) {
    margin-bottom: 40px;
  }
`;

export const InputLabel = styled.div`
  min-width: 90px;
  margin-left: 20px;

  @media screen and (min-width: ${"80rem"}) {
    width: 120px;
  }
`;

export const WriteInput = styled.input`
  width: 200px;
  font-size: 5px;
  border-bottom: 0.0625rem solid #999999;

  @media screen and (min-width: ${"700px"}) {
    width: 400px;
    font-size: 13px;
  }
`;

export const Day = styled.div`
  width: 50%;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  /* @media screen and (min-width: ${"700px"}) {
    position: absolute;
  } */
`;

export const Image = styled.div`
  width: 90%;
  height: 90%;
  margin: 10px;
  border-radius: 20px;
  border: 0.5px solid black;`