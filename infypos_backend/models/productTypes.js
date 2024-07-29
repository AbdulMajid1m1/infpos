module.exports = (sequelize, DataTypes) => {
  const ProductType = sequelize.define(
    "product_types",
    {
      product_id: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      product_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      stock_alert: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      order_tax: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      tax_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  ProductType.assocaition = (models) => {
    ProductType.belongsTo(models.Products, {
      foreignKey: "product_id",
    });
  };
  return ProductType;
};
