const { Router } = require("express");
const controller = require("./controller");

const LimitRouter = Router();

LimitRouter.get("/limite/favela", controller.getLimite);
LimitRouter.get("/limite/subap", controller.getSubAps);

module.exports = LimitRouter;
