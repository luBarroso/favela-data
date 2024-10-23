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

export const getLimite = async () => {
  try {
    const response = await api.get("/limite/");
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
