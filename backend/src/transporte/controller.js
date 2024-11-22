const pool = require("../../db");
const queries = require("./queries");

const getPontoOnibus = (req, res) => {
  pool.query(queries.getPontoOnibus, (error, results) => {
    if (error) throw error;

    console.log("tentou acessar");
    res.status(200).json(results.rows);
  });
};

const getEstacaoMetro = (req, res) => {
  pool.query(queries.getEstacaoMetro, (error, results) => {
    if (error) throw error;

    console.log("tentou acessar");
    res.status(200).json(results.rows);
  });
};

const getEstacaoTrem = (req, res) => {
  pool.query(queries.getEstacaoTrem, (error, results) => {
    if (error) throw error;

    console.log("tentou acessar");
    res.status(200).json(results.rows);
  });
};

const getTrajetosBrt = (req, res) => {
  pool.query(queries.getTrajetosBrt, (error, results) => {
    if (error) throw error;

    console.log("tentou acessar");
    res.status(200).json(results.rows);
  });
};

const getTrajetosMetro = (req, res) => {
  pool.query(queries.getTrajetosMetro, (error, results) => {
    if (error) throw error;

    console.log("tentou acessar");
    res.status(200).json(results.rows);
  });
};

const getTrajetosTrans = (req, res) => {
  pool.query(queries.getTrajetosTrans, (error, results) => {
    if (error) throw error;

    console.log("tentou acessar");
    res.status(200).json(results.rows);
  });
};

const getTrajetosTrem = (req, res) => {
  pool.query(queries.getTrajetosTrem, (error, results) => {
    if (error) throw error;

    console.log("tentou acessar");
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getPontoOnibus,
  getEstacaoMetro,
  getEstacaoTrem,
  getTrajetosBrt,
  getTrajetosMetro,
  getTrajetosTrans,
  getTrajetosTrem,
};
