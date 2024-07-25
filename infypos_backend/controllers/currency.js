const {
  createEntity,
  updateEntity,
  deleteEntity,
  getEntities,
  searchEntities,
} = require("../utils/commonController");
const { Currencies } = require("../models");

const createCurrency = async (req, res) => {
  await createEntity(Currencies, req.body, res);
};

const updateCurrency = async (req, res) => {
  const { id } = req.params;
  await updateEntity(Currencies, id, req.body, res);
};

const deleteCurrency = async (req, res) => {
  const { id } = req.params;
  await deleteEntity(Currencies, id, res);
};

const getCurrencies = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  await getEntities(Currencies, page, limit, res);
};

const searchCurrencies = async (req, res) => {
  const { search } = req.query;
  const { page = 1, limit = 10 } = req.query;
  await searchEntities(Currencies, search, page, limit, res);
};

module.exports = {
  createCurrency,
  updateCurrency,
  deleteCurrency,
  getCurrencies,
  searchCurrencies,
};
