const express = require("express");
const router = express.Router();
const expenseCategoryController = require("../controllers/expensesCategory");

router.post("/", expenseCategoryController.createExpenseCategory);
router.get("/", expenseCategoryController.getExpenseCategories);
router.get("/search", expenseCategoryController.searchExpenseCategories);
router.put("/:id", expenseCategoryController.updateExpenseCategory);
router.delete("/:id", expenseCategoryController.deleteExpenseCategory);

module.exports = router;
