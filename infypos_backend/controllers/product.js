const { Op } = require("sequelize");
const {
  Products,
  ProductBrands,
  Units,
  BaseUnits,
  ProductCategories,
  ProductTypes,
  ProductImages,
} = require("../models");
const { isEmpty, isNull } = require("lodash");
const checkEmptyFields = require("../utils/check_empty_field");

module.exports = {
  create: async (req, res) => {
    try {
      const productData = req.body;
      const requiredFields = [
        { name: "name", value: productData.name },
        { name: "code", value: productData.code },
      ];
      const emptyFieldCheck = checkEmptyFields(requiredFields);

      if (!emptyFieldCheck.success) {
        throw { status: 400, message: emptyFieldCheck.error };
      }

      const newProduct = await Products.create({
        ...productData,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      if (
        productData.product_type === "variation" &&
        Array.isArray(productData.variations)
      ) {
        const productTypes = productData.variations.map((type) => ({
          type: type.type,
          product_id: newProduct.id,
          product_cost: type.product_cost,
          product_price: type.product_price,
          stock_alert: type.stock_alert,
          order_tax: type.order_tax,
          tax_type: type.tax_type,
          quantity: type.quantity,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
        await ProductTypes.bulkCreate(productTypes);
      }
      res.success(newProduct);
    } catch (error) {
      console.error(error);
      res.internalError(error);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const productData = req.body;

      const product = await Products.findByPk(id);
      if (isNull(product)) {
        throw { status: 404, message: "Product not found" };
      }

      await Products.update(productData, {
        where: { id },
      });

      const updatedProduct = await Products.findByPk(id);

      res.success(updatedProduct);
    } catch (err) {
      console.error(err);
      res.internalError(err);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Products.findByPk(id);
      if (isNull(product)) {
        throw { status: 404, message: "Product not found" };
      }

      await product.destroy();
      res.success({ message: "Product deleted successfully" });
    } catch (err) {
      console.error(err);
      res.internalError(err);
    }
  },

  getProducts: async (req, res) => {
    try {
      const { page = 1, limit = 10, category } = req.query;

      const offset = (page - 1) * limit;
      const whereClause = !isEmpty(category)
        ? { fk_product_category_id: category }
        : {};

      const products = await Products.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        include: [
          {
            model: ProductBrands,
            as: "brand",
          },
        ],
      });
      if (isEmpty(products.rows)) {
        throw { status: 404, message: "No products found" };
      }

      res.success({
        data: products.rows,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(products.count / limit),
        totalProducts: products.count,
      });
    } catch (err) {
      console.error(err);
      res.internalError(err);
    }
  },

  getOneProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Products.findOne({
        where: {
          id,
        },
        include: [
          {
            model: ProductBrands,
            as: "brand",
          },
          {
            model: BaseUnits,
            as: "product_unit",
          },
          {
            model: Units,
            as: "sale_unit",
          },
          {
            model: Units,
            as: "purchase_unit",
          },
          {
            model: ProductCategories,
            as: "category",
          },
          {
            model: ProductTypes,
            as: "variation",
          },
          {
            model: ProductImages,
            as: "images",
          },
        ],
      });
      if (isEmpty(product)) {
        throw { status: 404, message: "No product found" };
      }

      res.success(product);
    } catch (err) {
      console.error(err);
      res.internalError(err);
    }
  },

  searchProducts: async (req, res) => {
    try {
      const { search, page = 1, limit = 10 } = req.query;

      if (isEmpty(search)) {
        throw { status: 400, message: "Search query is required" };
      }
      const offset = (page - 1) * limit;

      const products = await Products.findAndCountAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { code: { [Op.like]: `%${search}%` } },
          ],
        },
        include: [
          {
            model: ProductBrands,
            as: "brand",
          },
        ],
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      });

      if (isEmpty(products.rows)) {
        throw { status: 404, message: "No products found" };
      }

      res.success({
        data: products.rows,
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(products.count / limit),
        totalProducts: products.count,
      });
    } catch (err) {
      console.error(err);
      res.internalError(err);
    }
  },
};
