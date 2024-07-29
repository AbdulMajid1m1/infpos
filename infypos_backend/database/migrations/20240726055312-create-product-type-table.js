"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("product_types", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_cost: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      product_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      stock_alert: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      order_tax: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      tax_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("product_types");
  },
};
