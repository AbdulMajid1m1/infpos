module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define(
    "product_categories",
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
  ProductCategory.associate = (models) => {
    ProductCategory.hasMany(models.Products, {
      foreignKey: "fk_product_category_id",
      as: "products",
    });
  };
  return ProductCategory;
};
