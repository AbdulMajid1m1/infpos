const { Router } = require("express");
const router = Router();

const userRouter = require("./user");
const productRouter = require("./product");
const productVariationRouter = require("./productVariation");
const baseUnitRouter = require("./baseunit");
const unitRouter = require("./unit");
const warehouseRouter = require("./warehouse");
const transactionsRouter = require("./transaction");
const currenciesRouter = require("./currency");
const expenseRouter = require("./expense");
const adjustmentRouter = require("./adjustments");

router.use("/v1/users", userRouter);
router.use("/v1/product", productRouter);
router.use("/v1/variation", productVariationRouter);
router.use("/v1/base-unit", baseUnitRouter);
router.use("/v1/unit", unitRouter);
router.use("/v1/warehouse", warehouseRouter);
router.use("/v1/transactions", transactionsRouter);
router.use("/v1/currencies", currenciesRouter);
router.use("/v1/expenses", expenseRouter);
router.use("/v1/adjustments", adjustmentRouter);

module.exports = router;
