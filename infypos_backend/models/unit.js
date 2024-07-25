module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define(
    "units",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  Unit.associate = (models) => {
    Unit.belongsTo(models.BaseUnits, {
      foreignKey: "fk_base_unit_id",
    });
  };

  return Unit;
};
