import styled from "styled-components";
import { Map } from "react-kakao-maps-sdk";

export const MapWrap = styled.div`
  width: 90%;
  height: 100vh;
  margin: 0.625rem 1.25rem;
`;

export const MapContainer = styled.div`
  width: 90%;
  height: 100vh;
  margin: 0.625rem 1.25rem;
`;

export const Maps = styled(Map)`
  width: 90vw;
  height: 50vh;
  margin: 20px;
  border-radius: 10px;
`