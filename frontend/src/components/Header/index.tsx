import "./styles";
import LecLogo from "../../assets/logo_lec-2.png";
import {
  ButtonsContainer,
  Container,
  LoginButton,
  Logo,
  Navegation,
  SignupButton,
} from "./styles";
//import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Header = () => {
  //const navigation = useNavigate();

  return (
    <Container>
      <Logo src={LecLogo} alt="lec-logo" />
      <Navegation>
        <Link to="/">Quem Somos</Link>
        <Link to="/">Contato</Link>
        <ButtonsContainer>
          <SignupButton>Cadastro</SignupButton>
          <LoginButton>Entrar</LoginButton>
        </ButtonsContainer>
      </Navegation>
    </Container>
  );
};
