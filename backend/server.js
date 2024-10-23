const express = require("express");
const PointRouter = require("./src/ponto/routes");
const LimitRouter = require("./src/limite/routes");
const app = express();
const port = 3000;

const cors = require("cors");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1", PointRouter);
app.use("/api/v1", LimitRouter);

app.listen(port, () => console.log(`app escutando na porta ${port}`));
