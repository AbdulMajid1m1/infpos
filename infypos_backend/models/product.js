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
      multiple_image: {
        type: DataTypes.STRING,
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
      fk_product_type_id: {
        type: DataTypes.INTEGER,
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
    Product.belongsToMany(models.Variations, {
      through: "ProductVariations",
      foreignKey: "product_id",
      otherKey: "variation_id",
      as: "variations",
    });
    Product.hasMany(models.TransactionProducts, {
      foreignKey: "product_id",
      as: "transactionProducts",
    });
  };
  return Product;
};
