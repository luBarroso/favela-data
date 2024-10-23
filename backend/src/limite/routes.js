const { Router } = require("express");
const controller = require("./controller");

const LimitRouter = Router();

LimitRouter.get("/limite/", controller.getLimite);

module.exports = LimitRouter;
