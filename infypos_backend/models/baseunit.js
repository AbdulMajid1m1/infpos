module.exports = (sequelize, DataTypes) => {
    const BaseUnit = sequelize.define(
      "base_units",
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
  
    BaseUnit.associate = (models) => {
      BaseUnit.hasMany(models.Units, {
        foreignKey: 'fk_base_unit_id',
      });
    };
  
    return BaseUnit;
  };
  