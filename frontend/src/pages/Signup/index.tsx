import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { Main, Body, FormContainer, Forms, H2 } from "../Login/styles";

export const Signup = () => {
  return (
    <Body>
      <Header />
      <Main>
        <H2>Cadastro</H2>
        <Forms>
          <FormContainer>
            <label>Nome</label>
            <input type="text" />
          </FormContainer>
          <FormContainer>
            <label>Email</label>
            <input placeholder="usuario@email.com" type="email" />
          </FormContainer>
          <FormContainer>
            <label>Senha</label>
            <input placeholder="********" type="password" />
          </FormContainer>
          <FormContainer>
            <label>Confirma sua senha</label>
            <input placeholder="********" type="password" />
          </FormContainer>
          <button type="button">criar</button>
        </Forms>
        <Link to="/entrar">Já possui uma conta?</Link>
      </Main>
    </Body>
  );
};
