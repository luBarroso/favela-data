import { Container, InfoText } from "./styles";

interface Props {
  favela: String;
  bairro: String;
}

export const Information = ({ favela: favela, bairro: bairro }: Props) => {
  return (
    <Container>
      <InfoText>favela: {favela}</InfoText>
      <InfoText>bairro: {bairro}</InfoText>
    </Container>
  );
};
