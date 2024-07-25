const { Units, BaseUnits } = require("../models");
const checkEmptyFields = require("../utils/check_empty_field");
const commonController = require("../utils/commonController");
const { isEmpty } = require("lodash");
const { Op } = require("sequelize");

module.exports = {
  create: async (req, res) => {
    const unitData = req.body;
    const requiredFields = [
      { name: "name", value: unitData.name },
      { name: "shortname", value: unitData.shortname },
    ];
    const emptyFieldCheck = checkEmptyFields(requiredFields);

    if (!emptyFieldCheck.success) {
      return res.status(400).json({ error: emptyFieldCheck.error });
    }

    commonController.createEntity(Units, unitData, res);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const unitData = req.body;
    commonController.updateEntity(Units, id, unitData, res);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    commonController.deleteEntity(Units, id, res);
  },

  getUnits: async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    commonController.getEntities(Units, page, limit, res, [
      { model: BaseUnits, as: "BaseUnit" },
    ]);
  },

  searchUnits: async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;

    if (isEmpty(search)) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const offset = (page - 1) * limit;
    try {
      const units = await Units.findAndCountAll({
        where: {
          name: { [Op.like]: `%${search}%` },
        },
        include: [{ model: BaseUnits }],
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });
      if (isEmpty(units.rows)) {
        throw { status: 404, message: "No units found" };
      }

      res.success({
        data: units.rows,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(units.count / limit),
        totalUnits: units.count,
      });
    } catch (err) {
      console.error(err);
      res.internalError(err);
    }
  },
};
