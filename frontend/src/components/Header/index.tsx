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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo onClick={() => navigate("/")} src={LecLogo} alt="lec-logo" />

      <Navegation>
        <Link to="/">Quem Somos</Link>
        <Link to="/">Contato</Link>
        <ButtonsContainer>
          <SignupButton onClick={() => navigate("/cadastro")}>
            Cadastro
          </SignupButton>
          <LoginButton onClick={() => navigate("/entrar")}>Entrar</LoginButton>
        </ButtonsContainer>
      </Navegation>
    </Container>
  );
};
