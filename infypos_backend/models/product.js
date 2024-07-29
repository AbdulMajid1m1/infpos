module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "products",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      fk_product_category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fk_brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fk_barcode_symbology_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fk_product_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fk_sale_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fk_purchase_unit_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quantity_limitation: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fk_warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fk_supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "Received",
      },
      product_type: {
        type: DataTypes.ENUM("single", "variation"),
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
  Product.associate = (models) => {
    Product.belongsTo(models.ProductCategories, {
      foreignKey: "fk_product_category_id",
      as: "category",
    });
    Product.belongsTo(models.ProductBrands, {
      foreignKey: "fk_brand_id",
      as: "brand",
    });
    Product.belongsTo(models.BaseUnits, {
      foreignKey: "fk_product_unit_id",
      as: "product_unit",
    });
    Product.belongsTo(models.Units, {
      foreignKey: "fk_sale_unit_id",
      as: "sale_unit",
    });
    Product.belongsTo(models.Units, {
      foreignKey: "fk_purchase_unit_id",
      as: "purchase_unit",
    });
    Product.hasMany(models.TransactionProducts, {
      foreignKey: "product_id",
      as: "transactionProducts",
    });
    Product.hasMany(models.ProductImages, {
      foreignKey: "fk_product_id",
      as: "images",
    });
    Product.hasMany(models.ProductTypes, {
      foreignKey: "product_id",
      as: "variation",
    });
    Product.hasMany(models.AdjustmentProducts, { foreignKey: "fk_product_id" });
  };
  return Product;
};
