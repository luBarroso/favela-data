const { Router } = require("express");
const controller = require("../controllers/limite.controller");

const LimitRouter = Router();

LimitRouter.get("/favela", controller.getLimite);
LimitRouter.get("/subap", controller.getSubAps);

module.exports = LimitRouter;
