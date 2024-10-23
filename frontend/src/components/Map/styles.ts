import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: row;
`;

export const MapContainer = styled.div`
  flex: 1;
  height: 100%;
`;

export const InfromationContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  width: 30%;
  height: 100%;
  color: #000;
`;

export const InformationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  padding: 20px;
  border: 0;
  background: transparent;

  color: black;
`;
