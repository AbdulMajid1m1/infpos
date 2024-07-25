module.exports = (sequelize, DataTypes) => {
  const TransactionProduct = sequelize.define(
    "transaction_products",
    {
      transaction_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      net_unit_cost: DataTypes.FLOAT,
      stock: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      discount: DataTypes.DECIMAL(10, 2),
      tax: DataTypes.DECIMAL(10, 2),
      subtotal: DataTypes.DECIMAL(10, 2),
    },
    { timestamps: true }
  );
  TransactionProduct.associate = (models) => {
    TransactionProduct.belongsTo(models.Products, {
      foreignKey: "product_id",
      as: "product",
    });
  };
  return TransactionProduct;
};
