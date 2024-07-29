const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense");
const expenseCategoryController = require("../controllers/expensesCategory");

router.post("/", expenseController.createExpense);
router.put("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);
router.get("/", expenseController.getExpenses);
router.get("/search", expenseController.searchExpenses);


// Expense Category routes
router.post("/categories", expenseCategoryController.createExpenseCategory);
router.get("/categories", expenseCategoryController.getExpenseCategories);
router.get("/categories/search", expenseCategoryController.searchExpenseCategories);
router.put("/categories/:id", expenseCategoryController.updateExpenseCategory);
router.delete("/categories/:id", expenseCategoryController.deleteExpenseCategory);

module.exports = router;
