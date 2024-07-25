const express = require("express");
const router = express.Router();
const currencyController = require("../controllers/currency");

router.post("/", currencyController.createCurrency);
router.put("/:id", currencyController.updateCurrency);
router.delete("/:id", currencyController.deleteCurrency);
router.get("/", currencyController.getCurrencies);
router.get("/search", currencyController.searchCurrencies);

module.exports = router;
