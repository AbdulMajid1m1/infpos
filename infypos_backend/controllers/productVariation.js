const { Variations,VariationTypes } = require("../models");
const checkEmptyFields = require("../utils/check_empty_field");
const commonController = require("../utils/commonController");

module.exports = {
  create: async (req, res) => {
    const variationData = req.body;
    const requiredFields = [{ name: "name", value: variationData.name }];
    const emptyFieldCheck = checkEmptyFields(requiredFields);

    if (!emptyFieldCheck.success) {
      return res.status(400).json({ error: emptyFieldCheck.error });
    }

    commonController.createEntity(Variations, variationData, res);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const variationData = req.body;
    commonController.updateEntity(Variations, id, variationData, res);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    commonController.deleteEntity(Variations, id, res);
  },

  getVariations: async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    commonController.getEntities(Variations, page, limit, res,[{model:VariationTypes, as:"variationTypes"}]);
  },

  searchVariations: async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;
    commonController.searchEntities(Variations, search, page, limit, res);
  },
  createVariationType: async (req, res) => {
    const variationData = req.body;
    const requiredFields = [{ name: "name", value: variationData.name }];
    const emptyFieldCheck = checkEmptyFields(requiredFields);

    if (!emptyFieldCheck.success) {
      return res.status(400).json({ error: emptyFieldCheck.error });
    }

    commonController.createEntity(VariationTypes, variationData, res);
  },

  updateVariationType: async (req, res) => {
    const { id } = req.params;
    const variationData = req.body;
    commonController.updateEntity(VariationTypes, id, variationData, res);
  },

  deleteVariationType: async (req, res) => {
    const { id } = req.params;
    commonController.deleteEntity(VariationTypes, id, res);
  },

  getVariationType: async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    commonController.getEntities(VariationTypes, page, limit, res);
  },

  searchVariationType: async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;
    commonController.searchEntities(VariationTypes, search, page, limit, res);
  },
};
