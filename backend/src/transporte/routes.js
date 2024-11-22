const { Router } = require("express");
const controller = require("./controller");

const TransportRouter = Router();

TransportRouter.get("/transporte/ponibus", controller.getPontoOnibus);
TransportRouter.get("/transporte/pmetro", controller.getEstacaoMetro);
TransportRouter.get("/transporte/ptrem", controller.getEstacaoTrem);
TransportRouter.get("/transporte/tbrt", controller.getTrajetosBrt);
TransportRouter.get("/transporte/tmetro", controller.getTrajetosMetro);
TransportRouter.get("/transporte/ttrans", controller.getTrajetosTrans);
TransportRouter.get("/transporte/ttrem", controller.getTrajetosTrem);

module.exports = TransportRouter;
