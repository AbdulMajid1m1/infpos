module.exports = (sequelize, DataTypes) => {
  const Adjustment = sequelize.define(
    "adjustments",
    {
      reference: DataTypes.STRING,
      date: DataTypes.DATE,
      fk_warehouse_id: DataTypes.INTEGER,
    },
    {
      timestamps: true,
    }
  );

  Adjustment.associate = (models) => {
    Adjustment.belongsTo(models.Warehouses, { foreignKey: "fk_warehouse_id" });
    Adjustment.hasMany(models.AdjustmentProducts, {
      foreignKey: "fk_adjustment_id",
    });
  };

  return Adjustment;
};
