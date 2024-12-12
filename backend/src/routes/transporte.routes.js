const { Router } = require("express");
const controller = require("../controllers/tranporte.controller");

const TransportRouter = Router();

TransportRouter.get("/ponibus", controller.getPontoOnibus);
TransportRouter.get("/pmetro", controller.getEstacaoMetro);
TransportRouter.get("/ptrem", controller.getEstacaoTrem);
TransportRouter.get("/tbrt", controller.getTrajetosBrt);
TransportRouter.get("/tmetro", controller.getTrajetosMetro);
TransportRouter.get("/ttrans", controller.getTrajetosTrans);
TransportRouter.get("/ttrem", controller.getTrajetosTrem);

module.exports = TransportRouter;
