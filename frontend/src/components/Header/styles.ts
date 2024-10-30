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
  position: fixed;
  top: 0;
  box-shadow: 0px 5px 24px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const Logo = styled.img`
  height: 50%;
  padding: 20px;
  cursor: pointer;
`;

export const Navegation = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  flex: 1;
  padding: 20px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SignupButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #78a050;
  border: 0;
  padding: 10px;
  color: #fff;
  border-right: 1px solid black;
  border-radius: 20px 0 0 20px;
  outline: 0;
`;

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #78a050;
  border: 0;
  padding: 10px;
  color: #fff;
  border-radius: 0 20px 20px 0;
  outline: 0;
`;
