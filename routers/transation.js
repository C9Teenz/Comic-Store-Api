const { Router } = require("express");
const transactionRoute = Router();
const TransactionController = require("../controllers/TransactionController");

transactionRoute.post("/create", TransactionController.create);
transactionRoute.get("/", TransactionController.get);
transactionRoute.get("/detail/:id", TransactionController.getDetail);
transactionRoute.put("/edit/:id", TransactionController.edit);

module.exports = transactionRoute;
