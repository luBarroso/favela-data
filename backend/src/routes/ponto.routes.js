const { Router } = require("express");
const controller = require("../controllers/ponto.controller");

const PointRouter = Router();

PointRouter.get("/", controller.getPontos);
PointRouter.get("/caminho", controller.getCaminhos);
PointRouter.get("/:id", controller.getPontoById);

PointRouter.post("/", controller.addPonto);

module.exports = PointRouter;
