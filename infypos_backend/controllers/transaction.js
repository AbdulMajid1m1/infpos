const {
  Transactions,
  TransactionProducts,
  Products,
  Warehouses,
  Users,
  sequelize,
} = require("../models");
const { isEmpty, isNull } = require("lodash");
const { Op } = require("sequelize");
const checkEmptyFields = require("../utils/check_empty_field");

module.exports = {
  createTransaction: async (req, res) => {
    try {
      const {
        date,
        from_warehouse_id,
        to_warehouse_id,
        order_tax,
        discount,
        shipping,
        status,
        payment_status,
        note,
        reference,
        transaction_type,
        grand_total,
        products,
        fk_user_id,
      } = req.body;

      const requiredFields = [
        { name: "date", value: date },
        { name: "products", value: status },
        { name: "transaction_type", value: transaction_type },
      ];
      const emptyFieldCheck = checkEmptyFields(requiredFields);

      if (!emptyFieldCheck.success) {
        throw { status: 400, message: emptyFieldCheck.error };
      }
      const newTransaction = await Transactions.create({
        date,
        from_warehouse_id,
        to_warehouse_id,
        order_tax,
        discount,
        shipping,
        status,
        payment_status,
        note,
        reference,
        transaction_type,
        grand_total,
        fk_user_id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      const transactionProducts = products.map((product) => ({
        ...product,
        transaction_id: newTransaction.id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }));

      await TransactionProducts.bulkCreate(transactionProducts);

      res.success(newTransaction);
    } catch (error) {
      console.log(error);
      res.internalError(error);
    }
  },

  getTransaction: async (req, res) => {
    try {
      const { id } = req.params;

      const transaction = await Transactions.findByPk(id, {
        include: [
          { model: Warehouses, as: "fromWarehouse" },
          { model: Warehouses, as: "Warehouse" },
          { model: Users, as: "User" },
          { model: Products, through: { attributes: [] } },
        ],
      });

      if (!transaction) {
        throw { status: 404, message: "Transaction not found" };
      }

      res.success(transaction);
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },

  getTransactions: async (req, res) => {
    try {
      const { page = 1, limit = 10, transaction_type } = req.query;
      const offset = (page - 1) * limit;
      const whereClause = transaction_type ? { transaction_type } : {};

      const transactions = await Transactions.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        include: [
          { model: Warehouses, as: "fromWarehouse" },
          { model: Warehouses, as: "Warehouse" },
          { model: Users, as: "User" },
          {
            model: TransactionProducts,
            include: [{ model: Products, as: "product" }],
          },
        ],
        attributes: [
          "id",
          "date",
          "from_warehouse_id",
          "order_tax",
          "discount",
          "shipping",
          "status",
          "payment_status",
          "note",
          "reference",
          "transaction_type",
          "grand_total",
          "createdAt",
          "updatedAt",
          "fk_warehouse_id",
          "fk_user_id",
          [
            sequelize.literal(`(
                SELECT COUNT(*)
                FROM transaction_products 
                WHERE
                  transaction_products.transaction_id = transactions.id
              )`),
            "product_count",
          ],
        ],
      });

      if (isEmpty(transactions.rows)) {
        throw { status: 404, message: "No transactions found" };
      }

      res.success({
        data: transactions.rows,
        currentPage: parseInt(page),
        totalPages: Math.ceil(transactions.count / limit),
        totalTransactions: transactions.count,
      });
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },

  searchTransactions: async (req, res) => {
    try {
      const { search, page = 1, limit = 10 } = req.query;

      if (!search) {
        throw { status: 400, message: "Search query is required" };
      }
      const offset = (page - 1) * limit;
      const transactions = await Transactions.findAndCountAll({
        where: {
          [Op.or]: [{ reference: { [Op.like]: `%${search}%` } }],
        },
        limit: parseInt(limit),
        offset: parseInt(offset),
        include: [
          {
            model: Warehouses,
            as: "fromWarehouse",
          },
          {
            model: Warehouses,
            as: "Warehouse",
          },
          {
            model: Users,
            as: "User",
          },
          { model: Products, through: { attributes: [] } },
        ],
      });

      if (isEmpty(transactions.rows)) {
        throw { status: 404, message: "No transactions found" };
      }

      res.success({
        data: transactions.rows,
        currentPage: parseInt(page),
        totalPages: Math.ceil(transactions.count / limit),
        totalTransactions: transactions.count,
      });
    } catch (err) {
      console.log(err);
      res.internalError(err);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const transactionData = req.body;
      const { products, ...rest } = transactionData;

      const transaction = await Transactions.findByPk(id);
      if (isNull(transaction)) {
        throw { status: 404, message: "Transaction not found" };
      }

      await Transactions.update(rest, {
        where: { id },
      });

      if (products && products.length > 0) {
        await TransactionProducts.destroy({ where: { transaction_id: id } });
        const transactionProducts = products.map((product) => ({
          transaction_id: id,
          product_id: product.id,
          net_unit_cost: product.net_unit_cost,
          stock: product.stock,
          quantity: product.quantity,
          discount: product.discount,
          tax: product.tax,
          subtotal: product.subtotal,
        }));
        await TransactionProducts.bulkCreate(transactionProducts);
      }

      const updatedTransaction = await Transactions.findByPk(id);

      res.success(updatedTransaction);
    } catch (err) {
      console.error(err);
      res.internalError(err);
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const transaction = await Transactions.findByPk(id);
      if (isNull(transaction)) {
        throw { status: 404, message: "Transaction not found" };
      }

      await Transactions.destroy({ where: { id } });
      await TransactionProducts.destroy({ where: { transaction_id: id } });

      res.success({ message: "Transaction deleted successfully" });
    } catch (err) {
      console.error(err);
      res.internalError(err);
    }
  },
};
