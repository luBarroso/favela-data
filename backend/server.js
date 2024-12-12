const express = require("express");
const PointRouter = require("./src/routes/ponto.routes");
const LimitRouter = require("./src/routes/limite.routes");
const TransportRouter = require("./src/routes/transporte.routes");
const app = express();
const port = 3000;

const cors = require("cors");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend");
});
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/ponto", PointRouter);
app.use("/api/v1/limite", LimitRouter);
app.use("/api/v1/transporte", TransportRouter);

app.listen(port, () => console.log(`app escutando na porta ${port}`));
