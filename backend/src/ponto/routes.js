const { Router } = require("express");
const controller = require("./controller");

const PointRouter = Router();

PointRouter.get("/ponto/", controller.getPontos);
PointRouter.get("/ponto/caminho", controller.getCaminhos);
PointRouter.get("/ponto/:id", controller.getPontoById);

PointRouter.post("/ponto/", controller.addPonto);

module.exports = PointRouter;
