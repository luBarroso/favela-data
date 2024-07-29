import "./styles";
import LecLogo from "../../assets/logo_lec-2.png";
import { Container, Logo, Navegation } from "./styles";

export const Header = () => {
  return (
    <Container>
      <Logo src={LecLogo} alt="lec-logo" />
      <Navegation>
        <p>Quem Somos</p>
        <p>Quem Somos</p>
        <p>Contato</p>
      </Navegation>
    </Container>
  );
};
