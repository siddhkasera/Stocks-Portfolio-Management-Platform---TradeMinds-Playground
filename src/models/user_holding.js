'use strict'
const { Model } = require('sequelize')

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here

//     }
//   }
//   User.init({
//     username: DataTypes.STRING,
//     password: DataTypes.STRING,
//     email: DataTypes.STRING,
//     phone: DataTypes.STRING,
//     DoB: DataTypes.DATEONLY,
//     profile_img: DataTypes.TEXT,
//     funds_available: DataTypes.INTEGER,
//   }, {
//     seq: sequelize,
//     modelName: 'User',
//   });
//   return User;
// };

module.exports = (sequelize, Sequelize) => {
  const UserHolding = sequelize.define('user_holding', {
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id:{
      type: Sequelize.INTEGER,
    },
    stock_name:{
      type: Sequelize.TEXT,
    },
    buy_price:{
      type: Sequelize.DOUBLE,
    },
    quantity:{
      type:Sequelize.INTEGER,
    },
    buy_time:{
      type: Sequelize.DATE,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })
  UserHolding.associate = function (models) {}
  return UserHolding
}
