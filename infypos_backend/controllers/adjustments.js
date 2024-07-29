const { isEmpty, isNull } = require("lodash");
const {
  Adjustments,
  AdjustmentProducts,
  Products,
  Warehouses,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");
const checkEmptyFields = require("../utils/check_empty_field");

const createAdjustment = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { fk_warehouse_id, date, products, reference } = req.body;
    const requiredFields = [
      { name: "fk_warehouse_id", value: fk_warehouse_id },
      { name: "date", value: date },
      { name: "reference", value: reference },
      { name: "products", value: products },
    ];
    const emptyFieldCheck = checkEmptyFields(requiredFields);

    if (!emptyFieldCheck.success) {
      throw { status: 400, message: emptyFieldCheck.error };
    }

    const adjustment = await Adjustments.create(
      {
        reference,
        fk_warehouse_id,
        date,
      },
      { transaction }
    );

    const adjustmentProducts = products.map((product) => ({
      fk_adjustment_id: adjustment.id,
      fk_product_id: product.fk_product_id,
      stock: product.stock,
      quantity: product.quantity,
      type: product.type,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await AdjustmentProducts.bulkCreate(adjustmentProducts, { transaction });

    await transaction.commit();
    res.success({
      message: "Adjustment created successfully",
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.internalError(error);
  }
};

const deleteAdjustment = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;

    const adjustment = await Adjustments.findByPk(id);
    if (isNull(adjustment)) {
      throw { status: 404, message: "Adjustment not found" };
    }

    await AdjustmentProducts.destroy({
      where: { fk_adjustment_id: id },
      transaction,
    });

    await adjustment.destroy({ transaction });

    await transaction.commit();
    res.success({
      message: "Adjustment deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.internalError(error);
  }
};

const getAdjustments = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      warehouse_id,
      sortOrder = "desc",
    } = req.query;
    const offset = (page - 1) * limit;
    const adjustmentConditions = {};

    if (warehouse_id) {
      adjustmentConditions.fk_warehouse_id = warehouse_id;
    }

    const adjustments = await Adjustments.findAndCountAll({
      where: adjustmentConditions,
      attributes: [
        "id",
        "date",
        "fk_warehouse_id",
        "createdAt",
        "updatedAt",
        [
          sequelize.literal(`(
              SELECT COUNT(*)
              FROM adjustment_products AS ap
              WHERE
                ap.fk_adjustment_id = Adjustments.id
            )`),
          "products_count",
        ],
      ],
      include: [
        {
          model: Warehouses,
          attributes: ["id", "name"],
        },
      ],
      limit,
      offset,
      order: [["date", sortOrder]],
    });

    if (isEmpty(adjustments.rows)) {
      throw { status: 404, message: `No adjustments found` };
    }

    res.success({
      data: adjustments.rows,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(adjustments.count / limit),
      totalAdjustments: adjustments.count,
    });
  } catch (error) {
    console.log(error);
    res.internalError(error);
  }
};

const getOneAdjustment = async (req, res) => {
  try {
    const adjustment = await Adjustments.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: AdjustmentProducts,
          attributes: ["id", "quantity", "type"],
          include: [
            {
              model: Products,
              attributes: ["id", "name", "code"],
            },
          ],
        },
        {
          model: Warehouses,
          attributes: ["id", "name"],
        },
      ],
    });

    if (isNull(adjustment)) {
      throw { status: 404, message: `Adjustment not found` };
    }

    res.success(adjustment);
  } catch (error) {
    console.log(error);
    res.internalError(error);
  }
};

const searchAdjustment = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      warehouse_id,
      sortOrder = "desc",
      search,
    } = req.query;
    const offset = (page - 1) * limit;
    const adjustmentConditions = {};

    if (search) {
      adjustmentConditions[Op.or] = [
        { reference: { [Op.like]: `%${search}%` } },
      ];
    }

    if (warehouse_id) {
      adjustmentConditions.fk_warehouse_id = warehouse_id;
    }

    const adjustments = await Adjustments.findAndCountAll({
      where: adjustmentConditions,
      attributes: [
        "id",
        "date",
        "fk_warehouse_id",
        "createdAt",
        "updatedAt",
        [
          sequelize.literal(`(
              SELECT COUNT(*)
              FROM adjustment_products AS ap
              WHERE
                ap.fk_adjustment_id = Adjustments.id
            )`),
          "products_count",
        ],
      ],
      include: [
        {
          model: Warehouses,
          attributes: ["id", "name"],
        },
      ],
      limit,
      offset,
      order: [["date", sortOrder]],
    });

    if (isEmpty(adjustments.rows)) {
      throw { status: 404, message: "No adjustments found" };
    }

    res.success({
      data: adjustments.rows,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(adjustments.count / limit),
      totalAdjustments: adjustments.count,
    });
  } catch (error) {
    console.log(error);
    res.internalError(error);
  }
};

module.exports = {
  createAdjustment,
  deleteAdjustment,
  getAdjustments,
  getOneAdjustment,
  searchAdjustment,
};
