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
  min-width: 175px;
  min-height: 100px;
  background-color: #fffdfd;
  border: .1008px solid #d2cdcd;
  border-radius: 10px;
  margin: 1.875rem;

  @media screen and (min-width: ${"80rem"}) {
    width: 18.75rem;
    height: 12.5rem;
  }
`;

export const SubmitBtn = styled.button`
  width: 65px;
  height: 20px;
  margin: 0 0 1.875rem 16.875rem;
  color: #ffffff;
  font-size: .625rem;
  background-color: #f9bb00;
  border-radius: 5px;
  cursor: pointer;

  @media screen and (min-width: ${"80rem"}) {
    width: 6.25rem;
    height: 2.1875rem;
    margin: 0 0 3.125rem 37.5rem;
    font-size: .9375rem;
  }
`;

export const WriteForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: .75rem;

  @media screen and (min-width: ${"80rem"}) {
    font-size: 1.0625rem;
  }
`;

export const InputDiv = styled.div`
  display: flex;
  margin-bottom: 20px;

  @media screen and (min-width: ${"80rem"}) {
    margin-bottom: 40px;
  }
`;

export const InputLabel = styled.div`
  width: 70px;
  
  @media screen and (min-width: ${"80rem"}) {
    width: 120px;
  }
`;

export const WriteInput = styled.input`
  width: 120px;
  border-bottom: .0625rem solid #999999;

  @media screen and (min-width: ${"80rem"}) {
    min-width: 300px;
  }
`;

