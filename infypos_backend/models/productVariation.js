module.exports = (sequelize, DataTypes) => {
  const Variation = sequelize.define(
    "variations",
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
  Variation.associate = (models) => {
    Variation.hasMany(models.VariationTypes, {
      foreignKey: "fk_variation_id",
      as: "variationTypes",
    });
  };
  return Variation;
};
