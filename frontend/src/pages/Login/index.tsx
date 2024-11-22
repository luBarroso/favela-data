import { useState } from "react";
import { Body, FormButton, FormContainer, Forms, H2, Main } from "./styles";
import { Header } from "../../components/Header";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");

  return (
    <Body>
      <Header />
      <Main>
        <H2>Entrar</H2>
        <Forms>
          <FormContainer>
            <label>Email</label>
            <input placeholder="usuario@email.com" type="email" />
          </FormContainer>
          <FormContainer>
            <label>Senha</label>
            <input placeholder="********" type="password" />
          </FormContainer>
          <FormButton type="button">acessar</FormButton>
        </Forms>
        <Link to="/cadastro">Se cadastrar</Link>
      </Main>
    </Body>
  );
};
