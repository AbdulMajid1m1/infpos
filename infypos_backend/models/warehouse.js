module.exports = (sequelize, DataTypes) => {
  const Warehouse = sequelize.define(
    "warehouses",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zip_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
  Warehouse.associate = (models) => {
    Warehouse.hasMany(models.Expenses, {
      foreignKey: "fk_warehouse_id",
    });
  };
  return Warehouse;
};
