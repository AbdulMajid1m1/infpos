const {
  createEntity,
  updateEntity,
  deleteEntity,
  getEntities,
  searchEntities,
} = require("../utils/commonController");
const { ExpenseCategories } = require("../models");

const createExpenseCategory = async (req, res) => {
  await createEntity(ExpenseCategories, req.body, res);
};

const updateExpenseCategory = async (req, res) => {
  const { id } = req.params;
  await updateEntity(ExpenseCategories, id, req.body, res);
};

const deleteExpenseCategory = async (req, res) => {
  const { id } = req.params;
  await deleteEntity(ExpenseCategories, id, res);
};

const getExpenseCategories = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  await getEntities(ExpenseCategories, page, limit, res);
};

const searchExpenseCategories = async (req, res) => {
  const { search } = req.query;
  const { page = 1, limit = 10 } = req.query;
  await searchEntities(ExpenseCategories, search, page, limit, res);
};

module.exports = {
  createExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
  getExpenseCategories,
  searchExpenseCategories,
};
