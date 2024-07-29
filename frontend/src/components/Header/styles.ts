import styled from "styled-components";

export const Container = styled.div`
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
  //padding: 10px 20px 10px 20px;
  color: #000;
  box-shadow: 0px 5px 24px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const Logo = styled.img`
  height: 50%;
  padding: 20px;
`;

export const Navegation = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 20px;
  flex: 1;
  padding: 20px;
`;
