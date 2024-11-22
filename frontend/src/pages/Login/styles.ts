import styled from "styled-components";

export const Body = styled.div`
  width: 100vw;
  height: 90vh;
  margin-top: 5%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #e5e5e5;
  width: 500px;
  height: 90%;
  border-radius: 20px;
  gap: 30px;
`;

export const H2 = styled.h2`
  font-weight: 600;
  font-size: 2.5rem;
  color: black;
`;

export const Forms = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  gap: 5px;
  width: 70%;

  input {
    background: #e5e5e5;
    border: 0;
    outline: 0;
    padding: 15px;
    border-radius: 20px;
    color: black;
    width: 100%;
    border: 1px solid black;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
  }

  label {
    position: relative;
    bottom: -12px;
    left: 15px;
    background: #e5e5e5;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

export const FormButton = styled.button`
  margin: 10px;
`;
