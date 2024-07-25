const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense");

router.post("/", expenseController.createExpense);
router.put("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);
router.get("/", expenseController.getExpenses);
router.get("/search", expenseController.searchExpenses);

module.exports = router;
