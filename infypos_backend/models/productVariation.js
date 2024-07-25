module.exports = (sequelize, DataTypes) => {
  const Variation = sequelize.define(
    "variations",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      types: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  Variation.associate = (models) => {
    Variation.belongsToMany(models.Products, {
      through: "ProductVariations",
      foreignKey: "variation_id",
      otherKey: "product_id",
      as: "products",
    });
  };
  return Variation;
};
