const { ProductBrands } = require('../models');
const checkEmptyFields = require('../utils/check_empty_field');
const commonController = require('../utils/commonController');

module.exports = {
  create: async (req, res) => {
    const brandData = req.body;
    const requiredFields = [{ name: 'name', value: brandData.name }];
    const emptyFieldCheck = checkEmptyFields(requiredFields);

    if (!emptyFieldCheck.success) {
      return res.status(400).json({ error: emptyFieldCheck.error });
    }

    commonController.createEntity(ProductBrands, brandData, res);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const brandData = req.body;
    commonController.updateEntity(ProductBrands, id, brandData, res);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    commonController.deleteEntity(ProductBrands, id, res);
  },

  getBrands: async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    commonController.getEntities(ProductBrands, page, limit, res);
  },

  searchBrands: async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;
    commonController.searchEntities(ProductBrands, search, page, limit, res);
  },
};
