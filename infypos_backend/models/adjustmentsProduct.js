module.exports = (sequelize, DataTypes) => {
  const AdjustmentProduct = sequelize.define(
    "adjustment_products",
    {
      fk_adjustment_id: DataTypes.INTEGER,
      fk_product_id: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      type: {
        type: DataTypes.ENUM("Addition", "Subtraction"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  AdjustmentProduct.associate = (models) => {
    AdjustmentProduct.belongsTo(models.Products, {
      foreignKey: "fk_product_id",
    });
    AdjustmentProduct.belongsTo(models.Adjustments, {
      foreignKey: "fk_adjustment_id",
    });
  };

  return AdjustmentProduct;
};
