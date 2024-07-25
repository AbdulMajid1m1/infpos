const { Op } = require("sequelize");
const { Warehouses } = require("../models");
const checkEmptyFields = require("../utils/check_empty_field");
const commonController = require("../utils/commonController");

module.exports = {
  create: async (req, res) => {
    const warehouseData = req.body;
    const requiredFields = [{ name: "name", value: warehouseData.name }];
    const emptyFieldCheck = checkEmptyFields(requiredFields);

    if (!emptyFieldCheck.success) {
      return res.status(400).json({ error: emptyFieldCheck.error });
    }

    commonController.createEntity(Warehouses, warehouseData, res);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const warehouseData = req.body;
    commonController.updateEntity(Warehouses, id, warehouseData, res);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    commonController.deleteEntity(Warehouses, id, res);
  },

  getWarehouses: async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    commonController.getEntities(Warehouses, page, limit, res);
  },

  searchWarehouses: async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;
    const searchConditions = {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone_number: { [Op.like]: `%${search}%` } },
        { country: { [Op.like]: `%{search}%` } },
        { city: { [Op.like]: `%${search}%` } },
        { zip_code: { [Op.like]: `%${search}%` } },
      ],
    };
    commonController.searchEntities(
      Warehouses,
      search,
      searchConditions,
      page,
      limit,
      res
    );
  },
};
