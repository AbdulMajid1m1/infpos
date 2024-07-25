module.exports = (sequelize, DataTypes) => {
  const ProductBrand = sequelize.define(
    "product_brands",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
  ProductBrand.associate = (models) => {
    ProductBrand.hasMany(models.Products, {
      foreignKey: "fk_brand_id",
      as: "products",
    });
  };
  return ProductBrand;
};
