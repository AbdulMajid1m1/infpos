const { isEmpty } = require("lodash");
const { ProductBrands, sequelize } = require("../models");
const checkEmptyFields = require("../utils/check_empty_field");
const commonController = require("../utils/commonController");

module.exports = {
  create: async (req, res) => {
    const brandData = req.body;
    const requiredFields = [{ name: "name", value: brandData.name }];
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
    try {
      const offset = (page - 1) * limit;
      const brands = await ProductBrands.findAndCountAll({
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        attributes: [
          "id",
          "name",
          [
            sequelize.literal(`(
                SELECT COUNT(*)
                FROM products 
                WHERE
                  products.fk_brand_id = product_brands.id
              )`),
            "product_count",
          ],
        ],
      });

      if (isEmpty(brands.rows)) {
        throw { status: 404, message: `No ${Model.name}s found` };
      }

      res.success({
        data: brands.rows,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(brands.count / limit),
        totalBrands: brands.count,
      });
    } catch (error) {
      console.error(error);
      res.internalError(error);
    }
  },

  searchBrands: async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;
    commonController.searchEntities(ProductBrands, search, page, limit, res);
  },
};
