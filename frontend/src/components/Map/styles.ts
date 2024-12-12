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

export const InformationContainer = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? "0" : "-100%")};
  background: #fff;
  margin-top: 5%;
  width: 20vw;
  height: 100%;
  color: #000;
  padding: 10px;
  transition: right 0.5s ease;
`;

export const InformationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  padding: 10px 15px 10px 15px;
  border: 0;
  outline: 0;
  background: transparent;

  color: black;
`;

export const ControlContainer = styled.div`
  position: fixed;
  background: #fff;
  color: #000;
  padding: 10px;
  border-radius: 3px;
  left: 20px;
  top: 100px;
  display: flex;
  flex-direction: column;
  margin-left: 40px;

  details {
    display: flex;
    flex-direction: column;
  }

  label {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }
`;
