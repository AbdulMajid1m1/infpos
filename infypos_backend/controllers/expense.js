const {
  createEntity,
  updateEntity,
  deleteEntity,
  getEntities,
  searchEntities,
} = require("../utils/commonController");
const { Expenses, ExpenseCategories, Warehouses } = require("../models");

const createExpense = async (req, res) => {
  try {
    await createEntity(Expenses, req.body, res);
  } catch (error) {
    console.error(error);
    res.internalError(error);
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  await updateEntity(Expenses, id, req.body, res);
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  await deleteEntity(Expenses, id, res);
};

const getExpenses = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  await getEntities(Expenses, page, limit, res, [
    { model: ExpenseCategories },
    { model: Warehouses },
  ]);
};

const searchExpenses = async (req, res) => {
  const { search } = req.query;
  const { page = 1, limit = 10 } = req.query;
  await searchEntities(Expenses, search, page, limit, res, [
    { model: ExpenseCategories },
  ]);
};

module.exports = {
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenses,
  searchExpenses,
};
