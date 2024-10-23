const pool = require("../../db");
const queries = require("./queries");

const getLimite = (req, res) => {
  pool.query(queries.getLimites, (error, results) => {
    if (error) throw error;

    console.log("tentou acessar");
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getLimite,
};
