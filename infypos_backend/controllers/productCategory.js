const { ProductCategories } = require('../models');
const checkEmptyFields = require('../utils/check_empty_field');
const commonController = require('../utils/commonController');

module.exports = {
  create: async (req, res) => {
    const categoryData = req.body;
    const requiredFields = [{ name: 'name', value: categoryData.name }];
    const emptyFieldCheck = checkEmptyFields(requiredFields);

    if (!emptyFieldCheck.success) {
      return res.status(400).json({ error: emptyFieldCheck.error });
    }

    commonController.createEntity(ProductCategories, categoryData, res);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const categoryData = req.body;
    commonController.updateEntity(ProductCategories, id, categoryData, res);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    commonController.deleteEntity(ProductCategories, id, res);
  },

  getCategories: async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    commonController.getEntities(ProductCategories, page, limit, res);
  },

  searchCategories: async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;
    commonController.searchEntities(ProductCategories, search, page, limit, res);
  },
};
