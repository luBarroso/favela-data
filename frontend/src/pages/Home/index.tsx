import Map from "../../components/Map";
import { Header } from "../../components/Header";
import { Container, Main } from "./styles";

export const Home = () => {
  const lng = -74.5;
  const lat = 40;
  const zoom = 5;

  return (
    <Container>
      <Header />
      <Main>
        <Map lng={lng} lat={lat} zoom={zoom} />
      </Main>
    </Container>
  );
};
