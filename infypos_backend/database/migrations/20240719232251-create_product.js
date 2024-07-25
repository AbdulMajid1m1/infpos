// migrations/YYYYMMDDHHMMSS-create-product.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      fk_product_category_id: {
        type: Sequelize.INTEGER,

        allowNull: true,

      },
      fk_brand_id: {
        type: Sequelize.INTEGER,

        allowNull: true,

      },
      fk_barcode_symbology_id: {
        type: Sequelize.INTEGER,

        allowNull: true,

      },
      fk_product_unit_id: {
        type: Sequelize.INTEGER,

        allowNull: true,

      },
      fk_sale_unit_id: {
        type: Sequelize.INTEGER,

        allowNull: true,

      },
      fk_purchase_unit_id: {
        type: Sequelize.INTEGER,

        allowNull: true,

      },
      quantity_limitation: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      multiple_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fk_warehouse_id: {
        type: Sequelize.INTEGER,

        allowNull: true,

      },
      fk_supplier_id: {
        type: Sequelize.INTEGER,

        allowNull: true,

      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'Received',
      },
      fk_product_type_id: {
        type: Sequelize.INTEGER,

        allowNull: true,

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

  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  },
};
