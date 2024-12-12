import { AreaCotainer, InfoText } from "./styles";

interface Props {
  rp_cod: string;
  rp: string;
  ra_cod: number;
  ra: string;
  cod_bairro: number;
  bairro: string;
  favela: string;
  morfologia: string;
  cat_entrada: string;
  tipo_entrada: string;
  grau_entrada: string;
}

export const Information = ({
  rp_cod: rp_cod,
  rp: rp,
  ra_cod: ra_cod,
  ra: ra,
  cod_bairro: cod_bairro,
  bairro: bairro,
  favela: favela,
  morfologia: morfologia,
  cat_entrada: cat_entrada,
  tipo_entrada: tipo_entrada,
  grau_entrada: grau_entrada,
}: Props) => {
  return (
    <>
      <AreaCotainer>
        <InfoText>Favela: {favela}</InfoText>
        <InfoText>Morfologia: {morfologia}</InfoText>
        <InfoText>Bairro: {bairro}</InfoText>
        <InfoText>Código do bairro: {cod_bairro}</InfoText>
        <InfoText>Região de Plenejamento: {rp}</InfoText>
        <InfoText>Códido da RP: {rp_cod}</InfoText>
        <InfoText>Região Administrativa: {ra}</InfoText>
        <InfoText>Códido da RA: {ra_cod}</InfoText>
      </AreaCotainer>
      <InfoText>Categoria de entrada: {cat_entrada}</InfoText>
      <InfoText>Tipologia de entarda: {tipo_entrada}</InfoText>
      <InfoText>Grau de entarda: {grau_entrada}</InfoText>
    </>
  );
};
