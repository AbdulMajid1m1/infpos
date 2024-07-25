module.exports = (sequelize, DataTypes) => {
  const ExpenseCategory = sequelize.define(
    "expense_categories",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  ExpenseCategory.associate = (models) => {
    ExpenseCategory.hasMany(models.Expenses, {
      foreignKey: "fk_expense_category_id",
    });
  };

  return ExpenseCategory;
};
