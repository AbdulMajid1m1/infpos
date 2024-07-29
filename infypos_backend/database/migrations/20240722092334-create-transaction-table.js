"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      from_warehouse_id: {
        type: Sequelize.INTEGER,
      },
      fk_warehouse_id: {
        type: Sequelize.INTEGER,
      },
      fk_user_id: {
        type: Sequelize.INTEGER,
      },
      order_tax: {
        type: Sequelize.FLOAT,
      },
      discount: {
        type: Sequelize.FLOAT,
      },
      shipping: {
        type: Sequelize.FLOAT,
      },
      status: {
        type: Sequelize.STRING,
      },
      payment_status: {
        type: Sequelize.STRING,
      },
      payment_type: {
        type: Sequelize.STRING,
      },
      paid: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      due: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      note: {
        type: Sequelize.TEXT,
      },
      reference: {
        type: Sequelize.STRING,
      },
      transaction_type: {
        type: Sequelize.ENUM(
          "sale",
          "purchase",
          "transfer",
          "sale_return",
          "purchase_return",
          "quotation"
        ),
        allowNull: false,
      },
      grand_total: {
        type: Sequelize.DECIMAL(10, 2),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("transactions");
  },
};
