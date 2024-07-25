module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("transactions", {
    date: DataTypes.DATE,
    from_warehouse_id: DataTypes.INTEGER,
    order_tax: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    shipping: DataTypes.FLOAT,
    status: DataTypes.STRING,
    payment_status: DataTypes.STRING,
    note: DataTypes.TEXT,
    reference: DataTypes.STRING,
    transaction_type: DataTypes.ENUM('sale', 'purchase', 'transfer'),
    grand_total: DataTypes.DECIMAL(10, 2),
  }, { timestamps: true });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Warehouses, { foreignKey: 'fk_warehouse_id',as: 'Warehouse' });
    Transaction.belongsTo(models.Warehouses, { foreignKey: 'from_warehouse_id',as: 'fromWarehouse' });
    Transaction.belongsTo(models.Users, { foreignKey: 'fk_user_id' ,as: 'User'});
    Transaction.belongsToMany(models.Products, {
      through: 'transaction_products',
      foreignKey: 'transaction_id',
      otherKey: 'product_id'
    });
  };

  return Transaction;
};
