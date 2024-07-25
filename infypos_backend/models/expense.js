module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define(
    "expenses",
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fk_warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  Expense.associate = (models) => {
    Expense.belongsTo(models.ExpenseCategories, {
      foreignKey: "fk_expense_category_id",
    });
    Expense.belongsTo(models.Warehouses, {
      foreignKey: "fk_warehouse_id",
    });
  };

  return Expense;
};
