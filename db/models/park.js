'use strict';
module.exports = (sequelize, DataTypes) => {
  const Park = sequelize.define('Park', {
    parkName: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[1,255]
      }
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[1,100]
      }
    },
    provinceState: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[1,100]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[1,100]
      }
    },
    opened: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[1,100]
      }
    },
    description: {
      type:DataTypes.TEXT, 
      allowNull: false
    }
  }, {});
  Park.associate = function(models) {
    // associations can be defined here
  };
  return Park;
};