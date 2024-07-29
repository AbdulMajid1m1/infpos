const {
  createEntity,
  updateEntity,
  deleteEntity,
  getEntities,
  searchEntities,
} = require("../utils/commonController");
const { ProductTypes } = require("../models");

const createProductVariation = async (req, res) => {
  const data = req.body;
  await createEntity(ProductTypes, data, res);
};

const updateProductVariation = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  await updateEntity(ProductTypes, id, data, res);
};

const deleteProductVariation = async (req, res) => {
  const { id } = req.params;
  await deleteEntity(ProductTypes, id, res);
};

const getProductVariations = async (req, res) => {
  const { page, limit } = req.query;
  await getEntities(ProductTypes, page, limit, res);
};

const searchProductVariations = async (req, res) => {
  const { search, page, limit } = req.query;
  await searchEntities(ProductTypes, search, page, limit, res);
};

module.exports = {
  createProductVariation,
  updateProductVariation,
  deleteProductVariation,
  getProductVariations,
  searchProductVariations,
};
