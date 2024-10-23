import { InfoText } from "./styles";

interface Props {
  rp_cod: string;
  rp: string;
  ra_cod: number;
  ra: string;
  cod_bairro: number;
  bairro: string;
  favela: string;
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
  cat_entrada: cat_entrada,
  tipo_entrada: tipo_entrada,
  grau_entrada: grau_entrada,
}: Props) => {
  return (
    <>
      <InfoText>códido da RP: {rp_cod}</InfoText>
      <InfoText>RP: {rp}</InfoText>
      <InfoText>códido da RA: {ra_cod}</InfoText>
      <InfoText>RA: {ra}</InfoText>
      <InfoText>código do bairro: {cod_bairro}</InfoText>
      <InfoText>bairro: {bairro}</InfoText>
      <InfoText>favela: {favela}</InfoText>
      <InfoText>categoria de entrada: {cat_entrada}</InfoText>
      <InfoText>tipo de entarda: {tipo_entrada}</InfoText>
      <InfoText>grau de entarda: {grau_entrada}</InfoText>
    </>
  );
};
