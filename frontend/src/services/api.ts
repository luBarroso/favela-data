import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
});

export const getPontos = async () => {
  try {
    const response = await api.get("/ponto/");
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const getCaminhos = async () => {
  try {
    const response = await api.get("/ponto/caminho");
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const getPontoOnibus = async () => {
  try {
    const response = await api.get("/transporte/ponibus");
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const getEstacaoMetro = async () => {
  try {
    const response = await api.get("/transporte/pmetro");
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const getEstacaoTrem = async () => {
  try {
    const response = await api.get("/transporte/ptrem");
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const getTrajetosBrt = async () => {
  try {
    const response = await api.get("/transporte/tbrt");
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const getTrajetosTrans = async () => {
  try {
    const response = await api.get("/transporte/ttrans");
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getTrajetosTrem = async () => {
  try {
    const response = await api.get("/transporte/ttrem");
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getTrajetosMetro = async () => {
  try {
    const response = await api.get("/transporte/tmetro");
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getSubap = async () => {
  try {
    const response = await api.get("/limite/subap");
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getLimite = async () => {
  try {
    const response = await api.get("/limite/favela");
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
