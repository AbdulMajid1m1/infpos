module.exports = (sequelize, DataTypes) => {
  const VariationType = sequelize.define(
    "variation_types",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fk_variation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  VariationType.associate = (models) => {
    VariationType.belongsTo(models.Variations, {
      foreignKey: "fk_variation_id",
      as: "variation",
    });
  };
  return VariationType;
};
