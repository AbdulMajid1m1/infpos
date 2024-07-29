module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    "product_images",
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fk_product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Products, {
      foreignKey: "fk_product_id",
      as: "product",
    });
  };

  return ProductImage;
};
