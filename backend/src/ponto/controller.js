const pool = require("../../db");
const queries = require("./queries");

const getPontos = (req, res) => {
  pool.query(queries.getPontos, (error, results) => {
    if (error) throw error;

    console.log("tentou acessar");
    res.status(200).json(results.rows);
  });
};

const getPontoById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getPontoById, [id], (error, results) => {
    if (error) throw error;

    res.status(200).json(results.rows);
  });
};

const addPonto = (req, res) => {
  //TODO: pesquisar como verificar o
  const { geom } = req.body; // TODO: analisar quais seriam os dados necessários na criação

  pool.query(queries.checkEmailExists, [geom], (error, results) => {
    console.log(results);
    if (results.rows.length) {
      res.json("Ponto já existe.");
    }
  });

  // pool.query(queries.addPonto, [geom], (error, results) => {
  //   if (error) throw error;

  //   res.status(201).send("Ponto criado com suucesso");
  //   console.log("O ponto foi criado com sucesso"); //TODO: apagar depois
  // });
};

module.exports = {
  getPontos,
  getPontoById,
  addPonto,
};
