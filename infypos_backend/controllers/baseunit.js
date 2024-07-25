const { BaseUnits } = require('../models');
const checkEmptyFields = require('../utils/check_empty_field');
const commonController = require('../utils/commonController');
const { isEmpty } = require('lodash');
const { Op } = require('sequelize');

module.exports = {
  create: async (req, res) => {
    const baseUnitData = req.body;
    const requiredFields = [{ name: 'name', value: baseUnitData.name }];
    const emptyFieldCheck = checkEmptyFields(requiredFields);

    if (!emptyFieldCheck.success) {
      return res.status(400).json({ error: emptyFieldCheck.error });
    }

    commonController.createEntity(BaseUnits, baseUnitData, res);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const baseUnitData = req.body;
    commonController.updateEntity(BaseUnits, id, baseUnitData, res);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    commonController.deleteEntity(BaseUnits, id, res);
  },

  getBaseUnits: async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    commonController.getEntities(BaseUnits, page, limit, res);
  },

  searchBaseUnits: async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;

    if (isEmpty(search)) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const offset = (page - 1) * limit;
    try {
      const baseUnits = await BaseUnits.findAndCountAll({
        where: {
          name: { [Op.like]: `%${search}%` }
        },
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });

      if (isEmpty(baseUnits.rows)) {
        throw { status: 404, message: "No base units found" };
      }

      res.success({
        data: baseUnits.rows,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(baseUnits.count / limit),
        totalBaseUnits: baseUnits.count,
      });
    } catch (err) {
      console.error(err);
      res.internalError(err);
    }
  }
};
