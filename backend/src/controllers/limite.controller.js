const pool = require("../../database/db");
const queries = require("../queries/limite.queries");

const getLimite = (req, res) => {
  pool.query(queries.getLimites, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getSubAps = (req, res) => {
  pool.query(queries.getSubAps, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getLimite,
  getSubAps,
};
